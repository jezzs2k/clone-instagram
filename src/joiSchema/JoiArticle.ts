import * as Joi from '@hapi/joi';

export class JoiArticle {
  ArticleValidate = () => {
    return Joi.object({
      title: Joi.string().min(1),
      image: Joi.string().min(3),
    });
  };
}
