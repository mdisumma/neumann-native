import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DeviceInfoProps {
  section: string;
  device: string;
  model: string;
  voltage: string;
  serialNumber: string;
}

export default function DeviceInfo({
  section,
  device,
  model,
  voltage,
  serialNumber,
}: DeviceInfoProps) {
  return (
    <View style={styles.responseBox}>
      <Text style={styles.sectionTitle}>{section}</Text>
      <Text style={styles.response}>Device: {device}</Text>
      <Text style={styles.response}>Model: {model}</Text>
      <Text style={styles.response}>Voltage: {voltage}</Text>
      <Text style={styles.response}>Serial Number: {serialNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  response: { fontSize: 14, color: "#142C44", marginBottom: 6 },
});
