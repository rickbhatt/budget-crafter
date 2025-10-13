import { Stack } from "expo-router";
import React from "react";

const ProtectedLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="expense/[id]" />
      <Stack.Screen name="expense/edit" />
      <Stack.Screen name="expense/create" />
      <Stack.Screen name="budget/create" />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProtectedLayout;
