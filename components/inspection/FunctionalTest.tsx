import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FunctionalTestProps {
  questions: { execution_order: string | number; name: string }[];
}

export default function FunctionalTest({ questions }: FunctionalTestProps) {
  return (
    <View style={styles.responseBox}>
      <Text style={styles.sectionTitle}>Functional Test</Text>

      {questions.map((question) => (
        <View key={question.execution_order} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.name}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonLeft]}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buttonRight]}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
});
