import { Id } from "convex/_generated/dataModel";
import { MutationCtx } from "convex/_generated/server";
import { IconFamily } from "type";

export const createCategoryHelper = async (
  ctx: MutationCtx,
  args: {
    name: string;
    icon: {
      name: string;
      family: IconFamily;
    };
    userId: Id<"users"> | null;
    isDefault: boolean;
  }
) => {
  const categoryId = await ctx.db.insert("categories", {
    userId: args.userId,
    name: args.name,
    icon: args.icon,
    isDefault: args.isDefault,
    updatedAt: Date.now(),
  });

  // Fetch the full document using the returned ID
  const category = await ctx.db.get(categoryId);
  return category;
};
