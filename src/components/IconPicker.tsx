import { CUSTOM_CATEGORY_ICONS } from "@/constants";
import cn from "clsx";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IconFamily } from "type";
import DynamicIcon from "./DynamicIcon";

interface IconPickerProps {
  setIcon: (icon: { family: IconFamily; name: string }) => void;
}

const IconPicker = ({ setIcon }: IconPickerProps) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleSelectIcon = (icon: {
    family: IconFamily;
    name: string;
    id: string;
  }) => {
    setIcon({ family: icon.family, name: icon.name });
    setSelectedIcon(icon.id);
  };

  return (
    <View className="flex-col my-3">
      <Text className="paragraph-bold">Pick an Icon</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="max-h-20 mt-3.5"
        contentContainerStyle={{ gap: 12 }}
        scrollEventThrottle={16}
        decelerationRate={"fast"}
      >
        {CUSTOM_CATEGORY_ICONS.map((icon) => (
          <Pressable
            className={cn(
              "border border-border-dark h-14 w-14 flex-center rounded-full",
              selectedIcon === icon.id ? "bg-sky" : "bg-transparent"
            )}
            key={icon.id}
            onPress={() => handleSelectIcon(icon)}
          >
            <DynamicIcon
              name={icon.name as any}
              family={icon.family as any}
              size={24}
              color={"#000000"}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default IconPicker;
