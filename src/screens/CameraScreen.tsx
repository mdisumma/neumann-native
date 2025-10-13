import { StackNavigationProp } from "@react-navigation/stack";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

// ID IMPLEMENTATION *************************************************
// import uuid from "react-native-uuid";

import { useImageContext } from "../context/ImageContext";
import { RootStackParamList } from "../types/navigation";

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

  const takePhotoAndAnalyze = async () => {
    // Request camera permission
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert("Permission Required", "Camera permission is required!");
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (result.canceled || !result.assets[0].base64) return;

    const photo = result.assets[0];

    // ID IMPLEMENTATION *************************************************
    // const imageId = uuid.v4() as string; // Generate unique ID

    // Store image in context
    setCapturedImage({
      uri: photo.uri,
      base64: photo.base64 || undefined,
    });

    // Send to API
    setLoading(true);
    try {
      const requestBody = {
        mime_type: "image/jpeg",
        image_data_base64: photo.base64,

        // ID IMPLEMENTATION *************************************************
        // image_id: imageId,
      };

      console.log(
        "🚀 Sending to API:",
        JSON.stringify(
          {
            ...requestBody,
            image_data_base64: "[BASE64 DATA]",
          },
          null,
          2
        )
      );

      const response = await fetch(
        "https://radon.ironapi.com/v1/plugins/ai_analyze_image",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      // Success - store result and navigate
      const analysisResult = await response.json();
      setAnalysisResult(analysisResult);
      navigation.navigate("Inspection");
    } catch (error) {
      // Simple error handling
      console.error("❌ Analysis failed:", error);
      Alert.alert("Error", "Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to analyze test image for desktop/simulator testing
  const analyzeTestImage = async () => {
    setLoading(true);

    try {
      // Load the test image asset
      const asset = Asset.fromModule(require("../../assets/images/test.jpg"));
      await asset.downloadAsync();

      // Convert to base64
      const base64 = await FileSystem.readAsStringAsync(asset.localUri!, {
        encoding: "base64",
      });

      // Store image in context (similar to camera capture)
      setCapturedImage({
        uri: asset.localUri!,
        base64: base64,
      });

      // Prepare API request (same as camera function)
      const requestBody = {
        mime_type: "image/jpeg",
        image_data_base64: base64,
      };

      console.log(
        "🧪 Sending test image to API:",
        JSON.stringify(
          {
            ...requestBody,
            image_data_base64: `[BASE64 DATA - ${base64.length} chars]`,
          },
          null,
          2
        )
      );

      const response = await fetch(
        "https://radon.ironapi.com/v1/plugins/ai_analyze_image",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      // Success - store result and navigate
      const analysisResult = await response.json();
      setAnalysisResult(analysisResult);
      navigation.navigate("Inspection");
    } catch (error) {
      console.error("❌ Test image analysis failed:", error);
      Alert.alert("Error", "Failed to analyze test image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Take Photo"
        onPress={takePhotoAndAnalyze}
        disabled={loading}
      />
      <Button
        title="Test image (for Desktop)"
        onPress={analyzeTestImage}
        disabled={loading}
      />
      {loading && (
        <Text style={styles.loadingText}>
          {loading ? "🤖 Analyzing with AI..." : ""}
        </Text>
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
