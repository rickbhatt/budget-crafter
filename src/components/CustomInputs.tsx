import { formatDateTime } from "@/utils/formatDate";
import DateTimePicker from "@react-native-community/datetimepicker";
import cn from "clsx";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { convertToDateUnix } from "src/utils/date";
import { Category, CustomInputProps } from "type";
import DynamicIcon from "./DynamicIcon";

const ICON_SIZE = 28;

const ArrowDownIcon = () => (
  <DynamicIcon
    family="FontAwesome"
    name="arrow-down"
    size={18}
    color="#FFFFFF"
  />
);

const ArrowUpIcon = () => (
  <DynamicIcon family="FontAwesome" name="arrow-up" size={18} color="#FFFFFF" />
);

const CustomInputs = ({
  type,
  control,
  autoFocus = false,
  labelName,
  icon,
  inputName,
  selectOptions = [{ label: "", value: "" }],
  keyboardType = "default",
  placeholder = "",
  error,
  onPressPaymentCategoryTrigger,
  selectedPaymentCategoryValue,
  maxLength = undefined,
}: CustomInputProps) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const [showDropDown, setShowDropDown] = useState(false);

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
                      placeholder={placeholder}
                      textAlignVertical="center"
                      value={value?.toString()}
                      onChangeText={(text) => {
                        onChange(text);
                      }}
                      autoFocus={autoFocus}
                      keyboardType={keyboardType}
                      maxLength={maxLength}
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
                      <DynamicIcon
                        family="Ionicons"
                        name="calendar-outline"
                        size={ICON_SIZE}
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
                            ? formatDateTime(value).intlDateFormat
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
                  display="calendar"
                  onChange={(event, selectedDate) => {
                    setDatePickerOpen(false);
                    if (selectedDate) {
                      let timestamp = convertToDateUnix(selectedDate);
                      onChange(timestamp);
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
                      placeholder={placeholder}
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
                      ArrowDownIconComponent={ArrowDownIcon}
                      ArrowUpIconComponent={ArrowUpIcon}
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

    case "paymentCategory":
      return (
        <View className="form-wrapper">
          <View className="form-group">
            <Text className="form-label">{labelName}</Text>
            <View className="form-input">
              <View className="icon-wrapper">
                <DynamicIcon
                  family={
                    selectedPaymentCategoryValue?.icon?.family ?? "Ionicons"
                  }
                  name={
                    selectedPaymentCategoryValue?.icon?.name ??
                    "pricetag-outline"
                  }
                  size={ICON_SIZE}
                  color="#FFFFFF"
                />
              </View>
              <View className="input-wrapper">
                <Pressable
                  className="py-3 w-full"
                  onPress={onPressPaymentCategoryTrigger}
                >
                  <Text
                    className={cn(
                      "text-3xl",
                      selectedPaymentCategoryValue
                        ? "text-text-light"
                        : "text-text-tertiary"
                    )}
                  >
                    {selectedPaymentCategoryValue
                      ? selectedPaymentCategoryValue.name
                      : placeholder}
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
      );

    default:
      return null;
  }
};

export default CustomInputs;
