import Ionicons from "@expo/vector-icons/Ionicons";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { getLocales } from "expo-localization";
import { useState } from "react";
import {
  Pressable,
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  DatePickerModal,
  en,
  registerTranslation,
} from "react-native-paper-dates";

import cn from "clsx";
import Icon from "react-native-vector-icons/FontAwesome";
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
  selectOptions = [{ label: "", value: "" }],
}: CustomInputProps) => {
  const user = useQuery(api.users.getAuthenticatedUserProfile);

  const loales = getLocales();
  const languageTag = loales[0].languageTag;

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || null);

  const [showDropDown, setShowDropDown] = useState(false);

  registerTranslation(languageTag, en);

  // Get today's date to prevent selecting past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day

  const onDismissSingle = () => {
    setDatePickerOpen(false);
  };

  const onConfirmSingle = (name: string, params: any) => {
    setDatePickerOpen(false);
    let timeStamp = params.date.getTime();
    onChange(name, timeStamp);
  };

  const onSelection = (value: string) => {
    onChange(inputName, value);
    setShowDropDown(false);
  };

  switch (type) {
    case "text":
      return (
        <View className="form-group">
          <Text className="form-label">{labelName}</Text>
          <View className="form-input">
            <View className="icon-wrapper">{icon}</View>
            <View className="input-wrapper">
              <RNTextInput
                className="border border-green-600 text-3xl text-text-light w-full"
                placeholder="1000"
                textAlignVertical="center"
                placeholderClassName="base-regular"
                value={value?.toString()}
                onChangeText={(text) => onChange(inputName, text)}
                autoFocus={autoFocus}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      );
    case "date":
      return (
        <View className="form-group">
          <Text className="form-label">{labelName}</Text>
          <Pressable
            onPress={() => setDatePickerOpen(true)}
            className="form-input"
          >
            <View className="icon-wrapper">
              <Ionicons name="calendar-outline" size={28} color="#FFFFFF" />
            </View>
            <Text
              className={cn(
                "text-3xl",
                value ? "text-text-light" : "text-text-tertiary"
              )}
            >
              {value ? new Date(value).toLocaleDateString() : "Select Date"}
            </Text>
          </Pressable>
          <DatePickerModal
            locale={languageTag}
            mode="single"
            visible={datePickerOpen}
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

    case "select":
      return (
        <View className="form-group">
          <Text className="form-label">{labelName}</Text>
          <View className="form-input">
            <View className="icon-wrapper">{icon}</View>
            <DropDownPicker
              open={showDropDown}
              value={value as string}
              items={selectOptions}
              setOpen={setShowDropDown}
              setValue={setSelectedValue}
              setItems={() => {}}
              onSelectItem={(item) => {
                onChange(inputName, item.value as string);
              }}
              listMode="SCROLLVIEW"
              placeholder="Select a type"
              dropDownContainerStyle={{
                backgroundColor: "#151515",
                borderColor: "#FFFFFF",
              }}
              textStyle={{
                color: "#FFFFFF",

                fontSize: 30,
              }}
              style={{
                backgroundColor: "#151515",
                borderColor: "#9CA3AF",
                padding: 0,
                flex: 1,
                // borderWidth: 0,
              }}
              listItemContainerStyle={{
                height: 60,
                paddingVertical: 10,
              }}
              searchable={false}
              placeholderStyle={{
                color: "#9CA3AF",
                fontSize: 30,
              }}
              ArrowDownIconComponent={({ style }) => (
                <Icon name="arrow-down" size={18} color="#FFFFFF" />
              )}
              ArrowUpIconComponent={({ style }) => (
                <Icon name="arrow-up" size={18} color="#FFFFFF" />
              )}
            />
          </View>
        </View>
      );

    default:
      return null;
  }
};

export default CustomInputs;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "#151515",
    color: "#ffffff",
  },
});
