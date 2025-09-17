import Ionicons from "@expo/vector-icons/Ionicons";
import cn from "clsx";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { ExpenseCardProps } from "type";

const ExpenseCard = ({
  category,
  amount,
  description,
  icon,
  date,
  isLast,
}: ExpenseCardProps & { isLast?: boolean }) => {
  return (
    <Pressable
      onPress={() => {
        console.log("pressed");
      }}
      android_ripple={{ color: "rgba(255, 255, 255, 0.3)" }}
      className={cn(
        "screen-x-padding flex-between flex-row py-5 border-b border-border-light",
        isLast && "border-b-0"
      )}
    >
      {/* Left Side: icon and expense category and desc view */}
      <View className="flex-row flex items-center gap-x-3 flex-1 mr-6">
        {icon}
        <View className="flex-col flex gap-y-1 flex-1">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-text-light paragraph-semibold"
          >
            {description}
          </Text>

          <Text className="text-text-light text-sm font-quicksand">
            {category}
          </Text>
          <Text className="text-text-light text-sm font-quicksand">{date}</Text>
        </View>
      </View>

      {/* Right Side: amount view */}
      <View className="flex flex-row items-center gap-x-4">
        <Text className="text-text-light h2-bold">₹{amount}</Text>
        {/* details button view */}
        <View>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseCard;
