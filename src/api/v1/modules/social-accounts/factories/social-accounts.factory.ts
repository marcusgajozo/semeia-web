import { PrismaSocialAccountsRepository } from "../infra/prisma-social-account.repository";
import { CreateSocialAccountUseCase } from "../use-cases/create-social-account.use-case";
import { GetAllByUserIdUseCase } from "../use-cases/get-all-by-user-id.use-case";

export class SocialAccountFactory {
  static makeCreateSocialAccount() {
    const socialAccountsRepository = new PrismaSocialAccountsRepository();
    return new CreateSocialAccountUseCase(socialAccountsRepository);
  }

  static makeGetAllByUserId() {
    const socialAccountsRepository = new PrismaSocialAccountsRepository();
    return new GetAllByUserIdUseCase(socialAccountsRepository);
  }
}
