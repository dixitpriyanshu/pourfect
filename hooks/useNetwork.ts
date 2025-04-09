import { useEffect, useState } from "react";
import * as Network from "expo-network";

export const useNetworkStatus = () => {
  const state = Network.useNetworkState();
  const [hydrated, setHydrated] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    if (state.isConnected !== undefined) {
      setIsConnected(state.isConnected);
      setHydrated(true);
    }
  }, [state]);

  return hydrated ? isConnected : null;
};
