import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client"; // <--- Importe isso
import { TSocialAccountEntity } from "../domain/social-account.entity";
import { ISocialAccountsRepository } from "../repositories/social-account-repository.interface";
import { TCreateSocialAccount } from "../schemas/create-social-account.schema";

export class PrismaSocialAccountsRepository
  implements ISocialAccountsRepository
{
  async create({
    metadata,
    platform,
    userId,
  }: TCreateSocialAccount): Promise<TSocialAccountEntity | null> {
    const socialAccountCreated = await prisma.socialAccount.create({
      data: {
        metadata: (metadata ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        platform,
        userId,
      },
    });
    const metadataObj = socialAccountCreated.metadata as Prisma.JsonObject;

    return {
      ...socialAccountCreated,
      metadata: metadataObj ?? {},
    } as unknown as TSocialAccountEntity;
  }

  async getAllByUserId(userId: string): Promise<TSocialAccountEntity[]> {
    const socialAccounts = await prisma.socialAccount.findMany({
      where: {
        userId,
      },
    });

    return socialAccounts.map((account) => {
      const metadataObj = account.metadata as Prisma.JsonObject;
      return {
        ...account,
        metadata: metadataObj ?? {},
      } as unknown as TSocialAccountEntity;
    });
  }
}
