import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface ElectricalSafetyProps {
  questions: {
    execution_order: string | number;
    name: string;
    description: string;
    measure: string;
    lower_limits: string | number;
    upper_limits: string | number;
  }[];
  isMeasured: boolean;
  onMeasurePress: () => void;
}

export default function ElectricalSafety({
  questions,
  isMeasured,
  onMeasurePress,
}: ElectricalSafetyProps) {
  return (
    <View style={styles.responseBox}>
      <Text style={styles.sectionTitle}>Electrical Safety Test</Text>

      {/* Measure Button */}
      <View style={styles.buttonWrapper}>
        <View
          style={[styles.measureButton, isMeasured && styles.selectedButton]}
        >
          <Button
            title="Measure"
            color={isMeasured ? "#E6ECF2" : "#142C44"}
            onPress={onMeasurePress}
          />
        </View>
      </View>

      {/* Measurements List */}
      {questions.map((question) => (
        <View
          key={question.execution_order}
          style={styles.measurementContainer}
        >
          <Text style={styles.measurementsName}>{question.name}</Text>
          <Text style={styles.measurementsDescription}>
            {question.description}
          </Text>

          <View style={styles.measured}>
            <MaterialIcons
              name={
                isMeasured ? "check-circle-outline" : "radio-button-unchecked"
              }
              size={24}
              color="#142C44"
            />
            <Text style={styles.limits}>
              {isMeasured
                ? `from ${question.lower_limits} to ${question.upper_limits} ${question.measure}`
                : "Not Measured"}
            </Text>
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
  measureButton: {
    backgroundColor: "#E6ECF2",
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
  selectedButton: { backgroundColor: "#142C44" },
  measurementContainer: { marginBottom: 16 },
  measurementsName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#142C44",
    marginBottom: 4,
  },
  measurementsDescription: { fontSize: 14, color: "#142C44" },
  measured: {
    paddingTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  limits: { marginLeft: 8, fontSize: 16, color: "#142C44" },
  buttonWrapper: {
    paddingBottom: 24,
    paddingTop: 16,
    alignItems: "center",
    width: "100%",
  },
});
