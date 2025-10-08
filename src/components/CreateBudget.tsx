import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";
import { z } from "zod";
import CustomButton from "./CustomButton";
import CustomInputs from "./CustomInputs";
import DynamicIcon from "./DynamicIcon";
import ScreenHeader from "./ScreenHeader";

// Zod validation schema - input schema for form fields
const budgetFormSchema = z
  .object({
    budgetAmount: z
      .string()
      .min(1, "Budget amount is required")
      .refine(
        (val) => {
          const num = parseFloat(val);
          return !isNaN(num) && num > 0;
        },
        {
          message: "Budget amount must be greater than 0",
        }
      ),
    budgetType: z.enum(["monthly", "creditCard"], {
      message: "Please select a budget type",
    }),
    cardName: z.string().optional().nullable(),
    cardLastFourDigits: z
      .string()
      .length(4, "Must be exactly 4 digits")
      .optional()
      .nullable(),
    periodStartDate: z
      .number({ message: "Period start date is required" })
      .nullable()
      .refine((val) => val !== null, {
        message: "Period start date is required",
      }),
    periodEndDate: z
      .number({ message: "Period end date is required" })
      .nullable()
      .refine((val) => val !== null, {
        message: "Period end date is required",
      }),
  })
  .refine(
    (data) => {
      // Only validate if both dates are present
      if (data.periodStartDate !== null && data.periodEndDate !== null) {
        return data.periodEndDate > data.periodStartDate;
      }
      // Skip validation if either date is missing (handled by individual field validation)
      return true;
    },
    {
      message: "End date must be after start date",
      path: ["periodEndDate"],
    }
  )
  .superRefine((data, ctx) => {
    if (data.budgetType === "creditCard") {
      if (!data.cardName) {
        ctx.addIssue({
          code: "custom",
          message: "Card name is required for credit card budgets",
          path: ["cardName"],
        });
      }
      if (!data.cardLastFourDigits) {
        ctx.addIssue({
          code: "custom",
          message: "Last four digits are required for credit card budgets",
          path: ["cardLastFourDigits"],
        });
      }
    }
  });

type BudgetFormData = z.infer<typeof budgetFormSchema>;

const CreateBudget = () => {
  const createBudget = useMutation(api.budget.createBudget);
  const user = useQuery(api.users.getAuthenticatedUserProfile);

  const budgetTypeOptions = [
    { label: "Monthly", value: "monthly" },
    { label: "Credit Card", value: "creditCard" },
  ];

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      budgetAmount: "",
      budgetType: undefined,
      periodStartDate: null,
      periodEndDate: null,
      cardName: null,
      cardLastFourDigits: null,
    },
  });

  const budgetType = watch("budgetType");

  useEffect(() => {
    if (budgetType === "monthly") {
      setValue("cardName", null, { shouldValidate: false });
      setValue("cardLastFourDigits", null, { shouldValidate: false });
    }
  }, [budgetType, setValue]);

  const handleClearAllPress = () => {
    reset();
  };

  const onSubmit = async (data: BudgetFormData) => {
    try {
      await createBudget({
        budgetAmount: parseFloat(data.budgetAmount),
        budgetType: data.budgetType,
        periodStartDate: data.periodStartDate!,
        periodEndDate: data.periodEndDate!,
        ...(data.budgetType === "creditCard" && {
          cardName: data.cardName!,
          cardLastFourDigits: data.cardLastFourDigits!,
        }),
      });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Budget created successfully!",
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 80,
        swipeable: true,
      });
      reset();
    } catch (error: any) {
      // Parse ConvexError from the mutation
      const errorData = error?.data;
      let errorMessage = "Something went wrong!";

      if (errorData?.code === "BUDGET_OVERLAP") {
        errorMessage = errorData.message;
      } else if (errorData?.code === "UNAUTHORIZED") {
        errorMessage = "Please log in to create a budget";
      } else if (error?.message) {
        errorMessage = error.message;
      }

      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 80,
        swipeable: true,
      });
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          header: () => (
            <ScreenHeader
              title="Create Budget"
              titleStyles="text-text-light"
              iconBtnStyles="bg-[#1f1f1f]"
              iconColor="#FFFFFF"
              showBackBtn={true}
              showSettingBtn={false}
              headerStyles="bg-bg-dark"
            />
          ),
        }}
      />
      <KeyboardAwareScrollView
        className="flex-1 bg-bg-dark"
        bottomOffset={62}
        overScrollMode="never"
        contentContainerClassName="pb-safe"
      >
        <CustomInputs
          type="text"
          labelName="Budget Amount"
          placeholder="1000"
          autoFocus={true}
          inputName="budgetAmount"
          icon={
            <Text className="text-3xl text-text-light">
              {user?.currency?.currencySymbol || "₹"}
            </Text>
          }
          keyboardType="decimal-pad"
          error={errors.budgetAmount?.message}
          control={control}
        />

        <CustomInputs
          type="select"
          labelName="Budget Type"
          selectOptions={budgetTypeOptions}
          inputName="budgetType"
          control={control}
          icon={
            <DynamicIcon
              family="MaterialCommunityIcons"
              name="sack-outline"
              size={28}
              color="#FFFFFF"
            />
          }
          error={errors.budgetType?.message}
        />
        {budgetType === "creditCard" && (
          <>
            <CustomInputs
              type="text"
              labelName="Card Name"
              placeholder="HDFC card, SBI card"
              inputName="cardName"
              icon={
                <DynamicIcon
                  family="AntDesign"
                  name="credit-card"
                  size={28}
                  color="#FFFFFF"
                />
              }
              keyboardType="default"
              error={errors.cardName?.message}
              control={control}
            />
            <CustomInputs
              type="text"
              labelName="Card's Last 4 Digits"
              placeholder="8112"
              inputName="cardLastFourDigits"
              maxLength={4}
              icon={
                <DynamicIcon
                  family="MaterialCommunityIcons"
                  name="numeric"
                  size={28}
                  color="#FFFFFF"
                />
              }
              keyboardType="number-pad"
              error={errors.cardLastFourDigits?.message}
              control={control}
            />
          </>
        )}

        <CustomInputs
          type="date"
          control={control}
          labelName="Period Start Date"
          inputName="periodStartDate"
          error={errors.periodStartDate?.message}
        />

        <CustomInputs
          type="date"
          control={control}
          labelName="Period End Date"
          inputName="periodEndDate"
          error={errors.periodEndDate?.message}
        />

        <View className="flex-between gap-x-2.5 flex-row mt-8 screen-x-padding">
          <CustomButton
            title="Clear All"
            onPress={handleClearAllPress}
            style="w-1/2 bg-transparent border-border-light border"
            textStyle="text-text-light"
          />
          <CustomButton
            title="Create Budget"
            onPress={handleSubmit(onSubmit)}
            style="bg-emerald w-1/2"
            textStyle="text-text-light"
          />
        </View>
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  );
};

export default CreateBudget;
