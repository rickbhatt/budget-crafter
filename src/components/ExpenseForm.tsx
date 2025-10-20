import BottomSheet from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useLocales } from "expo-localization";
import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";
import PaymentCategoryBottomSheet from "src/components/PaymentCategoryBottomSheet";
import { Category, ExpenseFormProps } from "type";
import { z } from "zod";
import CustomButton from "./CustomButton";
import CustomInputs from "./CustomInputs";
import DynamicIcon from "./DynamicIcon";

const expenseFormSchema = z.object({
  categoryId: z.custom<Id<"categories">>((val) => {
    return typeof val === "string" && val.length > 0;
  }, "Category is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: "Amount must be greater than 0",
      }
    ),
  description: z.string().min(1, "Description is required"),
  notes: z.string().optional(),
  paymentMethod: z.enum(
    ["cash", "upi", "digitalPayment", "debitCard", "creditCard"],
    {
      message: "Payment method is required",
    }
  ),
  expenseDate: z.number({
    message: "Expense date is required",
  }),
});

export type ExpenseFormData = z.infer<typeof expenseFormSchema>;

const ICON_SIZE = 28;

const ExpenseForm = ({
  onSubmit,
  initialValues,
  submitButtonText,
  isSubmitting = false,
}: ExpenseFormProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const user = useQuery(api.users.queries.getAuthenticatedUserProfile);

  const locales = useLocales()[0];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: initialValues || {
      categoryId: undefined,
      amount: undefined,
      description: undefined,
      notes: "",
      paymentMethod: undefined,
      expenseDate: undefined,
    },
  });

  // Payment method options
  const paymentMethodOptions = [
    { label: "Cash", value: "cash" },
    locales.languageRegionCode === "IN"
      ? { label: "UPI", value: "upi" }
      : { label: "Digital Payment", value: "digitalPayment" },
    { label: "Debit Card", value: "debitCard" },
    { label: "Credit Card", value: "creditCard" },
  ];

  const handlePaymentCategoryTrigger = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleOnPaymentCategorySelect = useCallback(
    (params: Category) => {
      setValue("categoryId", params._id);
      setSelectedCategory(params);
      bottomSheetRef.current?.close();
    },
    [setValue]
  );

  return (
    <>
      <KeyboardAwareScrollView
        className="flex-1 bg-bg-dark"
        bottomOffset={62}
        overScrollMode="never"
        contentContainerClassName="pb-safe"
      >
        <CustomInputs
          type="text"
          labelName="Amount"
          placeholder="100"
          inputName="amount"
          icon={
            <Text
              style={{
                fontSize: ICON_SIZE,
              }}
              className=" text-text-light"
            >
              {user?.currency?.currencySymbol || "₹"}
            </Text>
          }
          keyboardType="decimal-pad"
          error={errors.amount?.message}
          control={control}
        />
        <CustomInputs
          type="text"
          labelName="Descrtiption"
          placeholder="What was it for?"
          inputName="description"
          icon={
            <DynamicIcon
              family="MaterialIcons"
              name="notes"
              size={ICON_SIZE}
              color="#FFFFFF"
            />
          }
          error={errors.amount?.message}
          control={control}
        />
        <CustomInputs
          type="paymentCategory"
          labelName="Category"
          inputName="categoryId"
          control={control}
          selectedPaymentCategoryValue={selectedCategory}
          onPressPaymentCategoryTrigger={handlePaymentCategoryTrigger}
          placeholder="Pick a category"
          icon={
            <DynamicIcon
              family="MaterialCommunityIcons"
              name="tag-outline"
              size={ICON_SIZE}
              color="#FFFFFF"
            />
          }
          error={errors.categoryId?.message}
        />

        <CustomInputs
          type="select"
          labelName="Payment Method"
          selectOptions={paymentMethodOptions}
          inputName="paymentMethod"
          placeholder="Select a method"
          control={control}
          icon={
            <DynamicIcon
              family="MaterialCommunityIcons"
              name="wallet-outline"
              size={ICON_SIZE}
              color="#FFFFFF"
            />
          }
          error={errors.paymentMethod?.message}
        />

        <CustomInputs
          type="date"
          control={control}
          labelName="Expense Date"
          inputName="expenseDate"
          error={errors.expenseDate?.message}
        />
        <CustomInputs
          type="text"
          labelName="Notes (optional)"
          placeholder="Anything else?"
          inputName="notes"
          icon={
            <DynamicIcon
              family="MaterialIcons"
              name="description"
              size={ICON_SIZE}
              color="#FFFFFF"
            />
          }
          keyboardType="default"
          error={errors.notes?.message}
          control={control}
        />
        <View className="flex items-center gap-x-2.5 flex-row mt-8 w-full screen-x-padding">
          <CustomButton
            title={submitButtonText}
            onPress={handleSubmit(onSubmit)}
            style="bg-emerald w-full"
            textStyle="text-text-light"
            isLoading={isSubmitting}
            leftIcon={<DynamicIcon name="save" family="FontAwesome" />}
          />
        </View>
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
      <PaymentCategoryBottomSheet
        selectedCategory={selectedCategory?._id ?? null}
        bottomSheetRef={bottomSheetRef}
        onSelect={handleOnPaymentCategorySelect}
      />
    </>
  );
};

export default ExpenseForm;
