import { Stack } from "expo-router";
import React from "react";

const ProtectedLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="expense/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="expense/edit" options={{ headerShown: false }} />
      <Stack.Screen name="budget/create" />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProtectedLayout;
