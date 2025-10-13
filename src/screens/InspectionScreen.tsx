import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import {
  DeviceInfo,
  ElectricalSafety,
  FunctionalTest,
  InspectionHeader,
  VisualInspection,
} from "../components/inspection";
import { InspectionItem, useImageContext } from "../context/ImageContext";
import { RootStackParamList } from "../types/navigation";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Inspection">;
};

export default function InspectionScreen({ navigation }: Props) {
  const [isMeasured, setIsMeasured] = useState(false);
  const { capturedImage, analysisResult, updateAnalysisResult } =
    useImageContext();

  useEffect(() => {
    if (analysisResult && Object.keys(analysisResult).length > 0) {
      console.log(
        "📊 Current analysis data:",
        JSON.stringify(analysisResult, null, 2)
      );
    }
  }, [analysisResult]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InspectionHeader
        inspectionClass={
          analysisResult?.appliance_classification?.protection_class ?? "--"
        }
        identifier={analysisResult?.session_id || "--"}
        image={capturedImage?.uri}
      />

      <DeviceInfo
        section={"Device Information"}
        device={analysisResult?.device || "--"}
        model={analysisResult?.technical_data?.model_number || "--"}
        voltage={analysisResult?.technical_data?.voltage || "--"}
        serialNumber={analysisResult?.technical_data?.serial_number || "--"}
      />

      <VisualInspection
        questions={
          analysisResult?.tests?.visual_inspection?.items || [
            { name: "question", execution_order: 1 },
          ]
        }
        key={analysisResult?.tests?.visual_inspection?.display_order || 1}
        onAnswerChange={(questionId, answer) => {
          if (analysisResult?.tests?.visual_inspection?.items) {
            const questionItem =
              analysisResult.tests.visual_inspection.items.find(
                (item: InspectionItem) => item.execution_order === questionId
              );
            if (questionItem) {
              questionItem.user_response = answer;
              updateAnalysisResult({ ...analysisResult });
            }
          }
        }}
      />

      <ElectricalSafety
        questions={
          analysisResult?.tests?.electrical_inspection?.items?.map(
            (item: InspectionItem) => ({
              ...item,
              description: item.description || "",
              measure: item.measure || "",
              lower_limits: item.lower_limits || 0,
              upper_limits: item.upper_limits || 0,
            })
          ) || [
            {
              name: "question",
              execution_order: 1,
              description: "",
              measure: "",
              lower_limits: 0,
              upper_limits: 0,
            },
          ]
        }
        key={analysisResult?.tests?.electrical_inspection?.display_order || 2}
        isMeasured={isMeasured}
        onMeasurePress={() => {
          setIsMeasured(true);
        }}
      />

      <FunctionalTest
        questions={
          analysisResult?.tests?.functional_inspection?.items || [
            { name: "question", execution_order: 1 },
          ]
        }
        key={analysisResult?.tests?.functional_inspection?.display_order || 3}
        onAnswerChange={(questionId, answer) => {
          if (analysisResult?.tests?.functional_inspection?.items) {
            const questionItem =
              analysisResult.tests.functional_inspection.items.find(
                (item: InspectionItem) => item.execution_order === questionId
              );
            if (questionItem) {
              questionItem.user_response = answer;
              updateAnalysisResult({ ...analysisResult });
            }
          }
        }}
      />

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
