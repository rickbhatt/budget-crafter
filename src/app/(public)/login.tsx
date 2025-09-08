import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, Text, View } from "react-native";
const Login = () => {
  return (
    <View className="flex-1 flex-center flex-col  bg-emerald gap-y-8">
      <View className="w-full flex flex-col gap-y-5">
        <View className="flex flex-col">
          <Text className="text-text-light text-center font-quicksand-bold text-8xl leading-tight">
            Budget
          </Text>
          <Text className="text-text-light text-center font-quicksand-bold text-8xl">
            Crafter
          </Text>
        </View>
        <Text className="text-text-light text-center base-semibold">
          Craft Your Financial Future
        </Text>
      </View>
      <Pressable
        onPress={() => console.log("login")}
        style={{
          elevation: 10,
          shadowColor: "#878787",
        }}
        className="flex-center bg-bg-primary px-16 py-5 flex-row gap-x-2 rounded-xl active:bg-gray-100"
      >
        <Ionicons name="logo-google" size={24} color="black" />
        <Text className="base-semibold">Continue with Google</Text>
      </Pressable>
    </View>
  );
};

export default Login;
