import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import ExpenseForm, { ExpenseFormData } from "src/components/ExpenseForm";
import ScreenHeader from "src/components/ScreenHeader";

const CreateExpense = () => {
  const createExpense = useMutation(api.expenses.mutations.createExpense);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ExpenseFormData) => {
    setIsSubmitting(true);
    try {
      await createExpense({
        categoryId: data.categoryId!,
        amount: parseFloat(data.amount!),
        notes: data.notes!,
        paymentMethod: data.paymentMethod!,
        expenseDate: data.expenseDate!,
        description: data.description!,
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
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          header: () => (
            <ScreenHeader
              title="Add Expense"
              titleStyles="text-text-light"
              iconBtnStyles="bg-[#1f1f1f]"
              iconColor="#FFFFFF"
              showBackBtn={true}
              showSettingBtn={false}
              headerStyles="bg-bg-dark"
            />
          ),
        }}
      />
      <ExpenseForm
        onSubmit={handleSubmit}
        submitButtonText="Add Expense"
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default CreateExpense;
