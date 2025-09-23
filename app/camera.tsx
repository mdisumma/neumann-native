import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Camera() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null); // stores the URI and base64
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    device?: string;
    error?: string;
  } | null>(null);

  // Open camera to take a photo and send it automatically
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
      base64: true, // get base64 directly
    });

    if (!result.canceled) {
      const img = result.assets[0];
      setImage(img); // update state for UI
      // Automatically send image to API
      sendImage(img);
    }
  };

  // Send the image to the API
  // Send the image to the API
  const sendImage = async (img: ImagePicker.ImagePickerAsset | null) => {
    const imageToSend = img || image;
    if (!imageToSend || !imageToSend.base64) {
      alert("No image selected!");
      return;
    }

    try {
      setLoading(true);
      setResponse(null);

      const body = {
        mime_type: "image/jpeg",
        image_data_base64: imageToSend.base64,
      };

      const res = await fetch(
        "https://radon.ironapi.com/v1/plugins/ai_analyze_image",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const json = await res.json();
      console.log("json:", JSON.stringify(json, null, 2));

      // ✅ keep raw JSON object in state
      setResponse(json);
    } catch (err) {
      console.error(err);
      setResponse({
        error:
          typeof err === "object" && err !== null && "message" in err
            ? String((err as { message?: unknown }).message)
            : String(err),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!image && <Button title="Take Photo" onPress={takePhoto} />}

      {image && <Image source={{ uri: image.uri }} style={styles.image} />}

      {loading && <Text style={styles.label}>Sending image...</Text>}

      {response && (
        <View style={styles.responseBox}>
          <Text style={styles.sectionTitle}>Device Info</Text>
          <Text style={styles.response}>Device: {response.device}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  label: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  image: { width: 300, height: 300, borderRadius: 12, marginVertical: 20 },
  responseBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f4f4f4",
    width: "100%",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  response: {
    fontSize: 14,
    color: "black",
    marginBottom: 5,
  },
  testItem: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: "#007AFF",
  },
  testName: { fontWeight: "600", fontSize: 14, color: "#222" },
  testDesc: { fontSize: 13, color: "#555" },
});
