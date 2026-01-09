import z from "zod";

export const instagramMetadataSchema = z.object({
  instagramId: z.string(),
  token: z.string(),
});
