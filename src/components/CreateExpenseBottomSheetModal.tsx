import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DynamicIcon from "src/components/DynamicIcon";
import ExpenseCategoryBottomSheetModal from "src/components/ExpenseCategoryBottomSheetModal";

interface CreateExpenseBottomSheetProps {
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

const CreateExpenseBottomSheetModal = ({
  createExpenseRef,
}: CreateExpenseBottomSheetProps) => {
  const { top } = useSafeAreaInsets();

  const snapPoints = useMemo(() => ["85%"], []);

  const expenseCategoryModalRef = useRef<BottomSheetModal | null>(null);

  const [value, setValue] = useState("some value");

  const onChange = (index: any) => {
    if (index !== 0) {
      expenseCategoryModalRef.current?.forceClose();
    }
  };

  const handleCreateExpenseBottomSheetClose = () => {
    createExpenseRef.current?.close();
  };

  return (
    <>
      <BottomSheetModal
        onChange={(index) => onChange(index)}
        ref={createExpenseRef}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        snapPoints={snapPoints}
        topInset={top}
        stackBehavior="push"
        backgroundStyle={{
          borderRadius: 0,
        }}
      >
        <BottomSheetView className="screen-x-padding">
          {/* Header */}
          <View className="flex-row flex-center w-full relative mt-5">
            <Text className="flex-1 text-center h2-bold text-text-primary">
              Add Expense
            </Text>

            <Pressable
              onPress={handleCreateExpenseBottomSheetClose}
              className="p-4 bg-gray-100 rounded-full active:active-press-scale absolute right-0"
            >
              <DynamicIcon family="Ionicons" name="close" color="#000000" />
            </Pressable>
          </View>

          {/* Buttons */}
          <View></View>
        </BottomSheetView>
      </BottomSheetModal>

      {/* category model */}
      <ExpenseCategoryBottomSheetModal
        createExpenseRef={createExpenseRef}
        ref={expenseCategoryModalRef}
      />
    </>
  );
};

export default CreateExpenseBottomSheetModal;
