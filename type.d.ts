import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Href } from "expo-router";
import { KeyboardTypeOptions } from "react-native";
import { Doc, Id } from "./_generated/dataModel";
interface CustomButtonProps {
  onPress: () => void;
  title: string;
  style?: string;
  leftIcon?: React.ReactNode;
  textStyle?: string;
  isLoading?: boolean;
  activityIndicatorColor?: string;
  showElevation?: boolean;
}

interface ScreenHeaderProps {
  title: string;
  rightIcons?: {
    icon: React.ReactNode;
    path: Href;
    name: string;
  }[];
  showBackBtn?: boolean;
  headerStyles?: string;
  iconBtnStyles?: string;
  iconColor?: string;
  showSettingBtn?: boolean;
  titleStyles?: string;
}

interface HeaderBtnProps {
  onPress: () => void;
  icon: React.ReactNode;
  iconBtnStyles?: string;
}

interface TabBarIconProps {
  focused: boolean;
  icon: React.ReactNode;
  title: string;
}

interface ExpenseCardProps {
  category: string;
  amount: number;
  description: string;
  icon: React.ReactNode;
  date: string;
  expenseId: string;
}

// convex/types.ts - Type definitions for the frontend
export type User = Doc<"users">;
export type Budget = Doc<"budgets">;
export type Category = Doc<"categories">;
export type Expense = Doc<"expenses">;

export type UserId = Id<"users">;
export type BudgetId = Id<"budgets">;
export type CategoryId = Id<"categories">;
export type ExpenseId = Id<"expenses">;

// Payment method types
export type PaymentMethod = "cash" | "upi" | "debit_card" | "credit_card";
export type BudgetType = "monthly" | "credit";

// Helper types for creating new records
export type NewUser = Omit<User, "_id" | "_creationTime" | "updatedAt"> & {
  createdAt?: number;
  updatedAt?: number;
};

export type NewBudget = Omit<Budget, "_id" | "_creationTime" | "updatedAt"> & {
  createdAt?: number;
  updatedAt?: number;
};

export type NewCategory = Omit<
  Category,
  "_id" | "_creationTime" | "updatedAt"
> & {
  createdAt?: number;
  updatedAt?: number;
};

export type NewExpense = Omit<
  Expense,
  "_id" | "_creationTime" | "updatedAt"
> & {
  createdAt?: number;
  updatedAt?: number;
};

type PrimitiveValue = string | number | boolean | Date | null | undefined;

interface CustomInputProps {
  type: "amount" | "text" | "date" | "password" | "select";
  selectOptions?: any[];
  autoFocus?: boolean;
  labelName: string;
  icon?: React.ReactNode;
  inputName: string;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  // React Hook Form props
  control: any; // Control object from useForm
  placeholder?: string;
  maxLength?: number | undefined;
}

type DynamicIconProps =
  | {
      family: "MaterialCommunityIcons";
      name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
      size?: number;
      color?: string;
    }
  | {
      family: "Ionicons";
      name: React.ComponentProps<typeof Ionicons>["name"];
      size?: number;
      color?: string;
    }
  | {
      family: "AntDesign";
      name: React.ComponentProps<typeof AntDesign>["name"];
      size?: number;
      color?: string;
    }
  | {
      family: "FontAwesome";
      name: React.ComponentProps<typeof FontAwesome>["name"];
      size?: number;
      color?: string;
    };
