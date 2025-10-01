// Camera Screen: Take photo → AI analysis → Store in global context

// React & React Native
import { useContext, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// Navigation
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

// External Libraries
import * as ImagePicker from "expo-image-picker";

// Internal
import { InspectionContext } from "../context/InspectionContext";

// Types
type CameraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Camera"
>;

interface Props {
  navigation: CameraScreenNavigationProp;
}

export default function CameraScreen({ navigation }: Props) {
  const { inspectionData, setInspectionData } = useContext(InspectionContext);
  const [loading, setLoading] = useState(false);

  // Monitor global data changes
  // useEffect(() => {
  //   if (Object.keys(inspectionData || {}).length > 0) {
  //     console.log("🌍 Global inspection data updated:");
  //     console.log(JSON.stringify(inspectionData, null, 2));
  //   }
  // }, [inspectionData]);

  // Handle camera capture and permissions
  const takePhoto = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      alert("Camera permission is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Required for API
    });

    if (!result.canceled) {
      const photo = result.assets[0];
      console.log("📸 Photo captured, starting AI analysis...");
      await analyzePhotoWithAI(photo);
    }
  };

  // Send photo to AI API and handle response
  const analyzePhotoWithAI = async (photo: ImagePicker.ImagePickerAsset) => {
    if (!photo.base64) return;

    setLoading(true);

    try {
      const requestBody = {
        mime_type: "image/jpeg",
        image_data_base64: photo.base64,
      };

      // API call to AI analysis service
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

      const analysisResult = await response.json();
      console.log("✅ AI analysis received:");
      console.log(JSON.stringify(analysisResult, null, 2));

      // Store in global context
      setInspectionData(analysisResult);

      // Redirect to inspection screen on success
      navigation.navigate("Inspection");
    } catch (error) {
      console.error("❌ AI analysis error:", error);

      const errorResult = {
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      };

      setInspectionData(errorResult);
      // Don't redirect on error, let user see the error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take a Photo" onPress={takePhoto} disabled={loading} />

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
