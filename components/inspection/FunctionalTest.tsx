import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QuestionCard from "./QuestionCard";

interface Question {
  order: string | number;
  name: string;
  value?: string | null;
}

interface FunctionalTestProps {
  section: string;
  questions: Question[];
  answers: Record<string, "yes" | "no" | null>;
  onAnswerUpdate: (
    questionKey: string,
    answer: "yes" | "no" | null,
    sectionName: string,
    questionOrder: string | number
  ) => void;
}

export default function FunctionalTest({
  section,
  questions,
  answers,
  onAnswerUpdate,
}: FunctionalTestProps) {
  // Handle when a question answer changes
  const handleQuestionAnswer = (
    questionOrder: string | number,
    answer: "yes" | "no" | null
  ) => {
    const questionKey = `func-${questionOrder}`;
    onAnswerUpdate(questionKey, answer, "functional_test", questionOrder);
  };

  return (
    <View style={styles.responseBox}>
      <Text style={styles.sectionTitle}>{section}</Text>

      {questions.map((question) => {
        const questionKey = `func-${question.order}`;
        return (
          <QuestionCard
            key={questionKey}
            questionText={question.name}
            questionKey={questionKey}
            currentAnswer={answers[questionKey]}
            onAnswerChange={(answer) =>
              handleQuestionAnswer(question.order, answer)
            }
          />
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
});
