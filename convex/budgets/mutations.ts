import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { checkOverllapingMonthlyBudgets } from "../models/budgets.helpers";
import { getAuthUserOrThrow } from "../models/users.helpers";

export const createBudget = mutation({
  args: {
    budgetType: v.union(v.literal("monthly"), v.literal("creditCard")),
    budgetAmount: v.float64(),
    periodStartDate: v.number(),
    cardName: v.optional(v.string()),
    cardLastFourDigits: v.optional(v.string()),
    periodEndDate: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getAuthUserOrThrow(ctx);

    const isOverlapping = await checkOverllapingMonthlyBudgets({
      ctx,
      timestamp: args.periodStartDate,
      userId: user._id,
    });

    if (isOverlapping) {
      throw new ConvexError({
        code: "BUDGET_OVERLAP",
        message: "A monthly budget already exists for this period",
      });
    }

    const budget = await ctx.db.insert("budgets", {
      ...args,
      userId: user._id,
    });

    return budget;
  },
});

export const updateBudget = mutation({
  args: {
    budgetId: v.id("budgets"),
    updates: v.object({
      budgetAmount: v.optional(v.number()),
      type: v.optional(v.union(v.literal("monthly"), v.literal("creditCard"))),
      periodStartDate: v.optional(v.number()),
      periodEndDate: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    try {
      const user = await getAuthUserOrThrow(ctx);

      const updates = {
        ...args.updates,
        updatedAt: Date.now(),
      };
      const updatedBudget = await ctx.db.patch(args.budgetId, updates);

      return updatedBudget;
    } catch (error) {
      console.log("🚀 ~ updateBudget error:", error);
    }
  },
});

export const deleteBudget = mutation({
  args: {
    budgetId: v.id("budgets"),
  },
  handler: async (ctx, args) => {
    try {
      const user = await getAuthUserOrThrow(ctx);

      await ctx.db.delete(args.budgetId);

      return true;
    } catch (error) {
      console.log("🚀 ~ deleteBudget error:", error);
    }
  },
});
