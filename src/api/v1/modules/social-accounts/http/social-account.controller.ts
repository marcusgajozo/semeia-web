import { TAppBindings } from "@/api/v1/common/schemas/app-variables.schema";
import { Context } from "hono";
import { SocialAccountFactory } from "../factories/social-accounts.factory";

export class SocialAccountController {
  async create(context: Context<TAppBindings>) {
    const userId = context.var.user.sub;

    const { metadata, platform } = await context.req.json();

    const useCase = SocialAccountFactory.makeCreateSocialAccount();
    const result = await useCase.execute({ metadata, platform, userId });

    return context.json(result, 201);
  }

  async getAllByUserId(context: Context<TAppBindings>) {
    const userId = context.var.user.sub;

    const useCase = SocialAccountFactory.makeGetAllByUserId();
    const result = await useCase.execute({ userId });

    return context.json(result, 200);
  }
}
