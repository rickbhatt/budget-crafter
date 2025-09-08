// app/oauth-native-callback.tsx

import { ActivityIndicator, Text, View } from "react-native";

export default function OAuthCallback() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#191D31" />
      <Text className="mt-4 font-quicksand-semibold text-xl text-black-300">
        Completing your Sign In...
      </Text>
    </View>
  );
}
