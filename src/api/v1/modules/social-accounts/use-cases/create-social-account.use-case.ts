import { ApiError } from "@/api/v1/common/errors/api-error";
import { ISocialAccountsRepository } from "../repositories/social-account-repository.interface";
import { TCreateSocialAccount } from "../schemas/create-social-account.schema";

type TCreateSocialAccountUseCaseOutput = {
  id: string;
};

export class CreateSocialAccountUseCase {
  constructor(private socialAccountsRepository: ISocialAccountsRepository) {}

  async execute({
    metadata,
    platform,
    userId,
  }: TCreateSocialAccount): Promise<TCreateSocialAccountUseCaseOutput> {
    const socialAccount = await this.socialAccountsRepository.create({
      metadata,
      platform,
      userId,
    });

    if (!socialAccount) {
      throw new ApiError("Failed to create social account");
    }

    return {
      id: socialAccount.id,
    };
  }
}
