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
        list: "p-4 bg-orange/25 border border-orange rounded-xl mb-3",
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

// Text variants for title
const titleTextVariants = cva("base-bold", {
  variants: {
    variant: {
      dashboard: "text-text-light",
      list: "text-text-primary",
    },
  },
  defaultVariants: {
    variant: "dashboard",
  },
});

// Text variants for category/subtitle
const categoryTextVariants = cva("paragraph-sm", {
  variants: {
    variant: {
      dashboard: "text-text-light/75",
      list: "text-text-primary",
    },
  },
  defaultVariants: {
    variant: "dashboard",
  },
});

// Text variants for amount
const amountTextVariants = cva("", {
  variants: {
    variant: {
      dashboard: "text-text-light h2-bold",
      list: "text-text-primary h2-bold",
    },
  },
  defaultVariants: {
    variant: "dashboard",
  },
});

const leftSectionVariant = cva("flex-row flex gap-x-6 flex-1 mr-6", {
  variants: {
    variant: {
      dashboard: "items-start",
      list: "items-center",
      compact: "",
    },
  },
});

const iconViewVariant = cva("flex-row items-center justify-center", {
  variants: {
    variant: {
      dashboard: "",
      list: "p-4 rounded-2xl bg-orange/80",
    },
  },
});

// Icon size variants
const iconSizeVariants = {
  dashboard: 28,
  list: 32,
  compact: 20,
} as const;

const ExpenseCard = ({
  category,
  amount,
  notes,
  description,
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
    router.push({
      pathname: "/(protected)/expense/[id]",
      params: {
        id: expenseId,
      },
    });
  };

  const handleLongPress = () => {
    router.push({
      pathname: "/(protected)/expense/edit/[id]",
      params: {
        id: expenseId,
      },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      className={cn(
        expenseCardVariants({ variant, size }),
        isLast && "border-b-0"
      )}
    >
      {/* Left Side: icon and expense category and desc view */}
      <View className={cn(leftSectionVariant({ variant }))}>
        <View className={cn(iconViewVariant({ variant }))}>
          <DynamicIcon
            family={icon.family}
            name={icon.name}
            size={iconSizeVariants[variant || "dashboard"]}
            color={"#FFFFFF"}
          />
        </View>
        {/* description view */}
        <View className="flex-col flex gap-y-0.5 flex-1">
          {/* <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className={cn(titleTextVariants({ variant }))}
          >
            {descrtipion}
          </Text> */}

          <Text className={cn(titleTextVariants({ variant }))}>{category}</Text>
          {date && (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className={cn(categoryTextVariants({ variant }))}
            >
              {formatDateTime(date).intlDateFormat}
            </Text>
          )}
        </View>
      </View>
      {notes && (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className={cn(categoryTextVariants({ variant }))}
        >
          {notes}
        </Text>
      )}

      {/* Right Side: amount view */}
      <View className="flex flex-row items-center gap-x-4">
        <Text className={cn(amountTextVariants({ variant }))}>
          {currencySymbol}
          {formatNumber(amount)}
        </Text>
        {/* details button view */}
        <View>
          <DynamicIcon
            family="Ionicons"
            name="chevron-forward"
            size={24}
            color={variant === "dashboard" ? "#FFFFFF" : "#000000"}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseCard;
