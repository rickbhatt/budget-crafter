import CustomButton from "@/components/CustomButton";
import EmptyState from "@/components/EmptyState";
import ExpenseCard from "@/components/ExpenseCard";
import ScreenHeader from "@/components/ScreenHeader";
import { images } from "@/constants";
import { calculateBudgetPercentages } from "@/utils/budgetCalculations";
import { formatDateTime } from "@/utils/formatDate";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { Stack, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const Dashboard = () => {
  const [budgetType, setBudgetType] = useState<"monthly" | "creditCard">(
    "monthly"
  );

  const currentDate = useMemo(() => new Date().getTime(), []);

  const userProfile = useQuery(api.users.getAuthenticatedUserProfile);

  const budget = useQuery(
    api.budget.getCurrentActiveBudget,
    userProfile?._id !== null ? { timestamp: currentDate, budgetType } : "skip"
  );

  const expenses = useQuery(
    api.expense.getAllExpenses,
    budget?._id != null ? { budgetId: budget._id, limit: 6 } : "skip"
  );

  const totalExpense = useMemo(() => {
    if (!expenses || expenses.length === 0) return 0;
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  }, [expenses]);

  // Calculate budget percentages - now accessible throughout the component
  const { expensePercentage, remainingPercentage, isOverBudget } =
    useMemo(() => {
      const budgetAmount = budget?.budgetAmount ?? 0;
      return calculateBudgetPercentages(totalExpense, budgetAmount);
    }, [totalExpense, budget?.budgetAmount]);

  const pieData = useMemo(() => {
    const budgetAmount = budget?.budgetAmount ?? 0;

    // If no budget, show empty state
    if (budgetAmount === 0) {
      return [{ value: 100, color: "#151515", text: "0%" }];
    }

    // Handle over-budget case (100% expenses)
    if (isOverBudget) {
      return [{ value: 100, color: "#3B82F6", text: "100%", focused: true }];
    }

    return [
      {
        value: remainingPercentage,
        color: "#151515",
        text: `${remainingPercentage.toFixed(0)}%`,
      },
      {
        value: expensePercentage,
        color: "#3B82F6",
        text: `${expensePercentage.toFixed(0)}%`,
        focused: true,
      },
    ];
  }, [
    expensePercentage,
    remainingPercentage,
    isOverBudget,
    budget?.budgetAmount,
  ]);

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
                ? `${formatDateTime(budget.periodStartDate).dateMonthForRange} - ${formatDateTime(budget.periodEndDate).dateMonthForRange}`
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
                    {userProfile?.currency?.currencySymbol}
                    {totalExpense}
                  </Text>
                  <Text className="h3-bold text-center">
                    of {userProfile?.currency?.currencySymbol}
                    {budget?.budgetAmount}
                  </Text>
                </View>
              )}
            />
          </View>
          <View className="w-full flex-row flex-between">
            {/* expense legend */}
            <View className="flex flex-row items-center gap-x-2">
              <View className="bg-blue w-5 h-5 rounded-full" />
              <Text className="base-bold">Expense</Text>
              {expensePercentage > 0 && (
                <Text className="base-bold">
                  {expensePercentage.toFixed(0)}%
                </Text>
              )}
            </View>
            {/* budget legend */}
            <View className="flex flex-row items-center gap-x-2">
              <View className="bg-bg-dark w-5 h-5 rounded-full" />
              <Text className="base-bold">Budget</Text>
              {expensePercentage > 0 && (
                <Text className="base-bold">
                  {remainingPercentage.toFixed(0)}%
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* expense list fiew */}
        {expenses && expenses.length > 0 ? (
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
            <View className="flex-col flex mt-5">
              {expenses.map((expense, index) => (
                <ExpenseCard
                  key={index}
                  expenseId={expense._id}
                  category={expense.category?.name!}
                  amount={expense.amount}
                  description={expense.description}
                  icon={expense.category?.icon!}
                  date={expense.expenseDate}
                  isLast={index == expenses.length - 1}
                />
              ))}
            </View>
          </View>
        ) : (
          <View className="pt-3">
            <EmptyState
              imageSource={images.wallet}
              title="No Expenses Yet"
              description="Start tracking your spending to see insights and stay within your budget"
              imageStyle="w-44 h-44"
            />
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default Dashboard;
