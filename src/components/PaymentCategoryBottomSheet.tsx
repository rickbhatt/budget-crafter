import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { RefObject } from "react";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PaymentCategoryBottomSheetProps {
  bottomSheetRef: RefObject<BottomSheet | null>;
}

const PaymentCategoryBottomSheet = ({
  bottomSheetRef,
}: PaymentCategoryBottomSheetProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <BottomSheet
      onChange={(index) => console.log("sheet changed", index)}
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "red" }}
      enableDynamicSizing={true}
      // snapPoints={["50%"]} may not work well with enableDynamicSizing={true}
      index={-1}
    >
      <BottomSheetView className="flex-1 pb-safe">
        <Text>This is payment category</Text>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default PaymentCategoryBottomSheet;
