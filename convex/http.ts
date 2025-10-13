import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

export const handleClerkWebhook = httpAction(async (ctx, req) => {
  const { data, type } = await req.json();

  switch (type) {
    case "user.created":
      await ctx.runMutation(internal.users.mutations.createUser, {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        imageUrl: data.image_url,
      });
      break;

    case "user.updated":
      console.log("user updated");
      break;
    case "user.deleted":
      await ctx.runMutation(internal.users.mutations.deleteUser, {
        clerkId: data.id,
      });

      break;
  }

  return new Response(null, {
    status: 200,
  });
});

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

export default http;
