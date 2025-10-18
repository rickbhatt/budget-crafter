import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { api } from "convex/_generated/api";

import { useQuery } from "convex/react";
import { memo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PaymentCategoryBottomSheetProps } from "type";
import DynamicIcon from "./DynamicIcon";
import cn from "clsx";

const renderBackdrop = (props: any) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    opacity={0.7}
  />
);

const PaymentCategoryBottomSheet = ({
  bottomSheetRef,
  selectedCategory,
  onSelect,
}: PaymentCategoryBottomSheetProps) => {
  const { bottom } = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"pickOne" | "create">("pickOne");

  const screenHeight = Dimensions.get("screen").height;

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
      enableDynamicSizing={false} //may not work well with snap points
      snapPoints={["65%"]}
      bottomInset={bottom}
      enableOverDrag={false}
      backgroundStyle={{
        backgroundColor: "#FFFFFF",
        borderRadius: 32,
      }}
      index={-1}
    >
      {/* Main Container */}
      <BottomSheetView className="flex-1 flex-col mt-4">
        {/* Tab Header */}
        <View className="flex flex-row border-b border-b-border-standard">
          <Pressable
            className={cn(
              "bottom-sheet-tab-btns",
              activeTab === "pickOne"
                ? "border-active-tint"
                : "border-transparent"
            )}
            onPress={() => setActiveTab("pickOne")}
          >
            <Text
              className={cn(
                "payment-ctg-tab-btn",
                activeTab === "pickOne"
                  ? "text-active-tint"
                  : "text-text-primary"
              )}
            >
              Pick One
            </Text>
          </Pressable>
          <Pressable
            className={cn(
              "bottom-sheet-tab-btns",
              activeTab === "create"
                ? "border-active-tint"
                : "border-transparent"
            )}
            onPress={() => setActiveTab("create")}
          >
            <Text
              className={cn(
                "payment-ctg-tab-btn",
                activeTab === "create"
                  ? "text-active-tint"
                  : "text-text-primary"
              )}
            >
              Create New
            </Text>
          </Pressable>
        </View>

        {/* Tab Content */}
        <BottomSheetScrollView
          overScrollMode={"never"}
          className="screen-x-padding mt-8"
          contentContainerStyle={{
            paddingBottom: 40, // Small buffer for gestures
          }}
        >
          {activeTab === "pickOne" ? (
            // Pick One Tab
            <>
              {categories === undefined ? (
                <View className="flex flex-row justify-center items-center h-[50px]">
                  <ActivityIndicator size="small" color={"#000000"} />
                </View>
              ) : (
                <View className="flex flex-row flex-wrap">
                  <>
                    {categories.map((category) => (
                      <Pressable
                        className={cn(
                          "payment-category-chip",
                          selectedCategory === category._id
                            ? "bg-sky"
                            : "bg-bg-primary"
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
                    ))}
                  </>
                </View>
              )}
            </>
          ) : (
            //! Create Tab
            <></>
          )}
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default memo(PaymentCategoryBottomSheet);
