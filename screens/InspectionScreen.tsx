import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
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
          <Text>Question:</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonSx}>
              <Button title="Yes" color="#142C44" onPress={() => {}} />
            </View>
            <View style={styles.buttonDx}>
              <Button title="No" color="#142C44" onPress={() => {}} />
            </View>
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
    width: "100%", // make container full width
  },
  buttonSx: {
    width: "48%",
    backgroundColor: "#F4F8FC",
    borderWidth: 1,
    borderColor: "#142C44",
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonDx: {
    width: "48%",
    backgroundColor: "#F4F8FC",
    borderWidth: 1,
    borderColor: "#142C44",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
  },
});
