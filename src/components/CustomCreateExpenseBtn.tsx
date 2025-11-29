import { cn } from "@/utils/cn";
import React from "react";
import { View } from "react-native";
import DynamicIcon from "./DynamicIcon";

const CustomCreateExpenseBtn = ({ focused }: { focused: boolean }) => {
  return (
    <View
      className={cn(
        "w-16 h-16 p-3 rounded-full flex-center flex-row",
        focused ? "bg-active-tint" : "bg-bg-dark"
      )}
    >
      <DynamicIcon family="Entypo" name="plus" size={25} color={"#FFFFFF"} />
    </View>
  );
};

export default CustomCreateExpenseBtn;
