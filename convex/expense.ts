import { asyncMap } from "convex-helpers";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserOrThrow } from "./users";

export const createExpense = mutation({
  args: {
    budgetId: v.id("budgets"),
    categoryId: v.id("categories"),
    amount: v.float64(),
    description: v.string(),
    paymentMethod: v.union(
      v.literal("cash"),
      v.literal("upi"),
      v.literal("digitalPayment"),
      v.literal("debitCard"),
      v.literal("creditCard")
    ),
    expenseDate: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getAuthUserOrThrow(ctx);

    const expense = await ctx.db.insert("expenses", {
      ...args,
      userId: user._id,
    });

    return expense;
  },
});

export const getAllExpenses = query({
  args: {
    budgetId: v.id("budgets"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getAuthUserOrThrow(ctx);

    let query = ctx.db
      .query("expenses")
      .withIndex("byUserAndBudget", (q) =>
        q.eq("userId", user._id).eq("budgetId", args.budgetId)
      );
    // Apply limit if provided
    const expenses = args.limit
      ? await query.take(args.limit)
      : await query.collect();

    // Fetch category details for each expense
    const expensesWithCategory = await asyncMap(expenses, async (expense) => {
      const category = await ctx.db.get(expense.categoryId);
      return {
        ...expense,
        category: category
          ? { name: category.name, icon: category.icon }
          : null,
      };
    });

    return expensesWithCategory;
  },
});
