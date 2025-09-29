import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
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

  // simple toggle function
  function toggleAnswer(questionKey: string, clickedValue: "yes" | "no") {
    setAnswers((prev) => ({
      ...prev,
      [questionKey]: prev[questionKey] === clickedValue ? null : clickedValue,
    }));
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
          <View key={question.order} style={{ marginBottom: 16 }}>
            <Text style={styles.questionText}>{question.name}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonSx,
                  answers[question.order] === "yes" && styles.selectedButton,
                ]}
                onPress={() => toggleAnswer(question.order, "yes")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    answers[question.order] === "yes" && styles.selectedText,
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonDx,
                  answers[question.order] === "no" && styles.selectedButton,
                ]}
                onPress={() => toggleAnswer(question.order, "no")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    answers[question.order] === "no" && styles.selectedText,
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
      </View>

      {/* Functional test questions */}
      <View style={styles.responseBox}>
        <Text style={styles.sectionTitle}>
          {inspectionJSON.functional_test.section}
        </Text>

        {inspectionJSON.functional_test.questions.map((question) => (
          <View key={question.order} style={{ marginBottom: 16 }}>
            <Text style={styles.questionText}>{question.name}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonSx,
                  answers[question.order] === "yes" && styles.selectedButton,
                ]}
                onPress={() => toggleAnswer(question.order, "yes")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    answers[question.order] === "yes" && styles.selectedText,
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonDx,
                  answers[question.order] === "no" && styles.selectedButton,
                ]}
                onPress={() => toggleAnswer(question.order, "no")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    answers[question.order] === "no" && styles.selectedText,
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    paddingVertical: 12,
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
    fontWeight: "bold",
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: "#142C44",
  },
  selectedText: {
    color: "#fff",
  },
});
