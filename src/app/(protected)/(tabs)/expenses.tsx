import ScreenHeader from "@/components/ScreenHeader";
import { api } from "convex/_generated/api";
import { Doc } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import { SectionList, Text, View } from "react-native";
import DynamicIcon from "src/components/DynamicIcon";
import ExpenseCard from "src/components/ExpenseCard";
import {
  calculateBudgetPercentages,
  totalExpenseCalc,
} from "src/utils/budgetCalculations";
import { getCurrentDateUnix } from "src/utils/date";
import { formatDateTime } from "src/utils/formatDate";
import { formatNumber } from "src/utils/formatNumber";
import { ExpenseSection, ExpenseWithCategory, GroupedExpenses } from "type";

const ListHeader = ({
  expenses,
  budgetAmount,
  currencySymbol,
}: {
  expenses: Doc<"expenses">[] | undefined;
  budgetAmount: number;
  currencySymbol: string;
}) => {
  const totalExpense = totalExpenseCalc(expenses ?? []);

  const { expensePercentage } = calculateBudgetPercentages(
    totalExpense,
    budgetAmount
  );

  return (
    <View
      className="screen-x-padding flex-col w-full gap-y-7 pb-4"
      style={{
        elevation: 20,
        shadowColor: "#878787",
      }}
    >
      {/* expense summary */}
      <View className="flex-row p-3 justify-between w-full bg-blue rounded-lg items-center">
        {/* total expense */}
        <View className="flex-col gap-y-1">
          <Text className="base-semibold text-text-light">Total Expense</Text>
          <Text className="h1-bold text-text-light">
            {currencySymbol}
            {formatNumber(totalExpense)}
          </Text>
        </View>
        {/* percentage */}

        <View className="flex-row items-center gap-x-3 p-3 bg-sky/50 rounded-md">
          <DynamicIcon
            family="Ionicons"
            name="trending-up-sharp"
            size={20}
            color="#FFFFFF"
          />
          <Text className="base-semibold text-text-light">
            {expensePercentage.toFixed(0)}% of budget
          </Text>
        </View>
      </View>
    </View>
  );
};

const SectionHeader = ({
  section,
  currencySymbol,
}: {
  section: ExpenseSection;
  currencySymbol: string;
}) => {
  const today = getCurrentDateUnix();

  const isToday = section.title === getCurrentDateUnix();

  const previousDate = new Date(today);
  previousDate.setDate(previousDate.getDate() - 1);

  const isYesterday = section.title === previousDate.getTime();

  return (
    <View className="screen-x-padding mt-3 flex-row justify-between items-center">
      {/* date */}
      <View className="flex-row gap-x-2 items-center py-3">
        <DynamicIcon
          family="FontAwesome"
          name="calendar-o"
          color="#4B5563"
          size={20}
        />
        <Text className="base-bold text-text-secondary">
          {isToday
            ? "Today"
            : isYesterday
              ? "Yesterday"
              : formatDateTime(section.title).shortDateWithYear}
        </Text>
      </View>

      {/* total */}
      <Text className="h3-bold text-text-secondary">
        {currencySymbol}
        {formatNumber(section.total)}
      </Text>
    </View>
  );
};

const SectionItem = ({
  item,
  currenySymbol,
}: {
  item: ExpenseWithCategory;
  currenySymbol: string;
}) => {
  return (
    <View className="screen-x-padding">
      <ExpenseCard
        expenseId={item._id}
        category={item.category.name}
        descrtipion={item.description}
        notes={item.notes ?? null}
        icon={item.category.icon}
        amount={item.amount}
        currencySymbol={currenySymbol}
        variant="list"
      />
    </View>
  );
};

const Expenses = () => {
  const [budgetType, setBudgetType] = useState<"monthly" | "creditCard">(
    "monthly"
  );
  const [timestamp, setTimestamp] = useState(getCurrentDateUnix());

  const userProfile = useQuery(api.users.queries.getAuthenticatedUserProfile);

  const budget = useQuery(api.budgets.queries.getBudgetByDateAndUser, {
    budgetType,
    timestamp,
  });

  const expenses = useQuery(
    api.expenses.queries.getAllExpenses,
    budget !== undefined && budget?._id != null
      ? { budgetId: budget._id }
      : "skip"
  );

  const expensesGroupedByExpenseDate: GroupedExpenses = useMemo(() => {
    if (!expenses) return [];

    const groupedMap = expenses.reduce((map, expense) => {
      if (!map.has(expense.expenseDate)) {
        map.set(expense.expenseDate, {
          title: expense.expenseDate,
          total: 0,
          data: [],
        });
      }

      const section = map.get(expense.expenseDate)!;
      section.data.push(expense);
      section.total += expense.amount;

      return map;
    }, new Map<number, ExpenseSection>());

    return Array.from(groupedMap.values()).sort((a, b) => b.title - a.title);
  }, [expenses]);

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <ScreenHeader
              title="Expenses"
              iconColor="black"
              showBackBtn={false}
              showSettingBtn={true}
            />
          ),
        }}
      />
      <SectionList
        sections={expensesGroupedByExpenseDate}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={() => (
          <ListHeader
            expenses={expenses}
            budgetAmount={budget?.budgetAmount ?? 0}
            currencySymbol={userProfile?.currency?.currencySymbol ?? ""}
          />
        )}
        className="bg-bg-primary flex-1"
        renderSectionHeader={({ section }) => (
          <SectionHeader
            section={section}
            currencySymbol={userProfile?.currency?.currencySymbol ?? ""}
          />
        )}
        renderItem={({ item }) => (
          <SectionItem
            item={item}
            currenySymbol={userProfile?.currency?.currencySymbol ?? ""}
          />
        )}
      />
    </>
  );
};

export default Expenses;
