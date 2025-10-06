import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

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
    try {
      const user = await getAuthenticatedUser(ctx);

      if (!user) {
        throw new Error("User not authenticated");
      }

      const budget = await ctx.db.insert("budgets", {
        ...args,

        userId: user._id,
      });

      return budget;
    } catch (error) {
      throw error;
    }
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
      const user = await ctx.auth.getUserIdentity();
      if (!user) {
        throw new Error("Must be logged in to delete a budget");
      }
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
      const user = await ctx.auth.getUserIdentity();
      if (!user) {
        throw new Error("Must be logged in to delete a budget");
      }

      await ctx.db.delete(args.budgetId);

      return true;
    } catch (error) {
      console.log("🚀 ~ deleteBudget error:", error);
    }
  },
});

export const getBudgetById = query({
  args: {
    budgetId: v.id("budgets"),
  },
  handler: async (ctx, args) => {
    try {
      const user = await getAuthenticatedUser(ctx);
      if (!user) {
        throw new Error("User not authenticated");
      }

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
      const user = await getAuthenticatedUser(ctx);
      if (!user) {
        throw new Error("User not authenticated");
      }

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

export const getBudgetByDate = query({
  args: {},
  handler: async (ctx, args) => {
    try {
    } catch (error) {
      console.log("🚀 ~ getBudgetByDate error:", error);
    }
  },
});
