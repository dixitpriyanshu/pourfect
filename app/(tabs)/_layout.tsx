// app/(tabs)/layout.tsx
import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            tint={"extraLight"}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.05)",
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="cocktails"
        listeners={{
          tabPress: () => {
            router.navigate("/(tabs)/cocktails");
          },
        }}
        options={{
          title: "Cocktails",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="wine" size={size} color={color} />
          ),
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="alcohols"
        listeners={{
          tabPress: () => {
            router.navigate("/(tabs)/alcohols");
          },
        }}
        options={{
          title: "Alcohols",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="beer" size={size} color={color} />
          ),
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="favourites"
        listeners={{
          tabPress: () => {
            router.navigate("/(tabs)/favourites");
          },
        }}
        options={{
          title: "Favourites",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
          headerTransparent: true,
        }}
      />
    </Tabs>
  );
}
