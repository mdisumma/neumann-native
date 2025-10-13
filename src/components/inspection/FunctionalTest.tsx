import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FunctionalTestProps {
  questions: { execution_order: string | number; name: string }[];
  onAnswerChange?: (
    questionId: string | number,
    answer: "yes" | "no" | null
  ) => void;
}

export default function FunctionalTest({
  questions,
  onAnswerChange,
}: FunctionalTestProps) {
  const [answers, setAnswers] = useState<Record<string, "yes" | "no" | null>>(
    {}
  );

  const handleButtonPress = (
    questionId: string | number,
    buttonType: "yes" | "no"
  ) => {
    setAnswers((prevAnswers) => {
      const currentAnswer = prevAnswers[questionId];
      let newAnswer: "yes" | "no" | null;

      if (currentAnswer === buttonType) {
        newAnswer = null;
      } else {
        newAnswer = buttonType;
      }

      if (onAnswerChange) {
        onAnswerChange(questionId, newAnswer);
      }

      return { ...prevAnswers, [questionId]: newAnswer };
    });
  };

  return (
    <View style={styles.responseBox}>
      <Text style={styles.sectionTitle}>Functional Test</Text>

      {questions.map((question) => {
        const currentAnswer = answers[question.execution_order];

        return (
          <View key={question.execution_order} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.name}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonLeft,
                  currentAnswer === "yes" && styles.selectedButton,
                ]}
                onPress={() =>
                  handleButtonPress(question.execution_order, "yes")
                }
              >
                <Text
                  style={[
                    styles.buttonText,
                    currentAnswer === "yes" && styles.selectedText,
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonRight,
                  currentAnswer === "no" && styles.selectedButton,
                ]}
                onPress={() =>
                  handleButtonPress(question.execution_order, "no")
                }
              >
                <Text
                  style={[
                    styles.buttonText,
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
