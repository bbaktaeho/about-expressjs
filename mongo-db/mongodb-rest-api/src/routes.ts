import { Express, Request, Response } from "express";
import { createUserSessionHandler, invalidateUserSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import { requiresUser, validateRequest} from "./middleware";
import { createUserSessionSchema } from "./schema/createUserSessionSchema";
import { createUserSchema } from "./schema/creatUserSchema";

export default function (app: Express) {
  // signin
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // login
  app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);

  // get the user's sessions

  // loguot
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);
}
