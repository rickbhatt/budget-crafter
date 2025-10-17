import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { memo, RefObject, useCallback, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Category } from "type";

interface PaymentCategoryBottomSheetProps {
  bottomSheetRef: RefObject<BottomSheet | null>;
  selectedCategory: Id<"categories"> | null;
  onSelect: (params: Category) => void;
}

const renderBackdrop = (props: any) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
);

const PaymentCategoryBottomSheet = ({
  bottomSheetRef,
  selectedCategory,
  onSelect,
}: PaymentCategoryBottomSheetProps) => {
  const { bottom } = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);

  const categories = useQuery(
    api.categories.queries.getAllCategories,
    isOpen ? undefined : "skip"
  );

  return (
    <BottomSheet
      onChange={(index) => setIsOpen(index !== -1)}
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={true} //may not work well with snap points
      index={-1}
    >
      <BottomSheetView className="flex-1 pb-safe p-4 flex flex-col">
        <Text className="h2-bold">Pick a Category</Text>
        <View className="flex flex-1 flex-row flex-wrap">
          {
            categories?.map((category) => (
              <Pressable key={category._id} onPress={() => onSelect(category)}>
                <Text>{category.name}</Text>
              </Pressable>
            ))}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default memo(PaymentCategoryBottomSheet);
