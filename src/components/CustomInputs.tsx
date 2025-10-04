import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import cn from "clsx";
import { Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/FontAwesome";
import { CustomInputProps } from "type";

const CustomInputs = ({
  type,
  control,
  autoFocus = false,
  labelName,
  icon,
  inputName,
  selectOptions = [{ label: "", value: "" }],
  keyboardType = "default",
  error,
}: CustomInputProps) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const [showDropDown, setShowDropDown] = useState(false);

  // Get today's date to prevent selecting past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day

  switch (type) {
    case "text":
      return (
        <Controller
          control={control}
          name={inputName}
          render={({ field: { onChange, value } }) => (
            <View className="form-wrapper">
              <View className="form-group">
                <Text className="form-label">{labelName}</Text>
                <View className="form-input">
                  <View className="icon-wrapper">{icon}</View>
                  <View className="input-wrapper">
                    <TextInput
                      className="text-text-light w-full pl-0"
                      placeholderTextColor="#9CA3AF"
                      style={{
                        fontSize: 30,
                      }}
                      placeholder="1000"
                      textAlignVertical="center"
                      value={value?.toString()}
                      onChangeText={(text) => {
                        let val: string | number | undefined = text;
                        if (keyboardType === "numeric") {
                          val = text === "" ? undefined : Number(text);
                        }
                        onChange(val);
                      }}
                      autoFocus={autoFocus}
                      keyboardType={keyboardType}
                    />
                  </View>
                </View>
              </View>
              {error && (
                <View className="error-message-container">
                  <Text className="error-text">{error}</Text>
                </View>
              )}
            </View>
          )}
        />
      );
    case "date":
      return (
        <Controller
          control={control}
          name={inputName}
          render={({ field: { onChange, value } }) => (
            <>
              <View className="form-wrapper">
                <View className="form-group">
                  <Text className="form-label">{labelName}</Text>
                  <View className="form-input">
                    <View className="icon-wrapper">
                      <Ionicons
                        name="calendar-outline"
                        size={28}
                        color="#FFFFFF"
                      />
                    </View>
                    <View className="input-wrapper">
                      <Pressable
                        className="py-3 w-full"
                        onPress={() => setDatePickerOpen(true)}
                      >
                        <Text
                          className={cn(
                            "text-3xl",
                            value ? "text-text-light" : "text-text-tertiary"
                          )}
                        >
                          {value
                            ? new Date(value).toLocaleDateString()
                            : "Select Date"}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                {error && (
                  <View className="error-message-container">
                    <Text className="error-text">{error}</Text>
                  </View>
                )}
              </View>

              {datePickerOpen && (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setDatePickerOpen(false);

                    if (selectedDate) {
                      const timestamp = new Date(selectedDate);
                      timestamp.setHours(0, 0, 0, 0);

                      onChange(selectedDate.getTime());
                    }
                  }}
                />
              )}
            </>
          )}
        />
      );

    case "select":
      return (
        <Controller
          name={inputName}
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="form-wrapper">
              <View className="form-group">
                <Text className="form-label">{labelName}</Text>
                <View className="form-input">
                  <View className="icon-wrapper">{icon}</View>
                  <View className="input-wrapper">
                    <DropDownPicker
                      open={showDropDown}
                      value={value ? (value as string) : null}
                      items={selectOptions}
                      setOpen={setShowDropDown}
                      setValue={() => {}} // Not used with controlled value
                      setItems={() => {}} // not used with controlled value
                      onSelectItem={(val) => {
                        onChange(val.value);
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
                        width: "100%",
                        borderRadius: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        borderWidth: 0,
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
              </View>
              {error && (
                <View className="error-message-container">
                  <Text className="error-text">{error}</Text>
                </View>
              )}
            </View>
          )}
        />
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
