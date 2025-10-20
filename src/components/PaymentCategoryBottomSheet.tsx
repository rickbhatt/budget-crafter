import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { api } from "convex/_generated/api";

import cn from "clsx";
import { useMutation, useQuery } from "convex/react";
import { memo, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconFamily, PaymentCategoryBottomSheetProps } from "type";
import CustomButton from "./CustomButton";
import DynamicIcon from "./DynamicIcon";
import IconPicker from "./IconPicker";

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
  const { bottom, top } = useSafeAreaInsets();

  const [isOpen, setIsOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<"pickOne" | "create">("pickOne");

  const [newCategoryName, setNewCategoryName] = useState<string | undefined>(
    undefined
  );

  const [newCategoryIcon, setNewCategoryIcon] = useState<
    | {
        name: string;
        family: IconFamily;
      }
    | undefined
  >(undefined);

  const categories = useQuery(
    api.categories.queries.getAllCategories,
    isOpen ? undefined : "skip"
  );

  const createCategory = useMutation(api.categories.mutations.createCategory);

  const snapPoints = useMemo(() => ["70%", "100%"], []);

  const handleCreateNewCategorySubmit = async () => {
    if (newCategoryName && newCategoryIcon) {
      try {
        let category = await createCategory({
          name: newCategoryName,
          icon: {
            name: newCategoryIcon.name,
            family: newCategoryIcon.family,
          },
        });
        onSelect(category);
        setNewCategoryIcon(undefined);
        setNewCategoryName(undefined);
        setActiveTab("pickOne");
        bottomSheetRef.current?.close();
      } catch (error) {
        console.error("Failed to create category:", error);
      }
    }
  };

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
      enableContentPanningGesture={false}
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
          keyboardShouldPersistTaps="never"
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
                          family={category.icon.family as any}
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
            <View className="flex-col gap-y-4">
              {/* form */}
              <View className="flex-col">
                <Text className="paragraph-bold mb-3">Category Name</Text>
                <BottomSheetTextInput
                  returnKeyType="done"
                  autoCapitalize="words"
                  value={newCategoryName}
                  onChangeText={setNewCategoryName}
                  placeholderTextColor={"#4B5563"}
                  placeholder="WiFi bill, uber..."
                  accessibilityLabel="Enter category name"
                  className="w-full text-text-primary h-14 px-3 py-2 border border-border-dark paragraph-semibold bg-bg-primary rounded-md"
                  onFocus={() => bottomSheetRef.current?.snapToIndex(1)}
                  onBlur={() => {
                    setTimeout(
                      () => bottomSheetRef.current?.snapToIndex(0),
                      150
                    ); // Restore to 65%
                  }}
                />
              </View>
              {/* Icon picker */}

              <IconPicker setIcon={setNewCategoryIcon} />

              <CustomButton
                title="Add Category"
                onPress={handleCreateNewCategorySubmit}
                style="bg-emerald w-full"
                textStyle="text-text-light"
                disabled={!newCategoryName || !newCategoryIcon}
              />
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default memo(PaymentCategoryBottomSheet);
