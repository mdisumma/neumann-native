// Import navigation types for type safety
import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

// Import React hooks and components
import React, { useContext, useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";

// Import inspection data and components
import fallback from "../api/fallback.json";
import {
  DeviceInfo,
  ElectricalSafety,
  FunctionalTest,
  InspectionHeader,
  VisualInspection,
} from "../components/inspection";
import { InspectionContext } from "../context/InspectionContext";

// Define the navigation prop type for this screen
type InspectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Inspection"
>;

// Define the props this component receives
interface Props {
  navigation: InspectionScreenNavigationProp;
}

// MAIN COMPONENT

export default function InspectionScreen({ navigation }: Props) {
  // STATE MANAGEMENT

  // Track whether electrical measurements have been taken
  const [isMeasured, setIsMeasured] = useState<boolean>(false);

  // Get inspection data from React Context (shared state across the app)
  const { inspectionData, setInspectionData } = useContext(InspectionContext);

  // Check if inspectionData is empty and use fallback if needed
  const isInspectionDataEmpty =
    !inspectionData || Object.keys(inspectionData).length === 0;
  const currentInspectionData = isInspectionDataEmpty
    ? fallback
    : inspectionData;

  useEffect(() => {
    // If context is empty, set it with fallback data
    if (isInspectionDataEmpty && setInspectionData) {
      console.log("🔄 InspectionContext is empty, using fallback data");
      setInspectionData(fallback);
    }

    console.log(
      "📋 Current inspection data:",
      JSON.stringify(currentInspectionData, null, 2)
    );
  }, [isInspectionDataEmpty, setInspectionData]); // Re-run if context state changes

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InspectionHeader
        inspectionClass={
          currentInspectionData.appliance_classification?.protection_class ?? ""
        }
        identifier={currentInspectionData.session_id}
        image={"any-url.com/image.jpg"}
      />

      <DeviceInfo
        section={"Device Information"}
        device={currentInspectionData.device}
        model={currentInspectionData.technical_data.model_number}
        voltage={currentInspectionData.technical_data.voltage}
        serialNumber={currentInspectionData.technical_data.serial_number}
      />

      <VisualInspection
        questions={currentInspectionData.tests.visual_inspection.items}
        key={currentInspectionData.tests.visual_inspection.display_order}
      />

      <ElectricalSafety
        questions={currentInspectionData.tests.electrical_inspection.items}
        key={currentInspectionData.tests.electrical_inspection.display_order}
        isMeasured={isMeasured}
        onMeasurePress={() => {
          console.log("🔌 User pressed Measure button");
          setIsMeasured(true);
        }}
      />

      <FunctionalTest
        questions={currentInspectionData.tests.functional_inspection.items}
        key={currentInspectionData.tests.functional_inspection.display_order}
      />

      <View style={styles.buttonWrapper}>
        <View style={styles.actionButton}>
          <Button
            title="Inspection Result"
            color="#F4F8FC"
            onPress={() => {
              console.log(
                "📋 User finished inspection - navigating to results"
              );
              navigation.navigate("Result");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Main container that holds all content
  container: {
    flexGrow: 1, // Allow scrolling if content is too tall
    justifyContent: "flex-start", // Start content at the top
    alignItems: "center", // Center content horizontally
    padding: 16, // Add space around the edges
    backgroundColor: "#fff", // White background
    paddingBottom: 24, // Extra space at bottom for scrolling
  },

  // Wrapper around the final "Inspection Result" button
  buttonWrapper: {
    paddingBottom: 24, // Space below the button
    paddingTop: 16, // Space above the button
    alignItems: "center", // Center the button horizontally
    width: "100%", // Take full width of parent
  },

  // The actual "Inspection Result" button styling
  actionButton: {
    backgroundColor: "#142C44", // Dark blue background
    width: "100%", // Take full width of wrapper
    borderRadius: 16, // Rounded corners
    overflow: "hidden", // Hide any content that goes outside corners
  },
});
