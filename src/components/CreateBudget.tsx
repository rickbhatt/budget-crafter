import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import ScreenHeader from "./ScreenHeader";

const CreateBudget = () => {
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

      <View className=" flex-1 bg-bg-dark">
        <Text className="bg-gray-9">CreateBudget for me is it</Text>
      </View>
    </>
  );
};

export default CreateBudget;
