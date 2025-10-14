import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useLocales } from "expo-localization";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";
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
  description: z.string().min(1, "Description is required").nullable(),
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

// Props interface for the ExpenseForm component
export interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  initialValues?: Partial<ExpenseFormData>;
  submitButtonText: string;
  isSubmitting?: boolean;
}

const ExpenseForm = ({
  onSubmit,
  initialValues,
  submitButtonText,
  isSubmitting = false,
}: ExpenseFormProps) => {
  // Fetch categories and user data
  const categories = useQuery(api.categories.queries.getAllCategories);
  const user = useQuery(api.users.queries.getAuthenticatedUserProfile);

  const locales = useLocales()[0];

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: initialValues || {
      categoryId: null,
      amount: null,
      description: null,
      paymentMethod: null,
      expenseDate: null,
    },
  });

  // Transform categories into select options
  const categoryOptions =
    categories?.map((category) => ({
      label: category.name,
      value: category._id,
    })) || [];

  // Payment method options
  const paymentMethodOptions = [
    { label: "Cash", value: "cash" },
    {
      label: `${locales.languageRegionCode === "IN" ? "UPI" : "Digital Payment"}`,
      value: `${locales.languageRegionCode === "IN" ? "upi" : "digitalPayment"}`,
    },
    { label: "Debit Card", value: "debitCard" },
    { label: "Credit Card", value: "creditCard" },
  ];

  const handleClearAllPress = () => {
    reset();
  };

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
          type="select"
          labelName="Category"
          selectOptions={categoryOptions}
          inputName="categoryId"
          control={control}
          placeholder="Select a category"
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
          labelName="Description"
          placeholder="What did you spend on?"
          inputName="description"
          icon={
            <DynamicIcon
              family="MaterialCommunityIcons"
              name="text-box-outline"
              size={28}
              color="#FFFFFF"
            />
          }
          keyboardType="default"
          error={errors.description?.message}
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

        <View className="flex-between gap-x-2.5 flex-row mt-8 screen-x-padding">
          <CustomButton
            title="Clear All"
            onPress={handleClearAllPress}
            style="w-1/2 bg-transparent border-border-light border"
            textStyle="text-text-light"
          />
          <CustomButton
            title={submitButtonText}
            onPress={handleSubmit(onSubmit)}
            style="bg-emerald w-1/2"
            textStyle="text-text-light"
            isLoading={isSubmitting}
          />
        </View>
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  );
};

export default ExpenseForm;
