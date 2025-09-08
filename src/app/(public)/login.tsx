import { useAuth, useSSO } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
const Login = () => {
  const { startSSOFlow: startGoogleOAuthFlow } = useSSO();
  const [isLoading, setIsLoading] = useState(false);

  const { isSignedIn } = useAuth();

  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (isSignedIn) {
        router.replace("/(protected)/(tabs)");
        return;
      }

      const { createdSessionId, setActive } = await startGoogleOAuthFlow({
        strategy: "oauth_google",
        redirectUrl: Linking.createURL("/(public)/sso-callback", {
          scheme: "budgetcrafter",
        }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.replace("/(protected)/(tabs)");
      } else {
        router.replace("/(public)/login");
      }
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ error:", error);
      router.replace("/(public)/login");
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <View className="flex-1 flex-center flex-col  bg-emerald gap-y-8">
      <View className="w-full flex flex-col gap-y-5">
        <View className="flex flex-col">
          <Text className="text-text-light text-center font-quicksand-bold text-8xl leading-tight">
            Budget
          </Text>
          <Text className="text-text-light text-center font-quicksand-bold text-8xl">
            Crafter
          </Text>
        </View>
        <Text className="text-text-light text-center base-semibold">
          Craft Your Financial Future
        </Text>
      </View>
      <Pressable
        onPress={handleLogin}
        style={({ pressed }) => [
          {
            elevation: 10,
            shadowColor: "#878787",
          },
        ]}
        className="flex-center bg-bg-primary px-16 py-5 flex-row gap-x-2 rounded-xl active:scale-95"
      >
        <Ionicons name="logo-google" size={24} color="black" />
        <Text className="base-semibold">Continue with Google</Text>
      </Pressable>
    </View>
  );
};

export default Login;
