import DynamicIcon from "@/components/DynamicIcon";
import { paymentMethodOptions } from "@/constants";
import { cn } from "@/utils/cn";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PaymentMethodBottomSheetProps } from "type";

const renderBackdrop = (props: any) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    opacity={0.7}
    style={{
      zIndex: 9999,
    }}
  />
);

const PaymentMethodBottomSheet = ({
  bottomSheetRef,
  selectedMethod,
  onSelect,
}: PaymentMethodBottomSheetProps) => {
  const { bottom, top } = useSafeAreaInsets();

  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = useMemo(() => ["30%"], []);

  return (
    <BottomSheet
      onChange={(index) => {
        setIsOpen(index !== -1);
      }}
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{
        backgroundColor: "#000000",
        width: 40,
        height: 5,
      }}
      enableDynamicSizing={false} //may not work well with snap points
      enableContentPanningGesture={true}
      snapPoints={snapPoints}
      topInset={top}
      bottomInset={bottom}
      android_keyboardInputMode="adjustPan"
      enableOverDrag={false}
      keyboardBehavior="interactive"
      backgroundStyle={{
        backgroundColor: "#FFFFFF",
        borderRadius: 32,
      }}
      containerStyle={{
        zIndex: 9999,
      }}
      index={-1}
    >
      {/* Main container */}
      <BottomSheetView className="flex-1 flex-col mt-4">
        <View className="flex-row border-b border-b-border-standard py-4 screen-x-padding">
          <Text className="h3-bold">Pick a payment method</Text>
        </View>

        <BottomSheetScrollView
          overScrollMode={"never"}
          keyboardShouldPersistTaps="never"
          className="screen-x-padding mt-8"
          contentContainerStyle={{
            paddingBottom: 40, // Small buffer for gestures
          }}
        >
          <View className="flex flex-row flex-wrap">
            {paymentMethodOptions.map((option) => (
              <Pressable
                className={cn(
                  "payment-category-chip",
                  selectedMethod?.value === option.value
                    ? "bg-sky"
                    : "bg-bg-primary"
                )}
                key={option.value}
                onPress={() => {
                  onSelect(option);
                }}
              >
                <DynamicIcon
                  family={option.icon.family}
                  name={option.icon.name}
                  size={24}
                  color="#000000"
                />
                <Text
                  className={cn(
                    "ml-1",

                    "paragraph-semibold"
                  )}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default PaymentMethodBottomSheet;
