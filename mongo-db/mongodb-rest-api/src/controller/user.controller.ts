import { createUser } from "../service/user.service";
import { Request, Response } from "express";
import { omit } from "lodash";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.json(omit(user.toJSON(), "password"));
  } catch (err) {
    log.error(err.message);
    return res.status(409).json(err.message);
  }
}

