import * as Joi from '@hapi/joi';

export class JoiComment {
  CommentValidate = () => {
    return Joi.object({
      text: Joi.string().min(1).required(),
    });
  };
}
