// ============================================================================
// INSPECTION SCREEN - Main screen for conducting equipment inspections
// ============================================================================
// This screen displays an inspection form with different sections:
// 1. Inspection header (ID, date, class)
// 2. Device information (model, voltage, etc.)
// 3. Visual inspection questions (Yes/No answers)
// 4. Electrical safety measurements
// 5. Functional test questions (Yes/No answers)
// 6. Results button to proceed to next screen
// ============================================================================

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

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// Define the navigation prop type for this screen
type InspectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Inspection"
>;

// Define the props this component receives
interface Props {
  navigation: InspectionScreenNavigationProp;
}

// Define possible answer values for inspection questions
type Answer = "yes" | "no" | null; // null means no answer selected yet

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function InspectionScreen({ navigation }: Props) {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  // Store user's answers for each question (for button highlighting)
  // Example: { "visual-1": "yes", "func-2": "no", "visual-3": null }
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  // Track whether electrical measurements have been taken
  const [isMeasured, setIsMeasured] = useState<boolean>(false);

  // Get inspection data from React Context (shared state across the app)
  const { inspectionData, setInspectionData } = useContext(InspectionContext);

  // ============================================================================
  // INITIALIZATION - Run when component first loads
  // ============================================================================
  useEffect(() => {
    // If no inspection data exists in context, load it from JSON file
    if (!inspectionData || Object.keys(inspectionData).length === 0) {
      console.log("Loading initial inspection data from JSON file");
      setInspectionData(inspectionJSON);
    }
  }, []); // Empty dependency array = only run once when component mounts

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  /**
   * Updates a specific question's answer in the inspection data
   * @param sectionName - The section containing the question (e.g., "visual_inspection")
   * @param questionNumber - The order number of the question (e.g., 1, 2, 3)
   * @param answer - The user's answer ("yes", "no", or null to clear)
   */
  function updateQuestionValue(
    sectionName: string,
    questionNumber: string | number,
    answer: string | null
  ) {
    // Safety check: make sure we have inspection data
    if (!inspectionData) {
      console.log("❌ No inspection data available - cannot update question");
      return;
    }

    console.log(
      `📝 Updating question ${questionNumber} in section "${sectionName}" with answer: ${answer}`
    );

    // Get the list of questions for this section
    const questionList = inspectionData[sectionName].questions;

    // Look through each question to find the one we want to update
    for (let i = 0; i < questionList.length; i++) {
      // Compare question order numbers (convert both to numbers for safety)
      if (Number(questionList[i].order) === Number(questionNumber)) {
        console.log(`✅ Found question at position ${i} - updating answer`);

        // Update the question's value directly
        questionList[i].value = answer;

        // Tell React to re-render by creating a new object reference
        // This is important: React needs to know the data changed!
        setInspectionData({ ...inspectionData });

        // Exit the loop since we found and updated our question
        break;
      }
    }
  }

  /**
   * Handles when a user answers a question in any of the child components
   * This function does two things:
   * 1. Updates the UI (button colors)
   * 2. Updates the actual inspection data
   *
   * @param questionKey - Unique identifier for the question (e.g., "visual-1")
   * @param answer - The user's answer ("yes", "no", or null)
   * @param sectionName - Which section the question belongs to
   * @param questionOrder - The question's order number within the section
   */
  const handleAnswerUpdate = (
    questionKey: string,
    answer: Answer,
    sectionName: string,
    questionOrder: string | number
  ) => {
    console.log(`🎯 Handling answer update for ${questionKey}: ${answer}`);

    // STEP 1: Update the UI state (this controls button highlighting)
    setAnswers((previousAnswers) => ({
      ...previousAnswers, // Keep all existing answers
      [questionKey]: answer, // Update this specific question's answer
    }));

    // STEP 2: Update the actual inspection data (this saves the answer)
    updateQuestionValue(sectionName, questionOrder, answer);
  };

  // ============================================================================
  // DEBUG LOGGING - Shows complete inspection data in console
  // ============================================================================
  console.log("📊 === CURRENT INSPECTION DATA ===");
  console.log(JSON.stringify(inspectionData, null, 2));
  console.log("📊 === END INSPECTION DATA ===");

  // ============================================================================
  // RENDER THE USER INTERFACE
  // ============================================================================
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 
        SECTION 1: INSPECTION HEADER 
        Shows basic inspection info: class, ID, date, reminder
      */}
      <InspectionHeader
        inspectionClass={inspectionJSON.inspection.inspection_class}
        identifier={inspectionJSON.inspection.identifier}
        date={inspectionJSON.inspection.date}
        reminder={inspectionJSON.inspection.reminder}
      />

      {/* 
        SECTION 2: DEVICE INFORMATION 
        Shows details about the device being inspected
      */}
      <DeviceInfo
        section={inspectionJSON.device_info.section}
        device={inspectionJSON.device_info.device}
        model={inspectionJSON.device_info.model}
        voltage={inspectionJSON.device_info.voltage}
        serialNumber={inspectionJSON.device_info.serial_number}
      />

      {/* 
        SECTION 3: VISUAL INSPECTION 
        Questions about what the inspector can see
        Users answer Yes/No to each question
      */}
      <VisualInspection
        section={inspectionJSON.visual_inspection.section}
        questions={inspectionJSON.visual_inspection.questions}
        answers={answers}
        onAnswerUpdate={handleAnswerUpdate}
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
        section={inspectionJSON.functional_test.section}
        questions={inspectionJSON.functional_test.questions}
        answers={answers}
        onAnswerUpdate={handleAnswerUpdate}
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

// ============================================================================
// STYLING - All the visual styles for this screen
// ============================================================================
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
