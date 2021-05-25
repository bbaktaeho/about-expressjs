import { Request, Response, NextFunction } from 'express'
import {get} from 'lodash'

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = get(req, "headers.x-refresh");
    if (!accessToken) return next();
    const {decoded, expired} = decode(accessToken);

    if (decoded) {
        // @ts-ignore
        req.user = decoded;
    }

    if (expired && refreshToken) {
        const newAccessToken = await 
    }
}