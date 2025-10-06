import ResultStatus from "@/components/result/ResultStatus";
import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Result"
>;

interface Props {
  navigation: ResultScreenNavigationProp;
}

export default function ResultScreen({ navigation }: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.contentContainer}>
        <View style={styles.statusSection}>
          <ResultStatus resultTitle="Visual Inspection" resultStatus="Passed" />
          <ResultStatus
            resultTitle="Electrical Safety Test"
            resultStatus="Passed"
          />
          <ResultStatus
            resultTitle="Functional Inspection"
            resultStatus="Passed"
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Add label"
              color="#F4F8FC"
              onPress={() => {
                console.log("Add label button pressed");
                navigation.navigate("Linked");
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Save Inspection"
              color="#F4F8FC"
              onPress={() => console.log("Save Inspection button pressed")}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 32,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 32,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    minHeight: 500, // Use fixed minimum height instead of percentage
  },
  statusSection: {
    flex: 1,
    gap: 16, // Consistent spacing between status items
  },
  buttonContainer: {
    marginTop: 32,
    gap: 16,
  },
  button: {
    backgroundColor: "#142C44",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
