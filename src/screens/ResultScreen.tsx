import ResultStatus from "@/src/components/result/ResultStatus";
import React from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";

interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
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
                navigation.navigate("Lablel");
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Save Inspection"
              color="#F4F8FC"
              onPress={() => {
                navigation.navigate("Saved");
              }}
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
    minHeight: 500,
  },
  statusSection: {
    flex: 1,
    gap: 16,
  },
  buttonContainer: {
    marginTop: 32,
    gap: 16,
  },
  button: {
    backgroundColor: "#142C44",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
