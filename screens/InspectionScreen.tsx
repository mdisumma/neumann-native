import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
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
  console.log("inspectionJSON:", JSON.stringify(inspectionJSON, null, 2));
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.responseBox}>
        <Text style={styles.sectionTitle}>
          Inspection Class: {inspectionJSON.inspection.inspection_class}
        </Text>
        <Image
          source={require("../assets/images/test.jpg")} // your local image
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
      {/* device info section */}
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
      {/* visual inspection section */}
      <View style={styles.responseBox}>
        <Text style={styles.sectionTitle}>
          {inspectionJSON.visual_inspection.section}
        </Text>
        <View>
          <Text>{inspectionJSON.visual_inspection.questions[0].name}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonSx}
              onPress={() => console.log("Yes pressed")}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonDx}
              onPress={() => console.log("No pressed")}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Electrical Safety Test section */}
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
          <Text>{inspectionJSON.functional_test.questions[0].name}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonSx}
              onPress={() => console.log("Yes pressed")}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonDx}
              onPress={() => console.log("No pressed")}
            >
              <Text style={styles.buttonText}>No</Text>
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

  image: { width: "100%", height: 350, borderRadius: 12, marginVertical: 16 },
  responseBox: {
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#F4F8FC",
    width: "100%",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
    color: "#142C44",
  },
  response: {
    fontSize: 14,
    color: "#142C44",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // space between the buttons
    marginTop: 16,
    width: "100%", // full width
  },
  buttonSx: {
    width: "48%", // roughly half of container width
    backgroundColor: "#F4F8FC",
    borderWidth: 1,
    borderColor: "#142C44",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: "center", // center text horizontally
    paddingVertical: 12, // vertical padding
  },
  buttonDx: {
    width: "48%",
    backgroundColor: "#F4F8FC",
    borderWidth: 1,
    borderColor: "#142C44",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    paddingVertical: 12,
  },
  buttonText: {
    color: "#142C44",
    fontWeight: "bold",
    fontSize: 16,
  },
});
