import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const User = {
  email: v.string(),
  clerkId: v.string(),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  imageUrl: v.optional(v.string()),
  updated_at: v.optional(v.number()),
};

export default defineSchema({
  users: defineTable(User)
    .index("byEmail", ["email"])
    .index("byClerkId", ["clerkId"]),
});
