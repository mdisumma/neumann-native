import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";

import { RootStackParamList } from "@/src/types/navigation";
import {
  DeviceInfo,
  ElectricalSafety,
  FunctionalTest,
  InspectionHeader,
  VisualInspection,
} from "../components/inspection";
import { useImageContext } from "../context/ImageContext";
import { useInspectionContext } from "../context/InspectionContext";

type InspectionItem = {
  execution_order: string | number;
  name: string;
  description?: string;
  measure?: string;
  lower_limits?: string | number;
  upper_limits?: string | number;
  user_response?: "yes" | "no" | null;
  [key: string]: any;
};

type InspectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Inspection"
>;

interface Props {
  navigation: InspectionScreenNavigationProp;
}

// MAIN COMPONENT

export default function InspectionScreen({ navigation }: Props) {
  // STATE MANAGEMENT

  // Track whether electrical measurements have been taken
  const [isMeasured, setIsMeasured] = useState<boolean>(false);

  // Get inspection data from React Context (shared state across the app)
  const { inspectionData, setInspectionData } = useInspectionContext();
  // Get captured image and analysis result from ImageContext
  const { capturedImage, analysisResult } = useImageContext();

  // Load analysis result into inspection context when available
  useEffect(() => {
    if (analysisResult && Object.keys(inspectionData).length === 0) {
      console.log(
        "🔄 Loading API data into inspection context:",
        analysisResult
      );
      setInspectionData(analysisResult);
    }
  }, [analysisResult, inspectionData, setInspectionData]);

  // Debug log to monitor inspection data changes
  useEffect(() => {
    if (Object.keys(inspectionData).length > 0) {
      console.log(
        "📊 Current inspection data:",
        JSON.stringify(inspectionData, null, 2)
      );
    }
  }, [inspectionData]);

  // Helper function to handle answer changes
  const handleAnswerChange = (
    testType: "visual_inspection" | "functional_inspection",
    questionId: string | number,
    answer: "yes" | "no" | null
  ) => {
    const testItems = inspectionData?.tests?.[testType]?.items;
    if (!testItems) return;

    const questionItem = testItems.find(
      (item: InspectionItem) => item.execution_order === questionId
    );

    if (questionItem) {
      questionItem.user_response = answer;
      console.log(
        "📊 Current inspection data:",
        JSON.stringify(inspectionData, null, 2)
      );
      setInspectionData({ ...inspectionData });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InspectionHeader
        inspectionClass={
          inspectionData?.appliance_classification?.protection_class ?? "--"
        }
        identifier={inspectionData?.session_id || "--"}
        image={capturedImage?.uri}
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

              // Debug log for visual inspection answer
              console.log(
                "📊 Current inspection data:",
                JSON.stringify(inspectionData, null, 2)
              );
              // Step 4: Trigger React re-render by updating context
              // This creates a new object reference so React knows to update
              setInspectionData({ ...inspectionData });
            }
          }
        }}
      />

      <ElectricalSafety
        questions={
          inspectionData?.tests?.electrical_inspection?.items?.map((item) => ({
            ...item,
            description: item.description || "",
            measure: item.measure || "",
            lower_limits: item.lower_limits || 0,
            upper_limits: item.upper_limits || 0,
          })) || [
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

              // Debug log for functional test answer
              console.log(
                "📊 Current inspection data:",
                JSON.stringify(inspectionData, null, 2)
              );
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
