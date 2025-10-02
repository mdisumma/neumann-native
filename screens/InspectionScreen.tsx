// Import navigation types for type safety
import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

// Import React hooks and components
import React, { useContext, useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";

// Import inspection data and components
import {
  DeviceInfo,
  ElectricalSafety,
  FunctionalTest,
  InspectionHeader,
  VisualInspection,
} from "../components/inspection";

// Import the global inspection context
import { InspectionContext } from "../context/InspectionContext";

// Define the navigation prop type for this screen
type InspectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Inspection"
>;

// Define the props this component receives
interface Props {
  navigation: InspectionScreenNavigationProp;
}

// Define the inspection item interface for type safety
interface InspectionItem {
  execution_order: string | number;
  name: string;
  description?: string;
  user_response?: "yes" | "no" | null;
  [key: string]: any; // Allow additional properties
}

// MAIN COMPONENT

export default function InspectionScreen({ navigation }: Props) {
  // STATE MANAGEMENT

  // Track whether electrical measurements have been taken
  const [isMeasured, setIsMeasured] = useState<boolean>(false);

  // Get inspection data from React Context (shared state across the app)
  const { inspectionData, setInspectionData } = useContext(InspectionContext);

  useEffect(() => {
    console.log(JSON.stringify(inspectionData, null, 2));
  }, [inspectionData]); // Watch for changes in inspection data

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InspectionHeader
        inspectionClass={
          inspectionData?.appliance_classification?.protection_class ?? "--"
        }
        identifier={inspectionData?.session_id || "--"}
        image={"any-url.com/image.jpg"}
      />

      <DeviceInfo
        section={"Device Information"}
        device={inspectionData?.device || "--"}
        model={inspectionData?.technical_data?.model_number || "--"}
        voltage={inspectionData?.technical_data?.voltage || "--"}
        serialNumber={inspectionData?.technical_data?.serial_number || "--"}
      />

      <VisualInspection
        questions={
          inspectionData?.tests?.visual_inspection?.items || [
            { name: "question", execution_order: 1 },
          ]
        }
        key={inspectionData?.tests?.visual_inspection?.display_order || 1}
        onAnswerChange={(questionId, answer) => {
          // Step 1: Check if visual inspection data structure exists
          if (inspectionData?.tests?.visual_inspection?.items) {
            // Step 2: Find the specific question by its execution_order
            const questionItem =
              inspectionData.tests.visual_inspection.items.find(
                (item: InspectionItem) => item.execution_order === questionId
              );

            // Step 3: If question exists, update it with user's answer
            if (questionItem) {
              // Direct update: Add user_response field to the question
              questionItem.user_response = answer;

              // Step 4: Trigger React re-render by updating context
              // This creates a new object reference so React knows to update
              setInspectionData({ ...inspectionData });
            }
          }
        }}
      />

      <ElectricalSafety
        questions={
          inspectionData?.tests?.electrical_inspection?.items || [
            {
              name: "question",
              execution_order: 1,
              description: "",
              measure: "",
              lower_limits: 0,
              upper_limits: 0,
            },
          ]
        }
        key={inspectionData?.tests?.electrical_inspection?.display_order || 2}
        isMeasured={isMeasured}
        onMeasurePress={() => {
          console.log("🔌 User pressed Measure button");
          setIsMeasured(true);
        }}
      />

      <FunctionalTest
        questions={
          inspectionData?.tests?.functional_inspection?.items || [
            { name: "question", execution_order: 1 },
          ]
        }
        key={inspectionData?.tests?.functional_inspection?.display_order || 3}
        onAnswerChange={(questionId, answer) => {
          // Step 1: Check if functional inspection data structure exists
          if (inspectionData?.tests?.functional_inspection?.items) {
            // Step 2: Find the specific question by its execution_order
            const questionItem =
              inspectionData.tests.functional_inspection.items.find(
                (item: InspectionItem) => item.execution_order === questionId
              );

            // Step 3: If question exists, update it with user's answer
            if (questionItem) {
              // Direct update: Add user_response field to the question
              questionItem.user_response = answer;

              // Step 4: Trigger React re-render by updating context
              // This creates a new object reference so React knows to update
              setInspectionData({ ...inspectionData });
            }
          }
        }}
      />

      <View style={styles.buttonWrapper}>
        <View style={styles.actionButton}>
          <Button
            title="Inspection Result"
            color="#F4F8FC"
            onPress={() => {
              navigation.navigate("Result");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Main container that holds all content
  container: {
    flexGrow: 1, // Allow scrolling if content is too tall
    justifyContent: "flex-start", // Start content at the top
    alignItems: "center", // Center content horizontally
    padding: 16, // Add space around the edges
    backgroundColor: "#fff", // White background
    paddingBottom: 24, // Extra space at bottom for scrolling
  },

  // Wrapper around the final "Inspection Result" button
  buttonWrapper: {
    paddingBottom: 24, // Space below the button
    paddingTop: 16, // Space above the button
    alignItems: "center", // Center the button horizontally
    width: "100%", // Take full width of parent
  },

  // The actual "Inspection Result" button styling
  actionButton: {
    backgroundColor: "#142C44", // Dark blue background
    width: "100%", // Take full width of wrapper
    borderRadius: 16, // Rounded corners
    overflow: "hidden", // Hide any content that goes outside corners
  },
});
