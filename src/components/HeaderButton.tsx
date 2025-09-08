import cn from "clsx";
import React from "react";
import { Pressable } from "react-native";

const HeaderButton = ({ icon, onPress, iconBtnStyles }: HeaderBtn) => {
  return (
    <Pressable
      onPress={onPress}
      className={cn("screen-header-btn", iconBtnStyles)}
    >
      {icon}
    </Pressable>
  );
};

export default HeaderButton;
