import ResultStatus from "@/components/inspection/result/ResultStatus";
import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

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
      <ResultStatus resultTitle="Visual Inspection" resultStatus="Passed" />
      <ResultStatus
        resultTitle="Electrical Safety Test"
        resultStatus="Passed"
      />
      <ResultStatus resultTitle="Functional Inspection" resultStatus="Passed" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    color: "#333",
    padding: 24,
  },
});
