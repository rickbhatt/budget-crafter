import { useLocales } from "expo-localization";
import React from "react";
import { Text, View } from "react-native";

const PaymentMethodSheet = () => {
  const locales = useLocales()[0];

  // Payment method options
  const paymentMethodOptions = [
    { label: "Cash", value: "cash" },
    locales.languageRegionCode === "IN"
      ? { label: "UPI", value: "upi" }
      : { label: "Digital Payment", value: "digitalPayment" },
    { label: "Debit Card", value: "debitCard" },
    { label: "Credit Card", value: "creditCard" },
  ];
  return (
    <View>
      <Text>PaymentMethodSheet</Text>
    </View>
  );
};

export default PaymentMethodSheet;
