import BottomSheet from "@gorhom/bottom-sheet";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import * as Haptics from "expo-haptics";
import { useLocales } from "expo-localization";
import React, { useCallback, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import DynamicIcon from "src/components/DynamicIcon";
import { cn } from "src/utils/cn";
import { Category, ExpenseFormProps } from "type";

const NumKeys = ({
  value,
  onPress,
}: {
  value: string;
  onPress: (value: string) => void;
}) => {
  return (
    <Pressable
      className="crt-numkeys-btn flex-1"
      onPress={() => onPress(value)}
    >
      <Text className={cn("crt-numkeys-text", value === "." && "text-4xl")}>
        {value}
      </Text>
    </Pressable>
  );
};

const ExpenseForm = ({
  onSubmit,
  initialValues,
  submitButtonText,
  isSubmitting = false,
  ref,
}: ExpenseFormProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [amount, setAmount] = useState<string>("0");

  const user = useQuery(api.users.queries.getAuthenticatedUserProfile);

  const locales = useLocales()[0];

  // Payment method options
  const paymentMethodOptions = [
    { label: "Cash", value: "cash" },
    locales.languageRegionCode === "IN"
      ? { label: "UPI", value: "upi" }
      : { label: "Digital Payment", value: "digitalPayment" },
    { label: "Debit Card", value: "debitCard" },
    { label: "Credit Card", value: "creditCard" },
  ];

  const handlePaymentCategoryTrigger = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleOnPaymentCategorySelect = useCallback(
    (params: Category) => {},
    []
  );

  const handleNumpadPress = (num: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setAmount((prev) => {
      if (num === "C") {
        return "0";
      }

      // 1. Only allow digits and decimal point
      if (!/^[0-9.]$/.test(num)) {
        return prev;
      }

      // 2. Handle initial zero state
      if (prev === "0") {
        if (num === ".") return "0.";
        if (num === "0") return "0"; // Don't change if pressing 0 again
        return num; // Replace 0 with the new digit
      }

      // 3. Prevent multiple decimal points
      if (num === "." && prev.includes(".")) {
        return prev;
      }

      // 4. Check if decimal exists and limit decimal places
      if (prev.includes(".")) {
        const parts = prev.split(".");
        const decimalPlaces = parts[1]?.length || 0;

        // Already have 2 decimal places, don't allow more
        if (decimalPlaces >= 2 && num !== ".") {
          return prev;
        }
      }

      // 5. Prevent invalid leading zeros (e.g., "01", "001")
      // Allow "0." but not "00" or "01"
      if (prev === "0" && num === "0") {
        return prev;
      }

      // 6. Set maximum amount limit (optional but recommended)
      const newValue = prev + num;
      const numericValue = parseFloat(newValue);
      const maxAmount = 999999.99;

      if (numericValue > maxAmount) {
        return prev;
      }

      // 7. All validations passed
      return newValue;
    });
  };

  const handleBackspace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setAmount((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));
  };

  const handleSubmit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSubmit({ amount, selectedCategory, paymentMethod: "cash" });
  };

  return (
    <View className="flex-1 screen-x-padding bg-bg-primary pb-safe">
      {/* floating buttons */}
      <View className="flex-col">
        {/* row 1 */}
        <View className="flex-row justify-between items-center gap-x-2">
          <Pressable className="crt-expense-floating-btn flex-1 border-lavender bg-lavender/25">
            <DynamicIcon
              family="Ionicons"
              name="cash"
              color="#000000"
              size={24}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="crt-expense-floating-btn-text"
            >
              Digital Payments
            </Text>
          </Pressable>
          <Pressable className="crt-expense-floating-btn flex-1 border-blue bg-blue/25">
            <DynamicIcon family="Ionicons" name="cart" />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="crt-expense-floating-btn-text"
            >
              Miscellaneous
            </Text>
          </Pressable>
        </View>
        {/* row 2 */}
        <View className="flex-row items-center justify-center">
          <Pressable className="crt-expense-floating-btn border-lime bg-lime/25">
            <DynamicIcon family="Ionicons" name="calendar" />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="crt-expense-floating-btn-text"
            >
              10/11/2025
            </Text>
          </Pressable>
        </View>
      </View>
      {/* Amount Display */}
      <View className="mt-7 gap-x-1.5 flex-row flex-center">
        <Text className="font-quicksand-semibold text-5xl text-text-tertiary">
          {user?.currency?.currencySymbol}
        </Text>
        <Text
          className={cn(
            "font-quicksand-bold text-7xl",
            amount ? "text-text-primary" : "text-text-tertiary"
          )}
        >
          {amount ?? "0.00"}
        </Text>
      </View>
      {/* Description */}
      <View className="mt-4 flex-row">
        <TextInput
          className="border border-standard rounded-lg flex-1 px-2.5 font-quicksand-regular text-text-primary"
          keyboardType="default"
          placeholder="Description (optional)"
          placeholderTextColor={"#4B5563"}
          maxLength={100}
        />
      </View>

      {/* Keypad Container */}
      <View className="mt-3 flex-1 flex-row gap-x-2">
        {/* Num Pad: Left Column */}
        <View className="flex-[2.5] gap-y-1.5 flex-col">
          {/* row 1 */}
          <View className="flex-1 gap-x-2 flex-row">
            {["1", "2", "3"].map((num) => (
              <NumKeys key={num} value={num} onPress={handleNumpadPress} />
            ))}
          </View>
          {/* row 2 */}
          <View className="flex-1 gap-x-2 flex-row">
            {["4", "5", "6"].map((num) => (
              <NumKeys key={num} value={num} onPress={handleNumpadPress} />
            ))}
          </View>
          {/* row 3 */}
          <View className="flex-1 gap-x-2 flex-row">
            {["7", "8", "9"].map((num) => (
              <NumKeys key={num} value={num} onPress={handleNumpadPress} />
            ))}
          </View>
          {/* row 4 */}
          <View className="flex-1 gap-x-2 flex-row">
            {["C", "0", "."].map((num) => (
              <NumKeys key={num} value={num} onPress={handleNumpadPress} />
            ))}
          </View>
        </View>
        {/* Action Btns: Right Column */}
        <View className="flex-col gap-y-2 flex-1">
          <Pressable
            className="flex-1 bg-red-500/30 border border-red-700 crt-action-btn"
            onPress={handleBackspace}
          >
            <DynamicIcon
              family="MaterialCommunityIcons"
              name="backspace-outline"
              size={28}
              color="#EF4444"
            />
          </Pressable>
          <Pressable
            className="flex-[2] bg-bg-dark crt-action-btn"
            onPress={handleSubmit}
          >
            <DynamicIcon
              family="MaterialCommunityIcons"
              name="check"
              size={28}
              color="#FFFFFF"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ExpenseForm;
