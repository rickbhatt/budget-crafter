import { cn } from "@/utils/cn";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable } from "react-native";
import { HeaderBtnProps } from "type";

const HeaderButton = ({ icon, onPress, iconBtnStyles }: HeaderBtnProps) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      className={cn("screen-header-btn", iconBtnStyles)}
    >
      {icon}
    </Pressable>
  );
};

export default HeaderButton;
