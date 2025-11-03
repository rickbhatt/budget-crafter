import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
  ref: React.RefObject<BottomSheetModal | null>;
  createExpenseRef: React.RefObject<BottomSheetModal | null>;
}

const renderBackdrop = (props: any) => {
  return (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.7}
    />
  );
};

const ExpenseCategoryBottomSheetModal = ({ ref, createExpenseRef }: Props) => {
  const snapPoints = useMemo(() => ["65%"], []);

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing={false}
      stackBehavior="push"
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      style={{
        // ✅ Apply elevation to the container
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
      }}
      backgroundStyle={{
        // ✅ Just styling, no elevation
        backgroundColor: "#FFFFFF",
      }}
      handleIndicatorStyle={{
        width: 40,
        height: 4,
      }}
    >
      <BottomSheetView>
        {/* Header */}
        <View>
          <Pressable onPress={() => ref.current?.close()}>
            <Text>Close Expense Category</Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default ExpenseCategoryBottomSheetModal;
