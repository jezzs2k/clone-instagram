import * as Joi from '@hapi/joi';

export class JoiUser {
  loginValidate = () => {
    return Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });
  };
  registerValidate = () => {
    return Joi.object({
      fullName: Joi.string().min(3).max(30).required(),
      nickname: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });
  };
  updateValidate = () => {
    return Joi.object({
      fullName: Joi.string().min(3).max(30),
      nickname: Joi.string().min(3).max(30),
      age: Joi.string().min(2).max(30),
      gender: Joi.string().min(2).max(10),
      avatar: Joi.string(),
    });
  };
}
