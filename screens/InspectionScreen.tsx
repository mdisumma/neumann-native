import { RootStackParamList } from "@/types/navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import inspectionJSON from "../api/inspection.json";

type InspectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Inspection"
>;

interface Props {
  navigation: InspectionScreenNavigationProp;
}

// type for answer
type Answer = "yes" | "no" | null;

export default function InspectionScreen({ navigation }: Props) {
  // single state for all answers
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [measure, setMeasure] = useState<boolean>(false);

  // toggle function
  function toggleAnswer(questionKey: string, clickedValue: "yes" | "no") {
    console.log(answers);
    setAnswers((prevAnswers) => {
      // get the current stored answer for this question
      const currentAnswer = prevAnswers[questionKey];

      let newAnswer: Answer;

      // if the same option is clicked again, reset it
      if (currentAnswer === clickedValue) {
        newAnswer = null;
      } else {
        // otherwise set the new answer
        newAnswer = clickedValue;
      }

      // return all previous answers + this updated one
      return {
        ...prevAnswers,
        [questionKey]: newAnswer,
      };
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Inspection info */}
      <View style={styles.responseBox}>
        <Text style={styles.sectionTitle}>
          Inspection Class: {inspectionJSON.inspection.inspection_class}
        </Text>
        <Image
          source={require("../assets/images/test.jpg")}
          style={styles.image}
        />
        <Text style={styles.response}>
          ID: {inspectionJSON.inspection.identifier}
        </Text>
        <Text style={styles.response}>
          Date: {inspectionJSON.inspection.date}
        </Text>
        <Text style={styles.response}>
          Reminder: {inspectionJSON.inspection.reminder}
        </Text>
      </View>

      {/* Device info */}
      <View style={styles.responseBox}>
        <Text style={styles.sectionTitle}>
          {inspectionJSON.device_info.section}
        </Text>
        <Text style={styles.response}>
          Device: {inspectionJSON.device_info.device}
        </Text>
        <Text style={styles.response}>
          Model: {inspectionJSON.device_info.model}
        </Text>
        <Text style={styles.response}>
          Voltage: {inspectionJSON.device_info.voltage}
        </Text>
        <Text style={styles.response}>
          Serial Number: {inspectionJSON.device_info.serial_number}
        </Text>
      </View>

      {/* Visual inspection questions */}
      <View style={styles.responseBox}>
        <Text style={styles.sectionTitle}>
          {inspectionJSON.visual_inspection.section}
        </Text>

        {inspectionJSON.visual_inspection.questions.map((question) => (
          <View key={`visual-${question.order}`} style={{ marginBottom: 16 }}>
            {/* Show the question text */}
            <Text style={styles.questionText}>{question.name}</Text>

            <View style={styles.buttonContainer}>
              {/* YES button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonSx,
                  answers[`visual-${question.order}`] === "yes" &&
                    styles.selectedButton,
                ]}
                // When pressed: call toggleAnswer with "yes"
                onPress={() => toggleAnswer(`visual-${question.order}`, "yes")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    answers[`visual-${question.order}`] === "yes" &&
                      styles.selectedText,
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>

              {/* NO button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonDx,
                  answers[`visual-${question.order}`] === "no" &&
                    styles.selectedButton,
                ]}
                // When pressed: call toggleAnswer with "no"
                onPress={() => toggleAnswer(`visual-${question.order}`, "no")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    answers[`visual-${question.order}`] === "no" &&
                      styles.selectedText,
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Electrical Safety Test */}
      <View style={styles.responseBox}>
        <Text style={styles.sectionTitle}>
          {inspectionJSON.electrical_safety.section}
        </Text>
        <View style={styles.buttonWrapper}>
          <View
            style={[styles.measureButton, measure && styles.selectedButton]}
          >
            <Button
              title="Measure"
              color={measure ? "#E6ECF2" : "#142C44"}
              onPress={() => {
                setMeasure(true);
                console.log("Measure button pressed");
              }}
            />
          </View>
        </View>
        {inspectionJSON.electrical_safety.measurements.map((measurement) => (
          <View key={measurement.order} style={{ marginBottom: 16 }}>
            <Text style={styles.measurementsName}>{measurement.name}</Text>
            <Text style={styles.measurementsDescription}>
              {measurement.description}
            </Text>
            {measure === false ? (
              <View style={styles.measured}>
                <MaterialIcons
                  name="radio-button-unchecked"
                  size={24}
                  color="#142C44"
                />
                <Text style={styles.limits}>Not Measured</Text>
              </View>
            ) : (
              <View style={styles.measured}>
                <MaterialIcons
                  name="check-circle-outline"
                  size={24}
                  color="#142C44"
                />
                <Text style={styles.limits}>
                  {measurement.limits.min} {measurement.unit}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Functional test questions */}
      <View style={styles.responseBox}>
        <Text style={styles.sectionTitle}>
          {inspectionJSON.functional_test.section}
        </Text>

        {inspectionJSON.functional_test.questions.map((question) => (
          <View key={`func-${question.order}`} style={{ marginBottom: 16 }}>
            {/* Show the question text */}
            <Text style={styles.questionText}>{question.name}</Text>

            <View style={styles.buttonContainer}>
              {/* YES button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonSx,
                  answers[`func-${question.order}`] === "yes" &&
                    styles.selectedButton,
                ]}
                onPress={() => toggleAnswer(`func-${question.order}`, "yes")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    answers[`func-${question.order}`] === "yes" &&
                      styles.selectedText,
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>

              {/* NO button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonDx,
                  answers[`func-${question.order}`] === "no" &&
                    styles.selectedButton,
                ]}
                onPress={() => toggleAnswer(`func-${question.order}`, "no")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    answers[`func-${question.order}`] === "no" &&
                      styles.selectedText,
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Action Button */}
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
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    paddingBottom: 24,
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 12,
    marginVertical: 16,
  },
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
  response: {
    fontSize: 14,
    color: "#142C44",
    marginBottom: 6,
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
  buttonSx: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonDx: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonText: {
    color: "#142C44",
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: "#142C44",
  },
  selectedText: {
    color: "#fff",
  },
  measureButton: {
    backgroundColor: "#E6ECF2",
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
  measurementsName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#142C44",
    marginBottom: 4,
  },
  measurementsDescription: {
    fontSize: 14,
    color: "#142C44",
  },
  measured: {
    paddingTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  limits: {
    marginLeft: 8,
    fontSize: 16,
    color: "#142C44",
  },
  buttonWrapper: {
    paddingBottom: 24,
    paddingTop: 16,
    alignItems: "center",
    width: "100%",
  },
  actionButton: {
    backgroundColor: "#142C44",
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
});
