import { ConvexError } from "convex/values";
import { Doc, Id } from "../_generated/dataModel";
import { QueryCtx } from "../_generated/server";

export const checkOverllapingMonthlyBudgets = async ({
  ctx,
  timestamp,
  userId,
}: {
  ctx: QueryCtx;
  timestamp: string;
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

export async function findBudgetOrThrow(
  ctx: QueryCtx,
  userId: Doc<"users">["_id"],
  budgetType: Doc<"budgets">["budgetType"],
  timestamp: string
): Promise<Doc<"budgets">> {
  const budget = await ctx.db
    .query("budgets")
    .withIndex("byUserTypeStartDate", (q) =>
      q
        .eq("userId", userId)
        .eq("budgetType", budgetType)
        .lte("periodStartDate", timestamp)
    )
    .filter((q) => q.gte(q.field("periodEndDate"), timestamp))
    .first();
  console.log("🚀 ~ findBudgetOrThrow ~ budget:", budget);

  if (!budget) {
    throw new ConvexError({
      code: "Budget not found",
      message: `No active budget found for ${timestamp}-${budgetType}`,
    });
  }
  return budget;
}
