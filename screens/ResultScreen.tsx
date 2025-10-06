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
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
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
              onPress={() => console.log("Add label button pressed")}
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
    backgroundColor: "#fff",
    color: "#333",
    padding: 16,
    paddingTop: 32,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100%",
  },
  buttonContainer: {
    marginBottom: 32,
    gap: 16,
  },
  button: {
    backgroundColor: "#142C44",
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
});
