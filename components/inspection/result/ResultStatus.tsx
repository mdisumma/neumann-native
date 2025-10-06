import React from "react";
import { StyleSheet, Text, View } from "react-native";

import PassIcon from "@/assets/svg/PassIcon";

export default function ResultStatus({
  resultTitle,
  resultStatus,
}: {
  resultTitle: string;
  resultStatus: string;
}) {
  return (
    <View style={styles.resultContainer}>
      <View>
        <Text style={styles.resultTitle}>{resultTitle}</Text>
        <Text style={styles.resultStatus}>
          <Text style={{ fontWeight: "bold" }}>Status:</Text> {resultStatus}
        </Text>
      </View>
      <PassIcon width={24} height={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 24,
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  resultStatus: { fontSize: 14 },
});
