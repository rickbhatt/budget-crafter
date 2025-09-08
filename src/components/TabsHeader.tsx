import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  title: string;
}

const TabsHeader = ({ title }: Props) => {
  const { top } = useSafeAreaInsets();
  return (
    <View className="bg-yellow-400 h-[100px] w-full">
      <View
        style={{
          paddingTop: top,
        }}
        className="w-full flex flex-col"
      >
        <Text className="text-black font-quicksand-bold text-4xl">{title}</Text>
      </View>
    </View>
  );
};

export default TabsHeader;
