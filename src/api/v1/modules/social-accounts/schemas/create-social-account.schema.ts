import z from "zod";
import { socialAccountSchema } from "./social-account.schema";

export const createSocialAccountInputSchema = socialAccountSchema.pick({
  platform: true,
  metadata: true,
});

export type TCreateSocialAccount = z.infer<
  typeof createSocialAccountInputSchema
> & {
  userId: string;
};
