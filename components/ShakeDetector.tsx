import { Accelerometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { Alert, Vibration } from "react-native";
import { supabase } from "@/lib/supabase"; // adjust based on your structure

const THRESHOLD = 1.5;

type Cocktail = {
  id: string;
  name: string;
  image_url: string;
  instructions: string;
  glass_type: string;
};

export default function ShakeDetector() {
  const router = useRouter();
  const lastShake = useRef<number>(Date.now());

  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    const subscribe = Accelerometer.addListener((data) => {
      const totalForce = Math.abs(data.x + data.y + data.z);
      const now = Date.now();

      if (totalForce > THRESHOLD && now - lastShake.current > 2000) {
        lastShake.current = now;
        handleShake();
      }
    });

    setSubscription(subscribe);
    Accelerometer.setUpdateInterval(300);

    return () => subscription?.remove();
  }, []);

  const handleShake = async () => {
    // Optional: add a vibration
    Vibration.vibrate();

    const { data, error } = await supabase.rpc("get_random_cocktail").single();

    const cocktail = data as Cocktail;

    if (error || !data) {
      console.error("Error fetching random cocktail:", JSON.stringify(error));

      Alert.alert("Oops", "Couldn't fetch a random cocktail.");
      return;
    }

    router.push({
      pathname: "/recipe/[id]",
      params: {
        id: cocktail.id,
      },
    });
  };

  return null; // No UI component
}
