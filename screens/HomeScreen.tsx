import { API_AUTHORIZATION, API_PASSWORD, API_URL, API_USER } from "@env";
import { StackNavigationProp } from "@react-navigation/stack";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/navigation";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen = ({ navigation }: Props) => {
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

  return (
    <SafeAreaView style={styles.screen} edges={["left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Power Tool Inspections Made Simple, Safe, and Smart
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Image
          source={require("../assets/images/neumann.png")}
          style={styles.image}
        />
      </View>

      {/* Button */}
      <View style={styles.buttonWrapper}>
        <View style={styles.button}>
          <Button
            title="Start"
            color="#F4F8FC"
            onPress={() => {
              handleApi();
              navigation.navigate("Camera");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 24, backgroundColor: "#6B7C93" },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#F4F8FC",
  },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 300, height: 205, resizeMode: "contain" },
  buttonWrapper: { paddingBottom: 56, alignItems: "center" },
  button: {
    backgroundColor: "#142C44",
    width: "80%",
    borderRadius: 16,
    overflow: "hidden",
  },
});

export default HomeScreen;
