import CustomCreateExpenseBtn from "@/components/CustomCreateExpenseBtn";
import DynamicIcon from "@/components/DynamicIcon";
import { cn } from "@/utils/cn";
import * as Haptics from "expo-haptics";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabBarIconProps } from "type";

const IconSize = 24;

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className="tab-icon">
    {icon}
    <Text
      style={{
        includeFontPadding: false,
      }}
      className={cn(
        "text-xs font-quicksand-bold",
        focused ? `text-active-tint` : "text-inactive-tint"
      )}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  const { bottom } = useSafeAreaInsets();

  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 120,
          paddingBottom: bottom,
          backgroundColor: "#FFFFFF",
          elevation: 5,
        },
        tabBarButton: ({ children, onPress }) => (
          <Pressable
            onPress={(event: GestureResponderEvent) => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onPress?.(event);
            }}
            className="flex-1 items-center justify-center"
          >
            {children}
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              title="Dashboard"
              icon={
                <DynamicIcon
                  family="MaterialCommunityIcons"
                  name="view-dashboard"
                  size={IconSize}
                  color={focused ? "#3B82F6" : "#6B7280"}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: "Expenses",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              title="Expenses"
              icon={
                <DynamicIcon
                  family="Ionicons"
                  name="receipt"
                  size={IconSize}
                  color={focused ? "#3B82F6" : "#6B7280"}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dummy-expense"
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push("/expense/create");
          },
        })}
        options={{
          title: "Some Expense",
          tabBarIcon: ({ focused }) => (
            <CustomCreateExpenseBtn focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              title="Analytics"
              icon={
                <DynamicIcon
                  family="Ionicons"
                  name="stats-chart"
                  size={IconSize}
                  color={focused ? "#3B82F6" : "#6B7280"}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: "Budgets",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              title="Budgets"
              icon={
                <DynamicIcon
                  family="MaterialCommunityIcons"
                  name="sack"
                  size={IconSize}
                  color={focused ? "#3B82F6" : "#6B7280"}
                />
              }
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
