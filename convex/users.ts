import { v } from "convex/values";
import { internalMutation, query, QueryCtx } from "./_generated/server";

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

const getUserByClerkId = async ({
  ctx,
  clerkId,
}: {
  ctx: QueryCtx;
  clerkId: string;
}) => {
  const user = await ctx.db
    .query("users")
    .withIndex("byClerkId", (q) => q.eq("clerkId", clerkId))
    .unique();

  return user;
};

export const getAuthenticatedUser = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  const user = await getUserByClerkId({ ctx, clerkId: identity.subject });
  return user;
};

export const getAuthenticatedUserProfile = query({
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);
    return user;
  },
});
