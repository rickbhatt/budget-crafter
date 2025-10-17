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
  categoryId: z
    .custom<Id<"categories">>((val) => {
      return typeof val === "string" && val.length > 0;
    }, "Category is required")
    .nullable(),
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
    )
    .nullable(),
  notes: z.string().optional(),
  paymentMethod: z
    .enum(["cash", "upi", "digitalPayment", "debitCard", "creditCard"], {
      message: "Payment method is required",
    })
    .nullable(),
  expenseDate: z
    .number({
      message: "Expense date is required",
    })
    .nullable(),
});

export type ExpenseFormData = z.infer<typeof expenseFormSchema>;

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
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: initialValues || {
      categoryId: null,
      amount: null,
      notes: null,
      paymentMethod: null,
      expenseDate: null,
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
    bottomSheetRef.current?.expand();
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
            <Text className="text-3xl text-text-light">
              {user?.currency?.currencySymbol || "₹"}
            </Text>
          }
          keyboardType="decimal-pad"
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
          placeholder="What did you spend on?"
          icon={
            <DynamicIcon
              family="MaterialCommunityIcons"
              name="tag-outline"
              size={28}
              color="#FFFFFF"
            />
          }
          error={errors.categoryId?.message}
        />

        <CustomInputs
          type="text"
          labelName="Notes"
          placeholder="Add notes (optional)"
          inputName="notes"
          icon={
            <DynamicIcon
              family="MaterialCommunityIcons"
              name="text-box-outline"
              size={28}
              color="#FFFFFF"
            />
          }
          keyboardType="default"
          error={errors.notes?.message}
          control={control}
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
              size={28}
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
