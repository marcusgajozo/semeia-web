import { TSocialAccountEntity } from "../domain/social-account.entity";
import { TCreateSocialAccount } from "../schemas/create-social-account.schema";

export interface ISocialAccountsRepository {
  create(props: TCreateSocialAccount): Promise<TSocialAccountEntity | null>;
  getAllByUserId(userId: string): Promise<TSocialAccountEntity[]>;
}
