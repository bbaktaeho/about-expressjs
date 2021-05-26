import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger";

const validateRequest =
  (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({ body: req.body, query: req.query, params: req.params });
      return next();
    } catch (err) {
      log.error(err.message);
      return res.status(400).json(err.errors);
    }
  };

export default validateRequest;
