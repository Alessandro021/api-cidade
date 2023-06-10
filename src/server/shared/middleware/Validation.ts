import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";


type TValidation = (field: "body" | "header" | "params" |"query", schema: Schema<any>) => RequestHandler;

export const Validation: TValidation = (field, schema ) => async (req, res, next)  => {
  try {
    await schema.validate(req[field], {abortEarly: false});
    return next();
  } catch (err) {
    const yupError = err as ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if(error.path === undefined) return; 
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors });
  }
};
