import CustomButton from "@/components/CustomButton";
import ExpenseCard from "@/components/ExpenseCard";
import ScreenHeader from "@/components/ScreenHeader";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { format } from "date-fns";
import { Stack, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import DynamicIcon from "src/components/DynamicIcon";
import { ExpenseCardProps } from "type";

const Dashboard = () => {
  const [budgetType, setBudgetType] = useState<"monthly" | "creditCard">(
    "monthly"
  );

  const userProfile = useQuery(api.users.getAuthenticatedUserProfile);

  const currentDate = useMemo(() => new Date().getTime(), []);

  const budget = useQuery(api.budget.getCurrentActiveBudget, {
    timestamp: currentDate,
    budgetType: budgetType,
  });

  const pieData = [
    { value: 60, color: "#151515", text: "60%" },
    { value: 40, color: "#3B82F6", text: "40%", focused: true },
  ];

  const expenseData: ExpenseCardProps[] = [
    {
      category: "Groceries",
      amount: 2000,
      description: "Groceries for the week and also for the next three months.",
      icon: (
        <DynamicIcon family="Ionicons" name="cart" size={24} color="white" />
      ),
      date: "16-09-2025",
      expenseId: "1",
    },
    {
      category: "Entertainment",
      amount: 750,
      description: "Entertainment for the week",
      icon: (
        <DynamicIcon family="Ionicons" name="film" size={24} color="white" />
      ),
      date: "16-09-2025",
      expenseId: "1",
    },
    {
      category: "Utilities",
      amount: 900,
      description: "Electricity bill",
      icon: (
        <DynamicIcon family="Ionicons" name="bulb" size={24} color="white" />
      ),
      date: "16-09-2025",
      expenseId: "1",
    },
    {
      category: "Utilities",
      amount: 1006,
      description: "Wifi bill",
      icon: (
        <DynamicIcon family="Ionicons" name="wifi" size={24} color="white" />
      ),
      date: "16-09-2025",
      expenseId: "1",
    },
    {
      category: "Travel",
      amount: 800,
      description: "Travel for the week",
      icon: (
        <DynamicIcon
          family="Ionicons"
          name="airplane"
          size={24}
          color="white"
        />
      ),
      date: "16-09-2025",
      expenseId: "1",
    },
  ];

  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <ScreenHeader
              title="Dashboard"
              iconColor="black"
              showBackBtn={false}
              showSettingBtn={true}
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
            <Text className="base-bold">
              {budget !== undefined &&
              budget?.periodStartDate &&
              budget?.periodEndDate
                ? `${format(budget.periodStartDate, "d MMM")} - ${format(budget.periodEndDate, "d MMM")}`
                : ""}
            </Text>
            <Text>Monthly Budget</Text>
          </View>
          {/* chart */}
          <View className="w-full flex-center">
            <PieChart
              donut
              innerCircleColor="#FFEA00"
              innerRadius={100}
              radius={150}
              sectionAutoFocus
              data={pieData}
              centerLabelComponent={() => (
                <View className="flex-center flex-col gap-y-1 p-2.5">
                  <Text className="text-4xl font-quicksand-bold text-center">
                    {userProfile?.currency?.currencySymbol}{" "}
                    {budget?.budgetAmount}
                  </Text>
                  <Text className="h3-bold text-center">of ₹22000</Text>
                </View>
              )}
            />
          </View>
          <View className="w-full flex-row flex-between">
            <View className="flex flex-row items-center gap-x-2">
              <View className="bg-blue w-5 h-5 rounded-full" />
              <Text className="base-bold">Expense</Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <View className="bg-bg-dark w-5 h-5 rounded-full" />
              <Text className="base-bold">Budget</Text>
            </View>
          </View>
        </View>

        {/* expense list fiew */}
        <View className="flex flex-col bg-bg-dark pt-3">
          {/* section heading and button */}
          <View className="screen-x-padding flex-between flex-row">
            <Text className="h3-bold text-text-light">Expenses</Text>
            <CustomButton
              title="View All"
              style="bg-bg-primary w-32 py-3 rounded-xl"
              textStyle="text-text-primary text-base"
              onPress={() =>
                router.push({
                  pathname: "/expense/[id]",
                  params: { id: "1" },
                })
              }
            />
          </View>

          {/* expense cards */}
          {expenseData && expenseData.length > 0 ? (
            <View className="flex-col flex mt-5">
              {expenseData.map((expense, index) => (
                <ExpenseCard
                  key={index}
                  expenseId={expense.expenseId}
                  category={expense.category}
                  amount={expense.amount}
                  description={expense.description}
                  icon={expense.icon}
                  date={expense.date}
                  isLast={index == expenseData.length - 1}
                />
              ))}
            </View>
          ) : (
            <View className="flex-center flex-row mt-3">
              <Text className="paragraph-semibold text-text-light">
                No Expenses Found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Dashboard;
