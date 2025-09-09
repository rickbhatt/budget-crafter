import Ionicons from "@expo/vector-icons/Ionicons";
import cn from "clsx";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenHeaderProps } from "type";
import HeaderButton from "./HeaderButton";

const ScreenHeader = ({
  title,
  rightIcons = [] as ScreenHeaderProps["rightIcons"],
  showBackBtn = false,
  headerStyles,
  iconBtnStyles,
  iconColor = "black",
  showSettingBtn = false,
}: ScreenHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  return (
    // main view
    <View
      style={{
        paddingTop: top,
      }}
      className={cn("flex-between flex-row px-4 h-36", headerStyles)}
    >
      {/* title and back button */}
      <View className="flex-1 flex items-center flex-row gap-x-2">
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

        <Text className="screen-title text-black">{title}</Text>
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
              <Ionicons name="settings-outline" size={34} color={iconColor} />
            }
          />
        )}
      </View>
    </View>
  );
};

export default ScreenHeader;
