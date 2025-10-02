import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface VisualInspectionProps {
  questions: { execution_order: string | number; name: string }[];
}

export default function VisualInspection({ questions }: VisualInspectionProps) {
  // State to track answers for each question
  // Example: { "1": "yes", "2": "no", "3": null }
  const [answers, setAnswers] = useState<Record<string, "yes" | "no" | null>>(
    {}
  );

  // This function runs when user clicks Yes or No button
  const handleButtonPress = (
    questionId: string | number, // TypeScript: questionId can be text ("1") or number (1)
    buttonType: "yes" | "no" // TypeScript: buttonType can ONLY be "yes" or "no"
  ) => {
    // questionId = which question was clicked (example: "1", "2", "3")
    // buttonType = which button was clicked (example: "yes" or "no")

    // setAnswers is a React function that updates our state
    // Instead of giving it a new value directly, we give it a FUNCTION
    // React will call our function and pass the current state as 'prevAnswers'
    setAnswers((prevAnswers) => {
      // prevAnswers = current state that React just gave us
      // Example: { "1": "yes", "2": null, "3": "no" }

      // Look up what the current answer is for THIS specific question
      const currentAnswer = prevAnswers[questionId];
      // Example: if questionId is "2", then currentAnswer = null

      // SCENARIO 1: User clicked the SAME button that's already selected
      // Example: question 1 is "yes", user clicks "yes" again
      if (currentAnswer === buttonType) {
        // We want to REMOVE the selection (toggle it off)
        // { ...prevAnswers } = copy everything from current state
        // [questionId]: null = change just THIS question to null (unselected)
        return { ...prevAnswers, [questionId]: null };

        // Example result: { "1": null, "2": null, "3": "no" }
      }

      // SCENARIO 2: User clicked a DIFFERENT button (or no button was selected)
      // Example: question 1 was "yes", user clicks "no"
      // OR: question 2 was null, user clicks "yes"
      else {
        // We want to SELECT the new button
        // { ...prevAnswers } = copy everything from current state
        // [questionId]: buttonType = change just THIS question to the new selection
        return { ...prevAnswers, [questionId]: buttonType };

        // Example result: { "1": "no", "2": null, "3": "no" }
      }

      // Whatever we RETURN becomes the new state
      // React will then re-draw the component with the new state
    });
  };

  return (
    <View style={styles.responseBox}>
      <Text style={styles.sectionTitle}>Visual Inspection</Text>

      {questions.map((question) => {
        // Get current answer for this question
        const currentAnswer = answers[question.execution_order];

        return (
          <View key={question.execution_order} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.name}</Text>

            <View style={styles.buttonContainer}>
              {/* YES BUTTON */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonLeft,
                  // Apply selected style if "yes" is chosen
                  currentAnswer === "yes" && styles.selectedButton,
                ]}
                onPress={() =>
                  handleButtonPress(question.execution_order, "yes")
                }
              >
                <Text
                  style={[
                    styles.buttonText,
                    // Apply selected text style if "yes" is chosen
                    currentAnswer === "yes" && styles.selectedText,
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>

              {/* NO BUTTON */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonRight,
                  // Apply selected style if "no" is chosen
                  currentAnswer === "no" && styles.selectedButton,
                ]}
                onPress={() =>
                  handleButtonPress(question.execution_order, "no")
                }
              >
                <Text
                  style={[
                    styles.buttonText,
                    // Apply selected text style if "no" is chosen
                    currentAnswer === "no" && styles.selectedText,
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  responseBox: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6B7C93",
    width: "100%",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#142C44",
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 14,
    color: "#142C44",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    width: "100%",
  },
  button: {
    width: "48%",
    backgroundColor: "#E6ECF2",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 18,
  },
  buttonLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonText: {
    color: "#142C44",
    fontSize: 16,
  },
  // Selected button styles (when clicked)
  selectedButton: {
    backgroundColor: "#142C44", // Dark blue background when selected
  },
  selectedText: {
    color: "#FFFFFF", // White text when selected
  },
});
