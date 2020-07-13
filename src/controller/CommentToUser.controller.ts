import { Request, Response } from 'express';

import { success, error as err } from '../utils/response';
import { CommentToUSerService } from '../service/CommentToUser.service';
import { JoiComment } from '../joiSchema/JoiComment';
import { CommonError } from '../common/error';

const commentToUseService = new CommentToUSerService();
const joiComment = new JoiComment();

export class CommentToUserController {
  sendComment = async (req: Request, res: Response) => {
    try {
      const { error, value } = joiComment.CommentValidate().validate(req.body);

      if (error) {
        console.log(error.message);
        return res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
      }

      const data = {
        commentArticleId: parseInt(req.params.commentId),
        senderId: req.userId,
        articleId: parseInt(req.params.articleId),
        receiverId: parseInt(req.params.receiverId),
        text: req.body.text,
      };

      const result = await commentToUseService.sendComment(data);

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  deleteComment = async (req: Request, res: Response) => {
    try {
      const data = {
        userId: req.userId,
        commentId: parseInt(req.params.commentId),
      };
      const result = await commentToUseService.deleteComment(data);

      res.json(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  getComment = async (req: Request, res: Response) => {
    try {
      const results = await commentToUseService.getComment(
        parseInt(req.params.commentArticleId)
      );

      res.jsonp(success(results, results.length));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
}
