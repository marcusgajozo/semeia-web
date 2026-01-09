import { createRoute } from "@hono/zod-openapi";
import { createSocialAccountInputSchema } from "../schemas/create-social-account.schema";

export const createSocialAccountContract = createRoute({
  method: "post",
  path: "/social-accounts",
  tags: ["Social Accounts"],
  summary: "Create a new social account",
  security: [
    {
      BearerAuth: [],
    },
  ],
  request: {
    body: {
      content: {
        "application/json": { schema: createSocialAccountInputSchema },
      },
    },
  },
  responses: {
    201: { description: "Success" },
    400: { description: "Validation error" },
    401: { description: "Unauthorized" },
  },
});

export const getAllByUserIdContract = createRoute({
  method: "get",
  path: "/social-accounts",
  tags: ["Social Accounts"],
  summary: "Get all social accounts by user ID",
  security: [
    {
      BearerAuth: [],
    },
  ],
  responses: {
    200: { description: "Success" },
    401: { description: "Unauthorized" },
  },
});
