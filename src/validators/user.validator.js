import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    email: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
    confirmpassword: Joi.string().min(8).required()
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

export const loginUserValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(4).required(),
    password: Joi.string().min(8).required()
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
