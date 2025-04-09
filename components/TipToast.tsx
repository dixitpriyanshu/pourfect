// components/TipToast.tsx
import { useEffect, useState } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";
import { getDailyTip } from "@/lib/getDailyTip";

const TipToast = () => {
  const [visible, setVisible] = useState(true);
  const tip = getDailyTip();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
      <Text style={styles.title}>🍸 Tip of the Day</Text>
      <Text style={styles.text}>{tip}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#FEF3C7",
    padding: 14,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontWeight: "600",
    color: "#92400E",
    marginBottom: 4,
  },
  text: {
    color: "#78350F",
  },
});

export default TipToast;
