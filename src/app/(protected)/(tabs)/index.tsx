import ScreenHeader from "@/components/ScreenHeader";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const Dashboard = () => {
  const userProfile = useQuery(api.users.getAuthenticatedUserProfile);

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <ScreenHeader
              title="Dashboard"
              iconBtnStyles="bg-gray-100"
              iconColor="black"
              showBackBtn={false}
              showSettingBtn={true}
              headerStyles="bg-bg-primary"
            />
          ),
        }}
      />

      {/* main content view */}
      <ScrollView className="container bg-bg-primary flex flex-col">
        {/* intro view */}

        {userProfile && (
          <Text className="mt-4 screen-hr-padding text-5xl font-quicksand-bold text-text-primary leading-tight">
            {"\u{1F44B}"} Hi, {userProfile?.firstName}
          </Text>
        )}

        {/* chart view */}
        <View className="screen-hr-padding mt-10 bg-yellow">
          <Text>Something</Text>
        </View>

        {/* expense list fiew */}
        <View className="bg-bg-dark">
          <Text className="text-text-light">Expenses</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default Dashboard;
