import { ApiModule } from "@/api/v1/common/api-module";
import { authMiddleware } from "@/api/v1/common/middleware/auth";
import {
  createSocialAccountContract,
  getAllByUserIdContract,
} from "./social-account.contract";
import { SocialAccountController } from "./social-account.controller";

const app = new ApiModule();
const controller = new SocialAccountController();

app.use("/*", authMiddleware);

app.openapi(createSocialAccountContract, (context) =>
  controller.create(context)
);

app.openapi(getAllByUserIdContract, (context) =>
  controller.getAllByUserId(context)
);

export const socialAccountModule = app;
