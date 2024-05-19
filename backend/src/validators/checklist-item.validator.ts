import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

export const validateCreateCheckListItem = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = joi.object({
    title: joi.string().required(),
    checklistId: joi.string().required(), 
    isChecked: joi.boolean().optional(), 
  });

  const { error } = schema.validate(req.body);

  if (error) next(error);

  next();
};

export const validateUpdateCheckListItem = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = joi.object({
    title: joi.string().optional(),
    checklistId: joi.string().optional(),
    isChecked: joi.boolean().optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) next(error);

  next();
};
