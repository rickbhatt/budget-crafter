import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const User = {
  email: v.string(),
  clerkId: v.string(),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  imageUrl: v.optional(v.string()),
  updatedAt: v.optional(v.number()),
  currency: v.optional(
    v.object({
      currencyCode: v.string(),
      currencySymbol: v.string(),
      decimalSeparator: v.string(),
      digitGroupingSeparator: v.string(),
    })
  ),
};

export const Budgets = {
  userId: v.id("users"),
  budgetType: v.union(v.literal("monthly"), v.literal("creditCard")),
  budgetAmount: v.float64(),
  // Credit card specific fields (optional, only for creditCard type)
  cardName: v.optional(v.string()),
  cardLastFourDigits: v.optional(v.string()), // "4532" (4 digits only)
  periodStartDate: v.number(),
  periodEndDate: v.number(),
  updatedAt: v.optional(v.number()),
};

export const Categories = {
  userId: v.id("users"),
  name: v.string(),
  icon: v.string(),
  color: v.string(),
  isDefault: v.boolean(),
  updatedAt: v.number(),
};

export const Expenses = {
  userId: v.id("users"),
  budgetId: v.id("budgets"), // Foreign key to budgets table
  categoryId: v.id("categories"), // Foreign key to budgets table
  amount: v.float64(),
  description: v.string(),
  paymentMethod: v.union(
    v.literal("cash"),
    v.literal("upi"),
    v.literal("digitalPayment"),
    v.literal("debitCard"),
    v.literal("creditCard")
  ),
  expenseDate: v.number(), // timestamp
  updatedAt: v.number(),
};

export default defineSchema({
  users: defineTable(User)
    .index("byEmail", ["email"])
    .index("byClerkId", ["clerkId"]),
  budgets: defineTable(Budgets)
    .index("byUser", ["userId"])
    .index("byUserAndType", ["userId", "budgetType"])
    .index("byUserAndPeriodStart", ["userId", "periodStartDate"])
    .index("byUserTypeStartDate", ["userId", "budgetType", "periodStartDate"])
    .index("byPeriodRange", ["periodStartDate", "periodEndDate"]),
  categories: defineTable(Categories)
    .index("byUser", ["userId"])
    .index("byUserAndDefault", ["userId", "isDefault"]),
  expenses: defineTable(Expenses)
    .index("byUser", ["userId"])
    .index("byUserAndBudget", ["userId", "budgetId"])
    .index("byUserAndDate", ["userId", "expenseDate"])
    .index("byUserAndCategory", ["userId", "categoryId"])
    .index("byUserAndPaymentMethod", ["userId", "paymentMethod"])
    .index("byBudgetAndDate", ["budgetId", "expenseDate"]),
});
