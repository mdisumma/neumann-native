import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FunctionalTestProps {
  questions: { execution_order: string | number; name: string }[];
}

export default function FunctionalTest({ questions }: FunctionalTestProps) {
  // State to track answers for each question
  // Example: { "1": "yes", "2": "no", "3": null }
  const [answers, setAnswers] = useState<Record<string, "yes" | "no" | null>>(
    {}
  );

  // Handle button press for Yes/No buttons
  const handleButtonPress = (
    questionId: string | number,
    buttonType: "yes" | "no"
  ) => {
    setAnswers((prevAnswers) => {
      const currentAnswer = prevAnswers[questionId];

      // If same button is clicked, remove selection (toggle off)
      if (currentAnswer === buttonType) {
        return { ...prevAnswers, [questionId]: null };
      }
      // Otherwise, select the new button (this automatically deselects the other)
      else {
        return { ...prevAnswers, [questionId]: buttonType };
      }
    });
  };

  return (
    <View style={styles.responseBox}>
      <Text style={styles.sectionTitle}>Functional Test</Text>

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
