import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import { DynamicIconProps } from "type";

const ICON_FAMILIES = {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  AntDesign,
  Entypo,
};

const DynamicIcon = ({
  family,
  name,
  size = 24,
  color = "#FFFFFF",
}: DynamicIconProps) => {
  const Icon = ICON_FAMILIES[family];

  if (!Icon) return null;
  return <Icon name={name as any} size={size} color={color} />;
};

export default DynamicIcon;
