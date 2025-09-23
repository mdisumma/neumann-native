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
      console.log("json:", JSON.stringify(json, null, 2));

      // ✅ keep raw JSON object in state
      setResponse(json);
    } catch (err) {
      console.error(err);
      setResponse({ error: err.message });
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

      {response && (
        <View style={styles.responseBox}>
          <Text style={styles.sectionTitle}>Device Info</Text>
          <Text style={styles.response}>Device: {response.device}</Text>
          <Text style={styles.response}>
            Type: {response.appliance_classification?.type}
          </Text>
          <Text style={styles.response}>
            Protection: {response.appliance_classification?.protection_class}
          </Text>
          <Text style={styles.response}>
            Reason: {response.appliance_classification?.reason}
          </Text>

          <Text style={styles.sectionTitle}>Tests</Text>
          {response.tests?.map((test, index) => (
            <View key={index} style={styles.testItem}>
              <Text style={styles.testName}>
                {index + 1}. {test.test_name}
              </Text>
              <Text style={styles.testDesc}>{test.test_description}</Text>
            </View>
          ))}
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
