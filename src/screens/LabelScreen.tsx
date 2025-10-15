import { StackNavigationProp } from "@react-navigation/stack";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../types/navigation";

import * as ImagePicker from "expo-image-picker";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Label">;
};

const LabelScreen = ({ navigation }: Props) => {
  const takePhotoLabel = async () => {
    try {
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

      if (result.canceled || !result.assets || !result.assets[0]?.base64)
        return;

      const photo = result.assets[0];
      console.log("Photo taken:", photo.uri);
    } catch (err) {
      console.error("Camera error:", err);
      Alert.alert("Error", "Unable to open camera. Please try again.");
    }
  };

  return (
    <View>
      <Text>Label Screen</Text>
      <Button title="Take Photo" onPress={takePhotoLabel} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LabelScreen;
