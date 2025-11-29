import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import ExpenseForm from "src/components/ExpenseForm";
import ScreenHeader from "src/components/ScreenHeader";
import { getCurrentDate } from "src/utils/date";
import { Category, PaymentMethodType } from "type";

const CreateExpense = () => {
  const createExpense = useMutation(api.expenses.mutations.createExpense);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state - lifted from ExpenseForm
  const [amount, setAmount] = useState<string>("0");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethodType | null>(null);
  const [expenseDate, setExpenseDate] = useState<string>(getCurrentDate());
  const [description, setDescription] = useState<string>("");

  // Validation
  const validateForm = (): boolean => {
    if (!selectedCategory) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please select a category",
        position: "top",
        visibilityTime: 3000,
        topOffset: 80,
      });
      return false;
    }

    if (!selectedPaymentMethod) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please select a payment method",
        position: "top",
        visibilityTime: 3000,
        topOffset: 80,
      });
      return false;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter a valid amount",
        position: "top",
        visibilityTime: 3000,
        topOffset: 80,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await createExpense({
        categoryId: selectedCategory!._id,
        amount: parseFloat(amount),
        notes: "",
        paymentMethod: selectedPaymentMethod!.value as any,
        expenseDate: expenseDate,
        description: description || "",
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Expense created successfully!",
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 80,
        swipeable: true,
      });

      // Reset form state
      setAmount("0");
      setSelectedCategory(null);
      setSelectedPaymentMethod(null);
      setExpenseDate(getCurrentDate());
      setDescription("");
    } catch (error: any) {
      // Parse ConvexError from the mutation
      const errorData = error?.data;
      let errorMessage = "Something went wrong!";

      if (errorData?.code === "UNAUTHORIZED") {
        errorMessage = "Please log in to create an expense";
      } else if (error?.message) {
        errorMessage = error.message;
      }

      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 80,
        swipeable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          header: () => (
            <ScreenHeader
              title="Add Expense"
              titleStyles="text-text-primary"
              iconColor="#000000"
              showBackBtn={true}
              showMenuBtn={false}
              headerStyles="bg-bg-primary"
            />
          ),
        }}
      />
      <ExpenseForm
        // Controlled state
        amount={amount}
        selectedCategory={selectedCategory}
        selectedPaymentMethod={selectedPaymentMethod}
        expenseDate={expenseDate}
        description={description}
        // Change handlers
        onAmountChange={setAmount}
        onCategoryChange={setSelectedCategory}
        onPaymentMethodChange={setSelectedPaymentMethod}
        onExpenseDateChange={setExpenseDate}
        onDescriptionChange={setDescription}
        // Submission
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default CreateExpense;
