import ScreenHeader from "@/components/ScreenHeader";
import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Stack.Screen
        options={{
          header: () => (
            <ScreenHeader
              title="Dashboard"
              iconBtnStyles="bg-gray-200"
              iconColor="black"
              showBackBtn={true}
              showSettingBtn={true}
            />
          ),
        }}
      />
      <View className="flex-1 flex items-center justify-center">
        <Text className="text-amber-900 font-quicksand-bold text-3xl">
          Dashboard
        </Text>
        <Text className="font-quicksand">Ritankar Bhattacharjee</Text>
        <Text className="font-quicksand">Ritankar Bhattacharjee</Text>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
