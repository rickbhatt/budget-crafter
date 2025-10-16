import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { RefObject, useCallback, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PaymentCategoryBottomSheetProps {
  bottomSheetRef: RefObject<BottomSheet | null>;
  selectedCategory: Id<"categories"> | null;
  onSelect: (params: any) => void;
}

const PaymentCategoryBottomSheet = ({
  bottomSheetRef,
  selectedCategory,
  onSelect,
}: PaymentCategoryBottomSheetProps) => {
  const { bottom } = useSafeAreaInsets();

  const categories = useQuery(api.categories.queries.getAllCategories);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheet
      onChange={(index) => console.log("sheet changed", index)}
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={true} //may not work well with snap points
      index={-1}
    >
      <BottomSheetView className="flex-1 pb-safe p-4 flex flex-col">
        <Text className="h2-bold">Pick a Category</Text>
        <View className="flex flex-1 flex-row flex-wrap">
          {categories &&
            categories.map((category) => (
              <Pressable key={category._id} onPress={() => onSelect(category)}>
                <Text>{category.name}</Text>
              </Pressable>
            ))}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default PaymentCategoryBottomSheet;
