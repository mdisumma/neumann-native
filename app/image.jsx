import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text } from "react-native";

export default function App() {
  const [image, setImage] = useState(null); // stores the URI and base64
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Open camera to take a photo
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
      setImage(result.assets[0]); // contains { uri, base64 }
    }
  };

  // Send the image to the API
  const sendImage = async () => {
    if (!image || !image.base64) {
      alert("No image selected!");
      return;
    }

    try {
      setLoading(true);
      setResponse(null);

      const body = {
        mime_type: "image/jpeg",
        image_data_base64: image.base64,
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

      // ✅ Log the response to the console
      console.log("API response:", json);

      setResponse(JSON.stringify(json, null, 2));
      console.log(json);
    } catch (err) {
      console.error(err);
      setResponse("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Take a photo and send it to the API</Text>

      <Button title="Take Photo" onPress={takePhoto} />

      {image && (
        <>
          <Image source={{ uri: image.uri }} style={styles.image} />
          <Button
            title={loading ? "Sending..." : "Send Image to API"}
            onPress={sendImage}
          />
        </>
      )}

      {response && <Text style={styles.response}>{response}</Text>}
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
  response: { marginTop: 20, fontSize: 14, color: "black" },
});
