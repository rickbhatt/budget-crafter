import Ionicons from "@expo/vector-icons/Ionicons";
import cn from "clsx";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderButton from "./HeaderButton";

const ScreenHeader = ({
  title,
  rightIcons = [],
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
      <View className="flex-center flex-row gap-x-2">
        {showBackBtn && router.canGoBack() && (
          <HeaderButton
            onPress={() => {}}
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
      <View>
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
