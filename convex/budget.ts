import { ConvexError, v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getAuthUserOrThrow } from "./users";

const checkOverllapingMonthlyBudgets = async ({
  ctx,
  timestamp,
  userId,
}: {
  ctx: QueryCtx;
  timestamp: number;
  userId: Id<"users">;
}): Promise<boolean> => {
  try {
    const budgets = await ctx.db
      .query("budgets")
      .withIndex("byUserTypeStartDate", (q) =>
        q
          .eq("userId", userId)
          .eq("budgetType", "monthly")
          .lte("periodStartDate", timestamp)
      )
      .filter((q) => q.gte(q.field("periodEndDate"), timestamp))
      .first();

    return budgets !== null;
  } catch (error) {
    console.error("Error checking overlapping budgets:", error);
    throw error;
  }
};

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
    timestamp: v.number(),
    budgetType: v.union(v.literal("monthly"), v.literal("creditCard")),
  },
  handler: async (ctx, args) => {
    try {
      const user = await getAuthUserOrThrow(ctx);

      if (!user) {
        throw new ConvexError({
          code: "UNAUTHORIZED",
          message: "User not authenticated",
        });
      }

      const budget = await ctx.db
        .query("budgets")
        .withIndex("byUserTypeStartDate", (q) =>
          q
            .eq("userId", user._id)
            .eq("budgetType", args.budgetType)
            .lte("periodStartDate", args.timestamp)
        )
        .filter((q) => q.gte(q.field("periodEndDate"), args.timestamp))
        .first();

      return budget;
    } catch (error) {
      throw new ConvexError({
        code: "BUDGET_NOT_FOUND",
        message: "Budget not found",
      });
    }
  },
});
