import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

const expenseFormSchema = z.object({
  categoryId: z
    .custom<Id<"categories">>((val) => {
      return typeof val === "string" && val.length > 0;
    }, "Category is required")
    .nullable(),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: "Amount must be greater than 0",
      }
    )
    .nullable(),
  description: z.string().min(1, "Description is required").nullable(),
  paymentMethod: z
    .enum(["cash", "upi", "digitalPayment", "debitCard", "creditCard"], {
      message: "Payment method is required",
    })
    .nullable(),
  expenseDate: z
    .number({
      message: "Expense date is required",
    })
    .nullable(),
});

export type ExpenseFormData = z.infer<typeof expenseFormSchema>;

const CreateExpense = () => {
  const createExpense = useMutation(api.expenses.mutations.createExpense);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      categoryId: null,
      amount: null,
      description: null,
      paymentMethod: null,
      expenseDate: null,
    },
  });

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await createExpense({
        categoryId: data.categoryId!,
        amount: parseFloat(data.amount!),
        description: data.description!,
        paymentMethod: data.paymentMethod!,
        expenseDate: data.expenseDate!,
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
      reset();
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
    }
  };

  return (
    <View>
      <Text>This is a different route with custom action</Text>
    </View>
  );
};

export default CreateExpense;
