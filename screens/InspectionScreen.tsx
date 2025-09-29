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

export default function InspectionScreen({ navigation }: Props) {
  // simple state for answers
  const [visualAnswer, setVisualAnswer] = useState<"yes" | "no" | null>(null);
  const [funcAnswer, setFuncAnswer] = useState<"yes" | "no" | null>(null);

  // toggle handler
  const toggleAnswer = (
    current: "yes" | "no" | null,
    setState: React.Dispatch<React.SetStateAction<"yes" | "no" | null>>,
    value: "yes" | "no"
  ) => {
    if (current === value) {
      setState(null); // deselect if same button pressed
    } else {
      setState(value);
    }
  };

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

      {/* Device info section */}
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

      {/* Visual inspection section */}
      <View style={styles.responseBox}>
        <Text style={styles.sectionTitle}>
          {inspectionJSON.visual_inspection.section}
        </Text>
        <View>
          <Text style={styles.questionText}>
            {inspectionJSON.visual_inspection.questions[0].name}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonSx,
                visualAnswer === "yes" && styles.selectedButton,
              ]}
              onPress={() => toggleAnswer(visualAnswer, setVisualAnswer, "yes")}
            >
              <Text
                style={[
                  styles.buttonText,
                  visualAnswer === "yes" && styles.selectedText,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonDx,
                visualAnswer === "no" && styles.selectedButton,
              ]}
              onPress={() => toggleAnswer(visualAnswer, setVisualAnswer, "no")}
            >
              <Text
                style={[
                  styles.buttonText,
                  visualAnswer === "no" && styles.selectedText,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Electrical Safety Test section (unchanged) */}
      <View style={styles.responseBox}>
        <Text style={styles.sectionTitle}>
          {inspectionJSON.electrical_safety.section}
        </Text>
      </View>

      {/* Functional test section */}
      <View style={styles.responseBox}>
        <Text style={styles.sectionTitle}>
          {inspectionJSON.functional_test.section}
        </Text>
        <View>
          <Text style={styles.questionText}>
            {inspectionJSON.functional_test.questions[0].name}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonSx,
                funcAnswer === "yes" && styles.selectedButton,
              ]}
              onPress={() => toggleAnswer(funcAnswer, setFuncAnswer, "yes")}
            >
              <Text
                style={[
                  styles.buttonText,
                  funcAnswer === "yes" && styles.selectedText,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonDx,
                funcAnswer === "no" && styles.selectedButton,
              ]}
              onPress={() => toggleAnswer(funcAnswer, setFuncAnswer, "no")}
            >
              <Text
                style={[
                  styles.buttonText,
                  funcAnswer === "no" && styles.selectedText,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "#E6ECF2", // neutral background
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
    color: "#142C44", // neutral text
    fontWeight: "bold",
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: "#142C44", // dark background when selected
  },
  selectedText: {
    color: "#fff", // white text when selected
  },
});
