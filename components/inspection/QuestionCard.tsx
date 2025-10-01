import React from "react";
import { StyleSheet, Text, View } from "react-native";
import YesNoButton from "./YesNoButton";

interface QuestionCardProps {
  questionText: string;
  questionKey: string;
  currentAnswer: "yes" | "no" | null;
  onAnswerChange: (answer: "yes" | "no" | null) => void;
}

export default function QuestionCard({
  questionText,
  questionKey,
  currentAnswer,
  onAnswerChange,
}: QuestionCardProps) {
  // Handle YES button press
  const handleYesPress = () => {
    console.log(`YES button clicked for ${questionKey}`);
    const newAnswer = currentAnswer === "yes" ? null : "yes";
    console.log(`${questionKey}: ${currentAnswer} -> ${newAnswer}`);
    onAnswerChange(newAnswer);
  };

  // Handle NO button press
  const handleNoPress = () => {
    console.log(`NO button clicked for ${questionKey}`);
    const newAnswer = currentAnswer === "no" ? null : "no";
    console.log(`${questionKey}: ${currentAnswer} -> ${newAnswer}`);
    onAnswerChange(newAnswer);
  };

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{questionText}</Text>
      <View style={styles.buttonContainer}>
        <YesNoButton
          text="Yes"
          isSelected={currentAnswer === "yes"}
          onPress={handleYesPress}
          position="left"
        />
        <YesNoButton
          text="No"
          isSelected={currentAnswer === "no"}
          onPress={handleNoPress}
          position="right"
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  questionContainer: { marginBottom: 16 },
  questionText: { fontSize: 14, color: "#142C44", marginBottom: 8 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    width: "100%",
  },
});
