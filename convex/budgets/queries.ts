import { getCurrentDateUnix } from "@/utils/date";
import { ConvexError, v } from "convex/values";
import { query } from "../_generated/server";
import { findActiveBudgetOrThrow } from "../models/budgets.helpers";
import { getAuthUserOrThrow } from "../models/users.helpers";

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

      const timestamp = getCurrentDateUnix();

      const budget = await findActiveBudgetOrThrow(
        ctx,
        user._id,
        args.budgetType,
        timestamp
      );

      return budget;
    } catch (error) {
      throw new ConvexError({
        code: "BUDGET_NOT_FOUND",
        message: "Budget not found",
      });
    }
  },
});
