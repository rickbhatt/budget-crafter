import { internalMutation } from "convex/_generated/server";
import { createCategoryHelper } from "convex/models/categories.helpers";
import { v } from "convex/values";
import { getCurrentDateTimeUnix } from "src/utils/date";
export const seedCategories = internalMutation({
  handler: async (ctx) => {
    const defaultCategories = [
      {
        name: "Housing",
        icon: { name: "home", family: "MaterialCommunityIcons" as const },
      },
      {
        name: "Groceries",
        icon: { name: "cart", family: "MaterialCommunityIcons" as const },
      },
      {
        name: "Food & Dining",
        icon: { name: "food", family: "MaterialCommunityIcons" as const },
      },
      {
        name: "Transportation",
        icon: { name: "car", family: "MaterialCommunityIcons" as const },
      },
      {
        name: "Utilities",
        icon: {
          name: "lightning-bolt",
          family: "MaterialCommunityIcons" as const,
        },
      },
      {
        name: "Savings",
        icon: {
          name: "piggy-bank",
          family: "MaterialCommunityIcons" as const,
        },
      },

      {
        name: "Insurance",
        icon: {
          name: "shield-check",
          family: "MaterialCommunityIcons" as const,
        },
      },
      {
        name: "Healthcare",
        icon: {
          name: "hospital-box",
          family: "MaterialCommunityIcons" as const,
        },
      },
      {
        name: "Personal Care",
        icon: {
          name: "account",
          family: "MaterialCommunityIcons" as const,
        },
      },
      {
        name: "Entertainment",
        icon: { name: "movie", family: "MaterialCommunityIcons" as const },
      },
      {
        name: "Shopping",
        icon: {
          name: "shopping",
          family: "MaterialCommunityIcons" as const,
        },
      },
      {
        name: "Education",
        icon: {
          name: "school",
          family: "MaterialCommunityIcons" as const,
        },
      },
      {
        name: "Gifts & Donations",
        icon: { name: "gift", family: "MaterialCommunityIcons" as const },
      },
      {
        name: "Subscriptions",
        icon: {
          name: "repeat",
          family: "MaterialCommunityIcons" as const,
        },
      },
      {
        name: "Miscellaneous",
        icon: {
          name: "dots-horizontal",
          family: "MaterialCommunityIcons" as const,
        },
      },
      {
        name: "Loans & EMIs",
        icon: {
          name: "bank",
          family: "MaterialCommunityIcons" as const,
        },
      },
    ];

    const results = [];

    for (const category of defaultCategories) {
      // Check if already exists
      const existing = await ctx.db
        .query("categories")
        .filter((q) =>
          q.and(
            q.eq(q.field("userId"), null),
            q.eq(q.field("name"), category.name)
          )
        )
        .first();

      if (!existing) {
        const categoryId = await ctx.db.insert("categories", {
          userId: null,
          name: category.name,
          icon: category.icon,
          isDefault: true,
          updatedAt: getCurrentDateTimeUnix(),
        });
        results.push({
          name: category.name,
          id: categoryId,
          status: "created",
        });
      } else {
        results.push({
          name: category.name,
          id: existing._id,
          status: "already exists",
        });
      }
    }

    return {
      message: "Default categories seeded successfully",
      results,
    };
  },
});

export const createCategoryAdmin = internalMutation({
  args: {
    name: v.string(),
    icon: v.object({
      name: v.string(),
      family: v.union(
        v.literal("MaterialCommunityIcons"),
        v.literal("Ionicons"),
        v.literal("FontAwesome"),
        v.literal("AntDesign")
      ),
    }),
  },
  handler: async (ctx, args) => {
    return await createCategoryHelper(ctx, {
      ...args,
      userId: null,
      isDefault: true,
    });
  },
});

export const updateCategoryAdmin = internalMutation({
  args: {
    id: v.id("categories"),
    name: v.string(),
    icon: v.object({
      name: v.string(),
      family: v.union(
        v.literal("MaterialCommunityIcons"),
        v.literal("Ionicons"),
        v.literal("FontAwesome"),
        v.literal("AntDesign")
      ),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      icon: args.icon,
      updatedAt: getCurrentDateTimeUnix(),
    });

    const category = await ctx.db.get(args.id);

    return {
      message: "Category updated successfully",
      category,
    };
  },
});

export const deleteCategoryAdmin = internalMutation({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { message: "Category deleted successfully" };
  },
});
