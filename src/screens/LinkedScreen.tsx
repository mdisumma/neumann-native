import LinkedIcon from "@/assets/svg/LinkedIcon";
import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}

export default function LinkedScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <LinkedIcon width={56} height={56} />
          <Text>Label and Device linked successfully</Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Save Inspection"
            color="#F4F8FC"
            onPress={() => console.log("Save Inspection button pressed")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 48,
    padding: 16,
  },
  container: {
    minHeight: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 52,
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
