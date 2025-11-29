import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const ExpenseDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default ExpenseDetail;
