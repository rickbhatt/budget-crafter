import CustomButton from "@/components/CustomButton";
import ScreenHeader from "@/components/ScreenHeader";
import { Stack, useRouter } from "expo-router";
import React from "react";

const Budgets = () => {
  const router = useRouter();
  const handleCreateBudget = () => {
    router.push("/(protected)/budget/create");
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <ScreenHeader
              title="Budgets"
              iconBtnStyles="bg-gray-100"
              iconColor="black"
              showBackBtn={false}
              showSettingBtn={true}
            />
          ),
        }}
      />
      <CustomButton title="Create a new budget" onPress={handleCreateBudget} />
    </>
  );
};

export default Budgets;
