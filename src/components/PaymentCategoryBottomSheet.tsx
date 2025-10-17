import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { memo, RefObject, useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Category } from "type";
import DynamicIcon from "./DynamicIcon";
import cn from "clsx";

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

  const height = Dimensions.get("screen").height;

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
      <BottomSheetView
        style={{
          paddingBottom: height * 0.06 + bottom,
        }}
        className="flex-1 px-4 flex flex-col"
      >
        <Text className="h2-bold">Pick a Category</Text>

        <View className="flex flex-1 flex-row flex-wrap mt-5">
          {categories === undefined ? (
            <ActivityIndicator color="#000000" size={"small"} />
          ) : (
            categories.map((category) => (
              <Pressable
                className={cn(
                  "flex flex-row items-center px-4 py-2 mr-2 mb-3 whitespace-nowrap rounded-full border border-border-dark",
                  selectedCategory === category._id ? "bg-sky" : "bg-bg-primary"
                )}
                key={category._id}
                onPress={() => onSelect(category)}
              >
                <DynamicIcon
                  family={category.icon.family}
                  name={category.icon.name as any}
                  size={24}
                  color="#000000"
                />
                <Text
                  className={cn(
                    "ml-1",
                    selectedCategory === category._id
                      ? "paragraph-bold"
                      : "paragraph-semibold"
                  )}
                >
                  {category.name}
                </Text>
              </Pressable>
            ))
          )}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default memo(PaymentCategoryBottomSheet);
