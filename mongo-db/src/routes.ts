import { Express, Request, Response } from "express";
import { createUserSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSessionSchema } from "./schema/createUserSessionSchema";
import { createUserSchema } from "./schema/creatUserSchema";

export default function (app: Express) {
  // signin
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // login
  app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);

  // get the user's sessions

  // loguot
}
