import ScreenHeader from "@/components/ScreenHeader";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const Dashboard = () => {
  const userProfile = useQuery(api.users.getAuthenticatedUserProfile);

  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const pieData = [
    { value: 60, color: "#151515", text: "60%" },

    { value: 40, color: "#FFFFFF", text: "40%", focused: true },
  ];

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
          <Text className="mt-4 screen-x-padding text-4xl font-quicksand-bold text-text-primary">
            {"\u{1F44B}"} Hi, {userProfile?.firstName}
          </Text>
        )}

        {/* summary view */}
        <View className="flex-center flex-col px-6 mt-10 bg-yellow gap-y-8 pt-10 pb-8 rounded-t-[32px]">
          {/* current month and budget toggle */}
          <View className="w-full flex-between flex-row">
            <Text className="paragraph-semibold">{`${month} ${year}`}</Text>
            <Text>Monthly Budget</Text>
          </View>
          {/* chart */}
          <View className="w-full flex-center">
            <PieChart
              donut
              innerCircleColor="#FFEA00"
              innerRadius={80}
              radius={150}
              sectionAutoFocus
              data={pieData}
              centerLabelComponent={() => (
                <View className="flex-center">
                  <Text className="h2-bold">₹22000</Text>
                </View>
              )}
            />
          </View>
          <View className="w-full flex-row flex-between">
            <View className="flex flex-row items-center gap-x-2">
              <View className="bg-bg-dark w-5 h-5 rounded-full" />
              <Text className="paragraph-semibold">Budget</Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <View className="bg-bg-primary w-5 h-5 rounded-full" />
              <Text className="paragraph-semibold">Expense</Text>
            </View>
          </View>
        </View>

        {/* expense list fiew */}
        <View className="bg-bg-dark"></View>
      </ScrollView>
    </>
  );
};

export default Dashboard;
