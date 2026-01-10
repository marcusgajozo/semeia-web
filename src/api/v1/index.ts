import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { globalErrorHandler } from "./common/errors/error-handler";
import { authModule } from "./modules/auth/http/auth.routes";

const api = new OpenAPIHono().basePath("/api/v1");

api.openAPIRegistry.registerComponent("securitySchemes", "BearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

api.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Agendei API",
    description: "API do sistema Agendei",
  },
});

api.get("/swagger", swaggerUI({ url: "/api/v1/doc" }));

api.onError(globalErrorHandler);

api.route("/", authModule);

export { api };
