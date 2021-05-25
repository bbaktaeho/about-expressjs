import { validatePassword } from "../service/user.service";
import { Request, Response } from "express";
import { createAccessToken, createSession } from "../service/session.service";
import { sign } from "../util/jwt.util";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the email and password
  const user = await validatePassword(req.body);
  if (!user) return res.status(401).json("Invalid username or password");

  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create access token
  const accessToken = createAccessToken({ user, session });

  // create refresh token
  const refreshToken = sign(session, { expiresIn: config.get("refreshTokenTtl") });

  // send refresh & access token back
  return res.send({ accessToken, refreshToken });
}
