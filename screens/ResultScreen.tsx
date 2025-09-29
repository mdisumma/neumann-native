import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Result"
>;

interface Props {
  navigation: ResultScreenNavigationProp;
}

export default function ResultScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Result Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
