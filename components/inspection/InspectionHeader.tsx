import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface InspectionHeaderProps {
  inspectionClass: string;
  identifier: string;
  image?: string | null; // Image URI (network URL, file URI, or null for fallback)
}

export default function InspectionHeader({
  inspectionClass,
  identifier,
  image,
}: InspectionHeaderProps) {
  const getImageSource = () => {
    // Return URI object for any valid image source
    if (image && image.includes("://")) {
      return { uri: image };
    }

    // Fallback to local asset if no valid image provided
    return require("../../assets/images/test.png");
  };

  return (
    <View style={styles.responseBox}>
      <Text style={styles.sectionTitle}>
        Inspection Class: {inspectionClass}
      </Text>
      <Image
        source={getImageSource()}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.response}>ID: {identifier}</Text>
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
