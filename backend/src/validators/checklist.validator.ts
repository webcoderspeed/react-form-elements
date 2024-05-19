import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

export const validateCreateCheckList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = joi.object({
    title: joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) next(error);

  next();
};

export const validateUpdateCheckList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = joi.object({
    title: joi.string().optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) next(error);

  next();
};
