import { Request, Response } from 'express';

import { success, error as err } from '../utils/response';
import { CommonError } from '../common/error';
import { CommentService } from '../service/CommentService';
import { JoiComment } from '../joiSchema/JoiComment';

const commentService = new CommentService();
const joiComment = new JoiComment();

export class CommentController {
  sendComment = async (req: Request, res: Response) => {
    try {
      const { error, value } = joiComment.CommentValidate().validate(req.body);

      if (error) {
        console.log(error.message);
        return res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
      }
      const result = await commentService.sendComment(
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
      const result = await commentService.deleteComment(
        req.userId,
        parseInt(req.params.commentId)
      );

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  getCommentByArticleId = async (req: Request, res: Response) => {
    try {
      const result = await commentService.getCommentByArticleId(
        parseInt(req.params.articleId)
      );

      res.jsonp(success(result, result.length));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
}
