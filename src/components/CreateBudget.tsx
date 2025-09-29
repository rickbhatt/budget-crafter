import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View } from "react-native";
import CustomInputs from "./CustomInputs";
import ScreenHeader from "./ScreenHeader";

const CreateBudget = () => {
  const [formData, setFormData] = useState({
    amount: null,
    type: null,
    periodStartDate: null,
    periodEndDate: null,
  });

  const handleFormDataOnChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const budgetTypeOptions = [
    { label: "Monthly", value: "monthly" },
    { label: "Credit Card", value: "creditCard" },
  ];

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
        />
        {/* <CustomInputs
          type="select"
          labelName="Budget Type"
          value={formData.type}
          selectOptions={budgetTypeOptions}
          onChange={handleFormDataOnChange}
          inputName="type"
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
        /> */}
      </View>
    </>
  );
};

export default CreateBudget;
