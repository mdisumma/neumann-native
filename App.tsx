import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackParamList } from "./types/navigation";

// Import screens
import CameraScreen from "./src/screens/CameraScreen";
import HomeScreen from "./src/screens/HomeScreen";
import InspectionScreen from "./src/screens/InspectionScreen";
import LinkedScreen from "./src/screens/LinkedScreen";
import ResultScreen from "./src/screens/ResultScreen";
import SavedScreen from "./src/screens/SavedScreen";

// Import the context providers
import { ImageProvider } from "./src/context/ImageContext";
import { InspectionProvider } from "./src/context/InspectionContext";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <InspectionProvider>
      <ImageProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: { backgroundColor: "#6B7C93" },
                headerTintColor: "#F4F8FC",
                headerTitleStyle: { fontWeight: "bold" },
              }}
            >
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: "Power Tool Inspector",
                  headerShown: false, // Hide header for home screen
                }}
              />
              <Stack.Screen
                name="Camera"
                component={CameraScreen}
                options={{ title: "Take Photo" }}
              />
              <Stack.Screen
                name="Inspection"
                component={InspectionScreen}
                options={{ title: "Inspection" }}
              />
              <Stack.Screen
                name="Result"
                component={ResultScreen}
                options={{ title: "Result" }}
              />
              <Stack.Screen
                name="Linked"
                component={LinkedScreen}
                options={{
                  title: "Link Label",
                }}
              />
              <Stack.Screen
                name="Saved"
                component={SavedScreen}
                options={{
                  title: "Saved",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ImageProvider>
    </InspectionProvider>
  );
}
