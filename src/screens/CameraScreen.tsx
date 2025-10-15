import { StackNavigationProp } from "@react-navigation/stack";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import uuid from "react-native-uuid";
import { useImageContext } from "../context/ImageContext";
import { RootStackParamList } from "../types/navigation";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Camera">;
};

export default function CameraScreen({ navigation }: Props) {
  const { setCapturedImage, setAnalysisResult } = useImageContext();
  const [loading, setLoading] = useState(false);

  const getMimeType = (uri: string) => {
    const mimeType = mime.getType(uri); // automatically detects based on file extension
    return mimeType || "application/octet-stream"; // fallback if unknown
  };

  const takePhotoAndAnalyze = async () => {
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

    if (result.canceled || !result.assets[0].base64) return;

    const photo = result.assets[0];
    setCapturedImage({
      uri: photo.uri,
      base64: photo.base64 || undefined,
    });
    const mimeType = getMimeType(photo.uri);

    setLoading(true);
    try {
      const requestBody = {
        mime_type: mimeType, // use detected MIME type
        image_data_base64: photo.base64,
        image_id: uuid.v4() as string,
      };
      console.log("📸 mime type:", mimeType);
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

      const analysisResult = await response.json();
      setAnalysisResult(analysisResult);
      navigation.navigate("Inspection");
    } catch (error) {
      console.error("❌ Analysis failed:", error);
      Alert.alert("Error", "Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const analyzeTestImage = async () => {
    setLoading(true);
    try {
      const asset = Asset.fromModule(require("../../assets/images/test.jpg"));
      await asset.downloadAsync();
      const base64 = await FileSystem.readAsStringAsync(asset.localUri!, {
        encoding: "base64",
      });
      setCapturedImage({
        uri: asset.localUri!,
        base64: base64,
      });

      const requestBody = {
        mime_type: "image/jpeg",
        image_data_base64: base64,
      };

      console.log(
        "🧪 Sending test image to API:",
        JSON.stringify(
          {
            ...requestBody,
            image_data_base64: `[BASE64 DATA]`,
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
