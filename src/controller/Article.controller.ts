import { Request, Response } from 'express';

import { CommonError } from '../common/error';
import { success, error as err } from '../utils/response';
import { JoiArticle } from '../joiSchema/JoiArticle';
import { ArticleService } from '../service/Article.service';

const joiArticle = new JoiArticle();
const articleService = new ArticleService();

export class ArticleController {
  createArticle = async (req: Request, res: Response) => {
    try {
      if (Object.entries(req.body).length === 0) {
        console.log('input params is empty!');
        res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
        return;
      }
      const { error, value } = await joiArticle
        .ArticleValidate()
        .validateAsync(req.body);
      if (error) {
        console.log(error.message);
        res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
        return;
      }

      const result = await articleService.createArticle(req.body, req.userId);

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  updateArticle = async (req: Request, res: Response) => {
    try {
      const { error, value } = await joiArticle
        .ArticleValidate()
        .validateAsync(req.body);
      if (error) {
        console.log(error.message);
        res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
        return;
      }
      const result = await articleService.updateArticle(
        req.body,
        parseInt(req.params.articleId)
      );

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  deleteArticle = async (req: Request, res: Response) => {
    try {
      const result = await articleService.deleteArticle(
        parseInt(req.params.articleId),
        req.userId
      );

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  getManyArticle = async (req: Request, res: Response) => {
    try {
      const result = await articleService.getManyArticle(
        parseInt(req.query.p.toString())
      );

      res.jsonp(success(result, result.length));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  getArticleOfUser = async (req: Request, res: Response) => {
    try {
      const result = await articleService.getArticleOfUser(
        parseInt(req.query.p.toString()),
        req.userId
      );

      res.jsonp(success(result, result.length));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
}
