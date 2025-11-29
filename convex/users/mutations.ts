import { v } from "convex/values";
import { internalMutation, mutation } from "../_generated/server";
import { getAuthenticatedUser } from "../models/users.helpers";

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    updated_at: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.insert("users", {
      ...args,
    });

    return user;
  },
});

export const deleteUser = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, { clerkId }) => {
    try {
      let user = await ctx.db
        .query("users")
        .withIndex("byClerkId", (q) => q.eq("clerkId", clerkId))
        .unique();

      if (user !== null) {
        await ctx.db.delete(user._id);
      } else {
        console.warn(
          `Can't delete user, there is none for Clerk user ID: ${clerkId}`
        );
      }
    } catch (error) {
      console.log("error in deleteUser", error);
    }
  },
});

export const updateCurrencyDetails = mutation({
  args: {
    currencyCode: v.string(),
    currencySymbol: v.string(),
    decimalSeparator: v.string(),
    digitGroupingSeparator: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const user = await getAuthenticatedUser(ctx);

      if (!user) return;

      const updatedUser = await ctx.db.patch(user._id, {
        currency: {
          ...args,
        },
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.log("🚀 error in updateCurrencyDetails", error);
    }
  },
});
