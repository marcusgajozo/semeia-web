import { baseEntitySchema } from "@/api/v1/common/schemas/base-entity.schema";
import z from "zod";
import { platforms } from "../constants/platforms";
import { facebookPageMetadataSchema } from "./facebook-page-metadada.schema";
import { instagramMetadataSchema } from "./instagram-metadada.schema";

export const socialAccountSchema = baseEntitySchema.extend({
  platform: z.enum(platforms),
  metadata: instagramMetadataSchema.or(facebookPageMetadataSchema),
  userId: z.uuid(),
});

export type TSocialAccount = z.infer<typeof socialAccountSchema>;
