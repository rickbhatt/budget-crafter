import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { RefObject } from "react";
import { KeyboardTypeOptions } from "react-native";
import { Doc, Id } from "./_generated/dataModel";

// Icon Family Type
export type IconFamily =
  | "MaterialCommunityIcons"
  | "Ionicons"
  | "FontAwesome"
  | "AntDesign"
  | "Entypo"
  | "MaterialIcons"
  | "Feather";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  style?: string;
  leftIcon?: React.ReactNode;
  textStyle?: string;
  isLoading?: boolean;
  activityIndicatorColor?: string;
  showElevation?: boolean;
  disabled?: boolean;
}

interface ScreenHeaderProps {
  title: string;
  rightIcons?: {
    icon: React.ReactNode;
    onPress: () => void;
    name: string;
  }[];
  showBackBtn?: boolean;
  headerStyles?: string;
  iconBtnStyles?: string;
  iconColor?: string;
  showMenuBtn?: boolean;
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
  description?: string | null;
  notes?: string | null;
  icon: Doc<"categories">["icon"];
  date?: string;
  expenseId: Id<"expenses">;
  currencySymbol: string;
  isLast?: boolean;
  variant?: "dashboard" | "list";
  size?: "default" | "sm" | "lg";
}

// convex/types.ts - Type definitions for the frontend
export type User = Doc<"users">;
export type Budget = Doc<"budgets">;
export type Category = Doc<"categories">;
export type Expense = Doc<"expenses">;

// Expense with enriched category details (from getAllExpenses query)
export type ExpenseWithCategory = Expense & {
  category: {
    name: string;
    icon: {
      family: IconFamily;
      name: string;
    };
  } | null;
};

// Grouped expenses by date
interface ExpenseSection {
  title: string;
  total: number;
  data: ExpenseWithCategory[];
}

export type GroupedExpenses = ExpenseSection[];

export type UserId = Id<"users">;
export type BudgetId = Id<"budgets">;
export type CategoryId = Id<"categories">;
export type ExpenseId = Id<"expenses">;

// Payment method types
export type PaymentMethod = "cash" | "upi" | "debit_card" | "credit_card";
export type BudgetType = "monthly" | "credit";

// Helper types for creating new records
export type NewUser = Omit<User, "_id" | "_creationTime" | "updatedAt"> & {
  updatedAt?: number;
};

export type NewBudget = Omit<Budget, "_id" | "_creationTime" | "updatedAt"> & {
  updatedAt?: number;
};

export type NewCategory = Omit<
  Category,
  "_id" | "_creationTime" | "updatedAt"
> & {
  updatedAt?: number;
};

export type NewExpense = Omit<
  Expense,
  "_id" | "_creationTime" | "updatedAt"
> & {
  updatedAt?: number;
};

type PrimitiveValue = string | number | boolean | Date | null | undefined;

interface CustomInputProps {
  type: "amount" | "text" | "date" | "password" | "select" | "paymentCategory";
  selectOptions?: any[];
  autoFocus?: boolean;
  labelName: string;
  icon?: React.ReactNode;
  inputName: string;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  // React Hook Form props
  control?: any; // Control object from useForm
  placeholder?: string;
  onPressPaymentCategoryTrigger?: () => void;
  maxLength?: number | undefined;
  selectedPaymentCategoryValue?: any;
  maxDate?: Date | undefined;
  minDate?: Date | undefined;
}

type DynamicIconProps =
  | {
      family: Extract<IconFamily, "MaterialCommunityIcons">;
      name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
      size?: number;
      color?: string;
    }
  | {
      family: Extract<IconFamily, "Ionicons">;
      name: React.ComponentProps<typeof Ionicons>["name"];
      size?: number;
      color?: string;
    }
  | {
      family: Extract<IconFamily, "AntDesign">;
      name: React.ComponentProps<typeof AntDesign>["name"];
      size?: number;
      color?: string;
    }
  | {
      family: Extract<IconFamily, "FontAwesome">;
      name: React.ComponentProps<typeof FontAwesome>["name"];
      size?: number;
      color?: string;
    }
  | {
      family: Extract<IconFamily, "Entypo">;
      name: React.ComponentProps<typeof Entypo>["name"];
      size?: number;
      color?: string;
    }
  | {
      family: Extract<IconFamily, "MaterialIcons">;
      name: React.ComponentProps<typeof MaterialIcons>["name"];
      size?: number;
      color?: string;
    }
  | {
      family: Extract<IconFamily, "Feather">;
      name: React.ComponentProps<typeof Feather>["name"];
      size?: number;
      color?: string;
    };

interface NetworkState {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  connectionType: string;
  details: NetInfoState | null;
}

interface EmptyStateProps {
  imageSource: ImageSourcePropType;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  containerStyle?: string;
  imageStyle?: string;
}

interface ExpenseFormHandle {
  reset: () => void;
}

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  initialValues?: Partial<ExpenseFormData>;
  submitButtonText: string;
  isSubmitting?: boolean;
  ref?: React.Ref<ExpenseFormHandle>;
}

interface PaymentCategoryBottomSheetProps {
  bottomSheetRef: RefObject<BottomSheet | null>;
  selectedCategory: Id<"categories"> | null;
  onSelect: (params: Category) => void;
}

interface ExpenseFilterBottomsheetProps {
  ref: RefObject<BottomSheet | null>;
}
