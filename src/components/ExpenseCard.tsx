import { formatNumber } from "@/utils/formatNumber";
import cn from "clsx";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { formatDateTime } from "src/utils/formatDate";
import { ExpenseCardProps } from "type";
import DynamicIcon from "./DynamicIcon";

const ExpenseCard = ({
  category,
  amount,
  notes,
  descrtipion,
  icon,
  date,
  isLast,
  expenseId,
  currencySymbol,
}: ExpenseCardProps & { isLast?: boolean }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(protected)/expense/${expenseId}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      className={cn("expense-card", isLast && "border-b-0")}
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
