import { query } from "convex/_generated/server";

export const someQuery = query({
  handler: async (ctx) => {
    return "Hello World";
  },
});
