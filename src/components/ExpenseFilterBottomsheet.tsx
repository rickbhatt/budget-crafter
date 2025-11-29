import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import DynamicIcon from "src/components/DynamicIcon";
import { ExpenseFilterBottomsheetProps } from "type";

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

const ExpenseFilterBottomsheet = ({ ref }: ExpenseFilterBottomsheetProps) => {
  const snapPoints = useMemo(() => ["85%"], []);

  const handleCloseSheet = () => {
    ref.current?.close();
  };

  return (
    <BottomSheet
      onChange={() => console.log("sheet open")}
      index={-1}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{
        backgroundColor: "#000000",
        width: 40,
        height: 5,
      }}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: "#FFFFFF",
        borderRadius: 32,
      }}
      enableDynamicSizing={false}
      ref={ref}
      containerStyle={{
        zIndex: 9999,
      }}
    >
      <BottomSheetView className="screen-x-padding">
        {/* Header */}
        <View className="flex-row flex-center w-full relative mt-5">
          <Text className="flex-1 text-center h2-bold text-text-primary">
            Filters
          </Text>

          <Pressable
            onPress={handleCloseSheet}
            className="p-4 bg-gray-100 rounded-full active:active-press-scale absolute right-0"
          >
            <DynamicIcon family="Ionicons" name="close" color="#000000" />
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ExpenseFilterBottomsheet;
