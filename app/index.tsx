import { Button, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
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
          <Button title="Start" color="#F4F8FC" onPress={() => {}} />
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

export default Index;
