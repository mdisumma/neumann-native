import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface YesNoButtonProps {
  text: "Yes" | "No";
  isSelected: boolean;
  onPress: () => void;
  position: "left" | "right";
}

export default function YesNoButton({
  text,
  isSelected,
  onPress,
  position,
}: YesNoButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        position === "left" ? styles.buttonLeft : styles.buttonRight,
        isSelected && styles.selectedButton,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, isSelected && styles.selectedText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "48%",
    backgroundColor: "#E6ECF2",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 18,
  },
  buttonLeft: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  buttonRight: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
  buttonText: { color: "#142C44", fontSize: 16 },
  selectedButton: { backgroundColor: "#142C44" },
  selectedText: { color: "#fff" },
});
