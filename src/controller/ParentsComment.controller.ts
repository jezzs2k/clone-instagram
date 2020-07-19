import { Request, Response } from 'express';

import { success, error as err } from '../utils/response';
import { CommonError } from '../common/error';
import { ParentsCommentService } from '../service/ParentsComment.Service';
import { JoiComment } from '../joiSchema/JoiComment';

const parentsCommentService = new ParentsCommentService();
const joiComment = new JoiComment();

export class ParentsCommentController {
  sendComment = async (req: Request, res: Response) => {
    try {
      const { error, value } = joiComment.CommentValidate().validate(req.body);

      if (error) {
        console.log(error.message);
        return res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
      }
      const result = await parentsCommentService.sendComment(
        req.userId,
        parseInt(req.params.articleId),
        req.body
      );

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  deleteComment = async (req: Request, res: Response) => {
    try {
      const result = await parentsCommentService.deleteComment(
        req.userId,
        parseInt(req.params.commentId)
      );

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  getCommentOfArticle = async (req: Request, res: Response) => {
    try {
      const result = await parentsCommentService.getCommentOfArticle(
        parseInt(req.query.q.toString()),
        parseInt(req.params.articleId)
      );

      res.jsonp(success(result, result.length));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
}
