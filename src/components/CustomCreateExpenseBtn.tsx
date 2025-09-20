import Entypo from "@expo/vector-icons/Entypo";
import cn from "clsx";
import * as Haptics from "expo-haptics";
import { useRouter, useSegments } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

const CustomCreateExpenseBtn = () => {
  const router = useRouter();

  const segments = useSegments() as string[];

  const focused = segments.includes("add-transaction");

  const handlePress = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    } catch (error) {
      console.warn("Haptics failed:", error);
    }

    router.push("/(protected)/(tabs)/add-transaction");
  };

  return (
    <Pressable onPress={handlePress} className="flex-1 flex-row flex-center">
      <View
        className={cn(
          "w-16 h-16 p-3 rounded-full flex-center flex-row",
          focused ? "bg-active-tint" : "bg-bg-dark"
        )}
      >
        <Entypo name="add-to-list" size={25} color={"#FFFFFF"} />
      </View>
    </Pressable>
  );
};

export default CustomCreateExpenseBtn;
