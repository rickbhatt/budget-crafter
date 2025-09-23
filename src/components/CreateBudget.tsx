import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View } from "react-native";
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
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      <View className=" flex-1 bg-bg-dark gap-y-6 screen-x-padding">
        <CustomInputs
          type="amount"
          labelName="Budget Amount"
          value={formData.amount}
          onChange={handleFormDataOnChange}
          autoFocus={true}
          inputName="amount"
        />
        <CustomInputs
          type="date"
          labelName="Period Start Date"
          value={formData.periodStartDate}
          onChange={handleFormDataOnChange}
          applyValidRange={true}
          inputName="periodStartDate"
        />
        <CustomInputs
          type="date"
          labelName="Period End Date"
          value={formData.periodEndDate}
          onChange={handleFormDataOnChange}
          applyValidRange={true}
          inputName="periodEndDate"
        />
      </View>
    </>
  );
};

export default CreateBudget;
