import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const User = {
  email: v.string(),
  clerkId: v.string(),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  imageUrl: v.optional(v.string()),
  updatedAt: v.optional(v.number()),
  primaryCurrency: v.optional(v.string()),
};

export const Budgets = {
  userId: v.id("users"),
  type: v.union(v.literal("monthly"), v.literal("creditCard")),
  amount: v.number(),
  currency: v.string(),
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
  amount: v.number(),
  currency: v.string(),
  description: v.string(),
  paymentMethod: v.union(
    v.literal("cash"),
    v.literal("upi"),
    v.literal("debit_card"),
    v.literal("credit_card")
  ),
  expenseDate: v.number(), // timestamp
  updatedAt: v.number(),
};

export default defineSchema({
  users: defineTable(User)
    .index("byEmail", ["email"])
    .index("byClerkId", ["clerkId"]),
  budgets: defineTable(Budgets)
    .index("by_user", ["userId"])
    .index("by_user_and_type", ["userId", "type"])
    .index("by_user_and_period_start", ["userId", "periodStartDate"])
    .index("by_user_type_period", ["userId", "type", "periodStartDate"])
    .index("by_period_range", ["periodStartDate", "periodEndDate"]),
  categories: defineTable(Categories)
    .index("by_user", ["userId"])
    .index("by_user_and_default", ["userId", "isDefault"]),
  expenses: defineTable(Expenses)
    .index("by_user", ["userId"])
    .index("by_user_and_budget", ["userId", "budgetId"])
    .index("by_user_and_date", ["userId", "expenseDate"])
    .index("by_user_and_category", ["userId", "categoryId"])
    .index("by_user_and_payment_method", ["userId", "paymentMethod"])
    .index("by_budget_and_date", ["budgetId", "expenseDate"]),
});
