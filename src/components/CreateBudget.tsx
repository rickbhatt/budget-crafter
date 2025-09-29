import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View } from "react-native";
import CustomButton from "./CustomButton";
import CustomInputs from "./CustomInputs";
import ScreenHeader from "./ScreenHeader";

const CreateBudget = () => {
  const IntialState = {
    amount: null,
    budgetType: null,
    periodStartDate: null,
    periodEndDate: null,
  };

  const createBudget = useMutation(api.budget.createBudget);

  const [formData, setFormData] = useState(IntialState);

  const handleFormDataOnChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const budgetTypeOptions = [
    { label: "Monthly", value: "monthly" },
    { label: "Credit Card", value: "creditCard" },
  ];

  const handleClearAllPress = () => {
    setFormData(IntialState);
  };

  const handleCreateBudgetPress = async () => {
    await createBudget({ ...formData, amount: Number(formData.amount) });
    console.log("data submited");
    setFormData(IntialState);
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

      <View className="flex-1 bg-bg-dark">
        <CustomInputs
          type="text"
          labelName="Budget Amount"
          value={formData.amount}
          onChange={handleFormDataOnChange}
          autoFocus={true}
          inputName="amount"
          icon={<Text className="text-3xl text-text-light">₹</Text>}
          keyboardType="numeric"
        />
        <CustomInputs
          type="select"
          labelName="Budget Type"
          value={formData.budgetType}
          selectOptions={budgetTypeOptions}
          onChange={handleFormDataOnChange}
          inputName="budgetType"
          icon={
            <MaterialCommunityIcons
              name="sack-outline"
              size={28}
              color="#FFFFFF"
            />
          }
        />

        <CustomInputs
          type="date"
          labelName="Period Start Date"
          value={formData.periodStartDate}
          onChange={handleFormDataOnChange}
          inputName="periodStartDate"
        />

        <CustomInputs
          type="date"
          labelName="Period End Date"
          value={formData.periodEndDate}
          onChange={handleFormDataOnChange}
          inputName="periodEndDate"
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
            onPress={handleCreateBudgetPress}
            style="bg-emerald w-1/2"
            textStyle="text-text-light"
          />
        </View>
      </View>
    </>
  );
};

export default CreateBudget;
