import { query } from "../_generated/server";
import { getAuthenticatedUser } from "../models/users.helpers";

export const getAuthenticatedUserProfile = query({
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);
    return user;
  },
});
