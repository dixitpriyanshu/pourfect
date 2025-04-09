import { useNetworkStatus } from "@/hooks/useNetwork";
import { Animated, StyleSheet, Text } from "react-native";
import { useEffect, useRef } from "react";

export const OfflineBanner = () => {
  const isConnected = useNetworkStatus();
  const translateY = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    if (isConnected === null) return;

    Animated.timing(translateY, {
      toValue: isConnected ? -50 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isConnected]);

  if (isConnected === null) return null;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Text style={styles.text}>You're offline</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#ff5252",
    padding: 10,
    zIndex: 9999,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
