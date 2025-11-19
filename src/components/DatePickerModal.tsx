import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { formatDateTime } from "src/utils/formatDate";

const DatePickerModal = ({
  isDatePickerOpen = false,
  setIsDatePickerOpen,
  maxDate,
  minDate,
  value,
  onChange,
}: any) => {
  return (
    <>
      {isDatePickerOpen && (
        <DateTimePicker
          value={new Date(value + "T00:00:00")}
          mode="date"
          display="calendar"
          maximumDate={maxDate ? maxDate : undefined}
          minimumDate={minDate ? minDate : undefined}
          onChange={(event, selectedDate) => {
            setIsDatePickerOpen(false);
            if (selectedDate) {
              let timestamp = formatDateTime(selectedDate).dateToISOString;

              onChange(timestamp);
            }
          }}
        />
      )}
    </>
  );
};

export default DatePickerModal;
