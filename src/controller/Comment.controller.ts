import { Request, Response } from 'express';

import { success, error as err } from '../utils/response';
import { CommonError } from '../common/error';
import { CommentService } from '../service/Comment.Service';
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
      const result = await commentService.sendComment(req.userId, req.body);

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

  getComments = async (req: Request, res: Response) => {
    try {
      const query = req.query;
      const { error, value } = joiComment.GetCommentValidate().validate(query);
      if (error) {
        console.log(error.message);
        return res.jsonp(err(CommonError.INVALID_INPUT_QUERY));
      }
      const result = await commentService.getComments(
        value,
        parseInt(req.params.articleId)
      );

      res.jsonp(success(result, result.length));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
}
