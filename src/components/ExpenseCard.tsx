import { cn } from "@/utils/cn";
import { formatNumber } from "@/utils/formatNumber";
import { cva } from "class-variance-authority";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { formatDateTime } from "src/utils/formatDate";
import { ExpenseCardProps } from "type";
import DynamicIcon from "./DynamicIcon";

// Define variants using CVA
const expenseCardVariants = cva(
  // Base styles (always applied)
  "flex-between flex-row active:opacity-60 active:active-press-scale",
  {
    variants: {
      variant: {
        dashboard: "screen-x-padding py-5 border-b border-border-light",
        list: "screen-x-padding py-4 bg-bg-secondary rounded-xl mb-3",
        compact: "px-3 py-3 border-b border-border-light",
      },
      size: {
        default: "",
        sm: "py-3",
        lg: "py-6",
      },
    },
    defaultVariants: {
      variant: "dashboard",
      size: "default",
    },
  }
);

const ExpenseCard = ({
  category,
  amount,
  notes,
  descrtipion,
  icon,
  date,
  isLast = false,
  expenseId,
  currencySymbol,
  variant,
  size,
}: ExpenseCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(protected)/expense/${expenseId}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      className={cn(
        expenseCardVariants({ variant, size }),
        isLast && "border-b-0"
      )}
    >
      {/* Left Side: icon and expense category and desc view */}
      <View className="flex-row flex items-start gap-x-4 flex-1 mr-6">
        <DynamicIcon family={icon.family} name={icon.name} size={28} />
        <View className="flex-col flex gap-y-1 flex-1">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-text-light paragraph-semibold"
          >
            {descrtipion}
          </Text>

          <Text className="text-text-light paragraph-sm">{category}</Text>
          <Text className="text-text-light paragraph-sm">
            {formatDateTime(date).intlDateFormat}
          </Text>
        </View>
      </View>
      {notes && (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-text-light paragraph-sm"
        >
          {notes}
        </Text>
      )}

      {/* Right Side: amount view */}
      <View className="flex flex-row items-center gap-x-4">
        <Text className="text-text-light h2-bold">
          {currencySymbol}
          {formatNumber(amount)}
        </Text>
        {/* details button view */}
        <View>
          <DynamicIcon
            family="Ionicons"
            name="chevron-forward"
            size={24}
            color="white"
          />
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseCard;
