import * as Joi from '@hapi/joi';

export class JoiComment {
  CommentValidate = () => {
    return Joi.object({
      text: Joi.string().min(1).required(),
      articleId: Joi.number(),
      receiverId: Joi.number(),
      parentId: Joi.number(),
    });
  };

  GetCommentValidate = () => {
    return Joi.object({
      page: Joi.string().min(1).required(),
      parentId: Joi.string(),
    });
  };
}
