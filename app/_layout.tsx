import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import "react-native-reanimated";
import CustomHeader from "@/components/CustomHeader";
import SearchResultsOverlay from "@/components/SearchResultsOverlay";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <CustomHeader />
      <SearchResultsOverlay />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </GestureHandlerRootView>
  );
}
