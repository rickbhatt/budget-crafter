import { asyncMap } from "convex-helpers";
import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserOrThrow } from "../models/users.helpers";

export const getAllExpenses = query({
  args: {
    budgetId: v.id("budgets"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getAuthUserOrThrow(ctx);

    let query = ctx.db
      .query("expenses")
      .withIndex("byUserBudgetExpenseDate", (q) =>
        q.eq("userId", user._id).eq("budgetId", args.budgetId)
      )
      .order("desc");
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
