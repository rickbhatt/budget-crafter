import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
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
import ScreenHeader from "./ScreenHeader";

// Zod validation schema - input schema for form fields
const budgetFormSchema = z
  .object({
    budgetAmount: z
      .number({ message: "Budget amount must be a valid number" })
      .positive("Budget amount must be greater than 0"),
    budgetType: z.enum(["monthly", "creditCard"], {
      message: "Please select a budget type",
    }),
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
  );

type BudgetFormData = z.infer<typeof budgetFormSchema>;

const CreateBudget = () => {
  const createBudget = useMutation(api.budget.createBudget);
  const user = useQuery(api.users.getAuthenticatedUserProfile);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      budgetAmount: undefined,
      budgetType: undefined,
      periodStartDate: null,
      periodEndDate: null,
    },
  });

  const budgetTypeOptions = [
    { label: "Monthly", value: "monthly" },
    { label: "Credit Card", value: "creditCard" },
  ];

  const handleClearAllPress = () => {
    reset();
  };

  const onSubmit = async (data: BudgetFormData) => {
    try {
      await createBudget({
        budgetAmount: data.budgetAmount,
        budgetType: data.budgetType,
        periodStartDate: data.periodStartDate!,
        periodEndDate: data.periodEndDate!,
      });
      reset();

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Budget created successfully!",
        position: "bottom",
        visibilityTime: 5000,
        autoHide: true,
        bottomOffset: 80,
        swipeable: true,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong!",
        position: "bottom",
        visibilityTime: 5000,
        autoHide: true,
        bottomOffset: 80,
        swipeable: true,
      });
      console.log("🚀 ~ create budget onSubmit ~ error:", error);
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
          autoFocus={true}
          inputName="budgetAmount"
          icon={
            <Text className="text-3xl text-text-light">
              {user?.currency?.currencySymbol || "₹"}
            </Text>
          }
          keyboardType="numeric"
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
            <MaterialCommunityIcons
              name="sack-outline"
              size={28}
              color="#FFFFFF"
            />
          }
          error={errors.budgetType?.message}
        />

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
