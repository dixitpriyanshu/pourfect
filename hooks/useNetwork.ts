import { useEffect, useState } from "react";
import * as Network from "expo-network";

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  const state = Network.useNetworkState();

  useEffect(() => {
    setIsConnected(state.isConnected?.valueOf() ?? false);
  }, [state]);

  return isConnected;
};
