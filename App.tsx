import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackParamList } from "./types/navigation";

// Import screens
import CameraScreen from "./screens/CameraScreen";
import HomeScreen from "./screens/HomeScreen";
import InspectionScreen from "./screens/InspectionScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#6B7C93",
            },
            headerTintColor: "#F4F8FC",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Power Tool Inspector",
              headerShown: false, // Hide header for home screen to keep original design
            }}
          />
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{
              title: "Take Photo",
            }}
          />
          <Stack.Screen
            name="Inspection"
            component={InspectionScreen}
            options={{
              title: "Inspection",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
