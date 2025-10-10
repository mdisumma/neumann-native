import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

import { useImageContext } from "../context/ImageContext";
import { RootStackParamList } from "../types/navigation";

import { v4 as uuidv4 } from "react-native-uuid";

type CameraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Camera"
>;

interface Props {
  navigation: CameraScreenNavigationProp;
}

export default function CameraScreen({ navigation }: Props) {
  const { setCapturedImage, setAnalysisResult } = useImageContext();
  const [loading, setLoading] = useState(false);

  const takePhoto = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert("Permission Required", "Camera permission is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const photo = result.assets[0];

      setCapturedImage({
        id: uuidv4(),
        uri: photo.uri,
        base64: photo.base64 || undefined,
        timestamp: new Date().toISOString(),
      });

      await analyzePhotoWithAI(photo);
    }
  };

  const analyzePhotoWithAI = async (photo: ImagePicker.ImagePickerAsset) => {
    if (!photo.base64) {
      Alert.alert("Error", "No image data available for analysis");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://radon.ironapi.com/v1/plugins/ai_analyze_image",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mime_type: "image/jpeg",
            image_data_base64: photo.base64,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const analysisResult = await response.json();
      setAnalysisResult(analysisResult);
      navigation.navigate("Inspection");
    } catch (error) {
      console.error("❌ AI analysis error:", error);
      Alert.alert(
        "Analysis Failed",
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take a Photo" onPress={takePhoto} disabled={loading} />
      <Button
        title="Go to Inspection"
        onPress={() => navigation.navigate("Inspection")}
        disabled={loading}
      />
      {loading && (
        <Text style={styles.loadingText}>🤖 Analyzing photo with AI...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    gap: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#142C44",
    textAlign: "center",
    fontStyle: "italic",
  },
});
