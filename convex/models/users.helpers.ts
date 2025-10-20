import { ConvexError } from "convex/values";
import { QueryCtx } from "../_generated/server";

export const getUserByClerkId = async ({
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

export const getAuthUserOrThrow = async (ctx: QueryCtx) => {
  const user = await getAuthenticatedUser(ctx);
  if (!user) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "User not authenticated",
    });
  }
  return user;
};
