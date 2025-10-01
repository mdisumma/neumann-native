// Import navigation types for type safety
import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

// Import React hooks and components
import React, { useContext, useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";

// Import inspection data and components
import inspectionJSON from "../api/inspection.json";
import {
  DeviceInfo,
  ElectricalSafety,
  FunctionalTest,
  InspectionHeader,
  VisualInspection,
} from "../components/inspection";
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

// MAIN COMPONENT

export default function InspectionScreen({ navigation }: Props) {
  // STATE MANAGEMENT

  // Track whether electrical measurements have been taken
  const [isMeasured, setIsMeasured] = useState<boolean>(false);

  // Get inspection data from React Context (shared state across the app)
  const { inspectionData, setInspectionData } = useContext(InspectionContext);

  // INITIALIZATION - Run when component first loads

  useEffect(() => {
    console.log(JSON.stringify(inspectionData, null, 2));
  }, []); // Empty dependency array = only run once when component mounts

  // RENDER THE USER INTERFACE

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 
        SECTION 1: INSPECTION HEADER 
        Shows basic inspection info: class, ID, date, and image from camera/API
      */}
      <InspectionHeader
        inspectionClass={
          inspectionData.appliance_classification?.protection_class ?? ""
        }
        identifier={inspectionData.session_id}
        image={"any-url.com/image.jpg"}
      />

      {/* 
        SECTION 2: DEVICE INFORMATION 
        Shows details about the device being inspected
      */}
      <DeviceInfo
        section={"Device Information"}
        device={inspectionData.device}
        model={inspectionData.technical_data.model_number}
        voltage={inspectionData.technical_data.voltage}
        serialNumber={inspectionData.technical_data.serial_number}
      />

      {/* 
        SECTION 3: VISUAL INSPECTION 
        Questions about what the inspector can see
        Users answer Yes/No to each question
      */}
      <VisualInspection
        section={""}
        questions={[]}
        answers={{}}
        onAnswerUpdate={() => {}}
      />

      {/* 
        SECTION 4: ELECTRICAL SAFETY 
        Measurements and tests for electrical safety
        Shows "Measure" button and measurement results
      */}
      <ElectricalSafety
        section={inspectionJSON.electrical_safety.section}
        measurements={inspectionJSON.electrical_safety.measurements}
        isMeasured={isMeasured}
        onMeasurePress={() => {
          console.log("🔌 User pressed Measure button");
          setIsMeasured(true);
        }}
      />

      {/* 
        SECTION 5: FUNCTIONAL TEST 
        Questions about how the device works
        Users answer Yes/No to each question
      */}
      <FunctionalTest
        section={""}
        questions={[]}
        answers={{}}
        onAnswerUpdate={() => {}}
      />

      {/* 
        SECTION 6: FINISH INSPECTION 
        Button to complete inspection and see results
      */}
      <View style={styles.buttonWrapper}>
        <View style={styles.actionButton}>
          <Button
            title="Inspection Result"
            color="#F4F8FC"
            onPress={() => {
              console.log(
                "📋 User finished inspection - navigating to results"
              );
              navigation.navigate("Result");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

// STYLING - All the visual styles for this screen

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
