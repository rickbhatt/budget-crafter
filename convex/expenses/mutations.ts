import { Doc } from "convex/_generated/dataModel";
import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { findBudgetOrThrow } from "../models/budgets.helpers";
import { getAuthUserOrThrow } from "../models/users.helpers";
import { getCurrentDate } from "../utils/date";

export const createExpense = mutation({
  args: {
    categoryId: v.id("categories"),
    amount: v.float64(),
    notes: v.optional(v.string()),
    description: v.optional(v.string()),
    paymentMethod: v.union(
      v.literal("cash"),
      v.literal("upi"),
      v.literal("digitalPayment"),
      v.literal("debitCard"),
      v.literal("creditCard")
    ),
    expenseDate: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getAuthUserOrThrow(ctx);

    const timestamp = getCurrentDate();

    let budgetType: Doc<"budgets">["budgetType"];

    if (args.paymentMethod === "creditCard") {
      budgetType = "creditCard";
    } else {
      budgetType = "monthly";
    }

    let budgetQuery = await findBudgetOrThrow(
      ctx,
      user._id,
      budgetType,
      timestamp
    );

    if (!budgetQuery) {
      throw new ConvexError({
        code: "Budget not found",
        message: "No active budget found for this expense",
      });
    }

    const expense = await ctx.db.insert("expenses", {
      ...args,
      budgetId: budgetQuery._id,
      userId: user._id,
    });

    return expense;
  },
});
