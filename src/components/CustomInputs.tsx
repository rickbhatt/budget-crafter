import Ionicons from "@expo/vector-icons/Ionicons";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { getLocales } from "expo-localization";
import React, { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import {
  DatePickerModal,
  en,
  registerTranslation,
} from "react-native-paper-dates";
import { CustomInputProps } from "type";

const CustomInputs = ({
  type,
  value,
  onChange,
  autoFocus = false,
  labelName,
  icon,
  applyValidRange = false,
  inputName,
}: CustomInputProps) => {
  const user = useQuery(api.users.getAuthenticatedUserProfile);

  const loales = getLocales();
  const languageTag = loales[0].languageTag;

  const [open, setOpen] = useState(false);

  registerTranslation(languageTag, en);

  // Get today's date to prevent selecting past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = (name: string, params: any) => {
    setOpen(false);

    let timeStamp = params.date.getTime();
    onChange(name, timeStamp);
  };

  switch (type) {
    case "text":
      return (
        <View className="flex flex-col gap-y-2 mt-6">
          <Text className="h3-bold text-text-light">{labelName}</Text>
          <View className="border-border-light border-b items-center flex flex-row py-1">
            {icon && icon}
            <TextInput
              autoFocus={autoFocus}
              style={{
                backgroundColor: "#151515",
                flex: 1,
                marginLeft: 15,
              }}
              mode="outlined"
              outlineStyle={{ borderWidth: 0 }}
              cursorColor="#FFFFFF"
              contentStyle={{
                color: "#FFFFFF",
                paddingLeft: 0,
                fontSize: 16,
              }}
              keyboardType="numeric"
              value={value?.toString()}
              onChangeText={(text) => onChange(inputName, text)}
              theme={{
                colors: {
                  primary: "#6B7280",
                },
                fonts: {
                  regular: {
                    fontFamily: "Quicksand-Regular",
                  },
                },
              }}
            />
          </View>
        </View>
      );

    case "amount":
      return (
        <View className="form-input">
          <Text className="form-label">{labelName}</Text>
          <View className="items-center flex flex-row py-1">
            <Text className="h2-bold text-text-light">
              {user?.primaryCurrency}
            </Text>
            <TextInput
              autoFocus={autoFocus}
              style={{
                backgroundColor: "#151515",
                flex: 1,
                marginLeft: 15,
                borderColor: "red",
              }}
              mode="outlined"
              outlineStyle={{ borderWidth: 0 }}
              cursorColor="#FFFFFF"
              contentStyle={{
                color: "#FFFFFF",
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                paddingTop: 0,
                fontFamily: "Quicksand-Regular",
                fontSize: 32,
                flex: 1,
              }}
              keyboardType="numeric"
              value={value === null ? "" : value.toString()}
              onChangeText={(text) => onChange(inputName, text)}
              theme={{
                colors: {
                  primary: "#6B7280",
                },
              }}
            />
          </View>
        </View>
      );
    case "date":
      return (
        <View className="form-input">
          <Text className="form-label">{labelName}</Text>
          <Pressable
            onPress={() => setOpen(true)}
            className="flex-1 flex flex-row items-center gap-x-4"
          >
            <Ionicons name="calendar-outline" size={28} color="#FFFFFF" />
            <Text className="text-text-light base-regular">
              {value ? new Date(value).toLocaleDateString() : "Select Date"}
            </Text>
          </Pressable>
          <DatePickerModal
            locale={languageTag}
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={value !== null ? new Date(value!) : new Date()}
            onConfirm={(params) => onConfirmSingle(inputName, params)}
            validRange={applyValidRange ? { startDate: today } : undefined}
            startDate={new Date()}
            saveLabel="Select Date"
            startWeekOnMonday
          />
        </View>
      );

    default:
      return null;
  }
};

export default CustomInputs;
