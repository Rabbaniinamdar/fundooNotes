/* eslint-disable prettier/prettier */
import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    color: Joi.string().min(2),

  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: error.message,
      message: error.message.replaceAll('"', '')
    });
  } else {
    next();
  }
};
