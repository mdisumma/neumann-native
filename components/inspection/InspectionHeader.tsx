import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface InspectionHeaderProps {
  inspectionClass: string;
  identifier: string;
  date: string;
  reminder: string;
}

export default function InspectionHeader({
  inspectionClass,
  identifier,
  date,
  reminder,
}: InspectionHeaderProps) {
  return (
    <View style={styles.responseBox}>
      <Text style={styles.sectionTitle}>
        Inspection Class: {inspectionClass}
      </Text>
      <Image
        source={require("../../assets/images/test.jpg")}
        style={styles.image}
      />
      <Text style={styles.response}>ID: {identifier}</Text>
      <Text style={styles.response}>Date: {date}</Text>
      <Text style={styles.response}>Reminder: {reminder}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", height: 350, borderRadius: 12, marginVertical: 16 },
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
