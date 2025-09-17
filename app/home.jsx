import { API_AUTHORIZATION, API_PASSWORD, API_URL, API_USER } from "@env";
import { router } from "expo-router";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const handleApi = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-USER-NAME": API_USER,
          "X-USER-PASSWORD": API_PASSWORD,
          Authorization: API_AUTHORIZATION,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched JWT:", data.jwt);

      // Optional: alert the JWT
      Alert.alert("JWT Fetched", data.jwt);
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "Failed to fetch JWT");
    } finally {
      console.log("Fetch attempt finished.");
    }
  };

  const handleGoBack = () => {
    router.back(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen 🏠</Text>
      <Text style={styles.subtitle}>Welcome to your app!</Text>
      <Button title="Fetch JWT" onPress={handleApi} color="#142C44" />
      <Button title="Go Back" onPress={handleGoBack} color="#142C44" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#142C44",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    color: "#6B7C93",
  },
});
