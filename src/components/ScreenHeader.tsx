import Ionicons from "@expo/vector-icons/Ionicons";
import cn from "clsx";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { ScreenHeaderProps } from "type";
import HeaderButton from "./HeaderButton";

const ScreenHeader = ({
  title,
  rightIcons = [] as ScreenHeaderProps["rightIcons"],
  showBackBtn = false,
  headerStyles = "bg-bg-primary",
  iconBtnStyles = "bg-gray-100",
  iconColor = "black",
  showSettingBtn = false,
  titleStyles = "text-text-primary",
}: ScreenHeaderProps) => {
  const router = useRouter();
  return (
    // main view
    <View className={cn("screen-header", headerStyles)}>
      {/* title and back button */}
      <View className="flex-1 flex items-center flex-row gap-x-3">
        {showBackBtn && (
          <HeaderButton
            onPress={() => router.back()}
            iconBtnStyles={iconBtnStyles}
            icon={
              <Ionicons
                name="chevron-back-outline"
                size={24}
                color={iconColor}
              />
            }
          />
        )}

        <Text className={cn("screen-title", titleStyles)}>{title}</Text>
      </View>

      {/* right side buttons */}
      <View className="flex flex-row items-center justify-end gap-x-2">
        {rightIcons?.map((icon) => (
          <HeaderButton
            key={icon.name}
            onPress={() => router.push(icon.path)}
            iconBtnStyles={iconBtnStyles}
            icon={icon.icon}
          />
        ))}
        {showSettingBtn && (
          <HeaderButton
            onPress={() => router.push("/(protected)/settings")}
            iconBtnStyles={iconBtnStyles}
            icon={
              <Ionicons name="settings-outline" size={30} color={iconColor} />
            }
          />
        )}
      </View>
    </View>
  );
};

export default ScreenHeader;
