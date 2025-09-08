import { Stack } from "expo-router";
import React from "react";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="sso-callback" />
    </Stack>
  );
};

export default PublicLayout;
