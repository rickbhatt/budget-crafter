import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { NetworkState } from "type";

export const useNetworkStatus = () => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: null,
    isInternetReachable: null,
    connectionType: "unknown",
    details: null,
  });
  const refresh = async () => {
    try {
      const state = await NetInfo.fetch();
      setNetworkState({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        connectionType: state.type,
        details: state,
      });
    } catch (error) {
      console.error("Error fetching network state:", error);
    }
  };

  useEffect(() => {
    // Fetch initial state
    refresh();

    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkState({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        connectionType: state.type,
        details: state,
      });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    ...networkState,
    refresh,
  };
};
