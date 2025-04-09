import { useEffect, useState } from "react";
import * as Network from "expo-network";

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const getnetworkState = async () => {
      const net = await Network.getNetworkStateAsync();
      setIsConnected(net.isConnected?.valueOf() || false);
    };

    getnetworkState();
  }, []);

  return isConnected;
};
