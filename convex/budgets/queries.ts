import { v } from "convex/values";
import { query } from "../_generated/server";
import { findBudgetOrThrow } from "../models/budgets.helpers";
import { getAuthUserOrThrow } from "../models/users.helpers";
import { getCurrentDate } from "../utils/date";

export const getBudgetById = query({
  args: {
    budgetId: v.id("budgets"),
  },
  handler: async (ctx, args) => {
    try {
      const user = await getAuthUserOrThrow(ctx);

      const budget = await ctx.db.get(args.budgetId);

      return budget;
    } catch (error) {
      console.log("🚀 ~ getBudgetById error:", error);
    }
  },
});

export const getAllBudgets = query({
  handler: async (ctx) => {
    try {
      const user = await getAuthUserOrThrow(ctx);

      const budgets = ctx.db
        .query("budgets")
        .withIndex("byUser", (q) => q.eq("userId", user._id))
        .collect();

      return budgets;
    } catch (error) {
      console.log("🚀 ~ getAllBudgets error:", error);
    }
  },
});

export const getCurrentActiveBudget = query({
  args: {
    budgetType: v.union(v.literal("monthly"), v.literal("creditCard")),
  },
  handler: async (ctx, args) => {
    try {
      const user = await getAuthUserOrThrow(ctx);

      const timestamp = getCurrentDate();

      const budget = await findBudgetOrThrow(
        ctx,
        user._id,
        args.budgetType,
        timestamp
      );

      return budget;
    } catch (error) {
      // Return null instead of throwing an error so the UI can handle the empty state
      console.log("🚀 ~ getCurrentActiveBudget error:", error);
      return null;
    }
  },
});

export const getBudgetByDateAndUser = query({
  args: {
    budgetType: v.union(v.literal("monthly"), v.literal("creditCard")),
    timestamp: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getAuthUserOrThrow(ctx);

    const budget = await findBudgetOrThrow(
      ctx,
      user._id,
      args.budgetType,
      args.timestamp
    );

    return budget;
  },
});
