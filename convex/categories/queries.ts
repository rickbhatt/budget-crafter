import { query } from "../_generated/server";
import { getAuthUserOrThrow } from "../models/users.helpers";

export const getAllCategories = query({
  handler: async (ctx) => {
    const user = await getAuthUserOrThrow(ctx);

    return await ctx.db
      .query("categories")
      .filter((q) =>
        q.or(q.eq(q.field("userId"), null), q.eq(q.field("userId"), user._id))
      )
      .collect();
  },
});
