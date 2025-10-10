import PassIcon from "@/assets/svg/PassIcon";

import { RootStackParamList } from "@/src/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";

import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

type SavedScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Saved"
>;

interface Props {
  navigation: SavedScreenNavigationProp;
}

export default function SavedScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <PassIcon width={56} height={56} />
          <Text>Inspection saved successfully</Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Start new Inspection"
            color="#F4F8FC"
            onPress={() => navigation.navigate("Home")}
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
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
