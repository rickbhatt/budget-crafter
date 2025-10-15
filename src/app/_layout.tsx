import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { api } from "convex/_generated/api";
import { ConvexReactClient, useMutation, useQuery } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useLocales } from "expo-localization";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "./global.css";

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error("Missing Clerk Publishable Key");
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const InitialLayout = () => {
  const { isSignedIn } = useAuth();

  const locales = useLocales();

  const user = useQuery(api.users.queries.getAuthenticatedUserProfile);
  const updateCurrency = useMutation(api.users.mutations.updateCurrencyDetails);

  useEffect(() => {
    if (user) {
      if (!user?.currency) {
        updateCurrency({
          currencyCode: locales[0].currencyCode || "INR",
          currencySymbol: locales[0].currencySymbol || "₹",
          decimalSeparator: locales[0].decimalSeparator || ".",
          digitGroupingSeparator: locales[0].digitGroupingSeparator || ",",
        });
      }
    }
  }, [user]);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={isSignedIn as boolean}>
          <Stack.Screen name="(protected)" />
        </Stack.Protected>
        <Stack.Protected guard={!isSignedIn as boolean}>
          <Stack.Screen name="(public)" />
        </Stack.Protected>
      </Stack>
    </>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={clerkPublishableKey}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <SafeAreaProvider>
            <GestureHandlerRootView className="flex-1">
              <KeyboardProvider>
                <InitialLayout />
              </KeyboardProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </ConvexProviderWithClerk>
      </ClerkLoaded>
      <Toast />
    </ClerkProvider>
  );
}
