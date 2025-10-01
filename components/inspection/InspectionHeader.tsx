import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface InspectionHeaderProps {
  inspectionClass: string;
  identifier: string;
  image?: string | null; // URL string or base64 string from API
}

export default function InspectionHeader({
  inspectionClass,
  identifier,
  image,
}: InspectionHeaderProps) {
  // Handle image URL from API database
  const getImageSource = () => {
    if (
      image &&
      (image.startsWith("http://") || image.startsWith("https://"))
    ) {
      // Network URL from API database
      return { uri: image };
    }

    // Fallback to local image if no API image URL
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
