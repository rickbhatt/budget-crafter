import { mutation } from "convex/_generated/server";
import { createCategoryHelper } from "convex/models/categories.helpers";
import { getAuthUserOrThrow } from "convex/models/users.helpers";
import { v } from "convex/values";

export const createCategory = mutation({
  args: {
    name: v.string(),
    icon: v.object({
      name: v.string(),
      family: v.union(
        v.literal("MaterialCommunityIcons"),
        v.literal("Ionicons"),
        v.literal("FontAwesome"),
        v.literal("AntDesign"),
        v.literal("Entypo"),
        v.literal("MaterialIcons"),
        v.literal("Feather")
      ),
    }),
  },
  handler: async (ctx, args) => {
    const user = await getAuthUserOrThrow(ctx);

    return await createCategoryHelper(ctx, {
      ...args,
      userId: user._id,
      isDefault: false,
    });
  },
});
