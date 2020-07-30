import * as Joi from '@hapi/joi';

export class JoiLike {
  LikeValidate = () => {
    return Joi.object({
      articleId: Joi.string().min(1).required(),
      commentId: Joi.string(),
      parent_Comment_Id: Joi.string(),
    });
  };
}
