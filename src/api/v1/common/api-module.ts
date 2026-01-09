import { OpenAPIHono, OpenAPIHonoOptions } from "@hono/zod-openapi";
import { TAppBindings } from "./schemas/app-variables.schema";

export class ApiModule extends OpenAPIHono<TAppBindings> {
  constructor(options?: OpenAPIHonoOptions<TAppBindings>) {
    super({
      ...options,
      defaultHook: (result, c) => {
        if (!result.success) {
          return c.json(
            {
              error: "Validation Error",
              details: result.error.flatten(),
            },
            400
          );
        }
      },
    });
  }
}
