import z from "zod";

export const facebookPageMetadataSchema = z.object({
  facebookPageId: z.string(),
  token: z.string(),
});
