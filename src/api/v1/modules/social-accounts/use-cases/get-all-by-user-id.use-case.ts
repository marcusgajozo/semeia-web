import { ApiError } from "@/api/v1/common/errors/api-error";
import { ISocialAccountsRepository } from "../repositories/social-account-repository.interface";
import { TCreateSocialAccount } from "../schemas/create-social-account.schema";

type TGetAllByUserIdUseCaseInput = {
  userId: string;
};

export class GetAllByUserIdUseCase {
  constructor(private socialAccountsRepository: ISocialAccountsRepository) {}

  async execute({
    userId,
  }: TGetAllByUserIdUseCaseInput): Promise<TCreateSocialAccount[]> {
    const socialAccount = await this.socialAccountsRepository.getAllByUserId(
      userId
    );

    if (!socialAccount) {
      throw new ApiError("Failed to get social accounts");
    }

    return {
      ...socialAccount,
    };
  }
}
