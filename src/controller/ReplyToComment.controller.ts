import { Request, Response } from 'express';

import { success, error as err } from '../utils/response';
import { ReplyToCommentService } from '../service/ReplyToComment.service';
import { JoiComment } from '../joiSchema/JoiComment';
import { CommonError } from '../common/error';

const replyToCommentService = new ReplyToCommentService();
const joiComment = new JoiComment();

export class ReplyToCommentController {
  sendComment = async (req: Request, res: Response) => {
    try {
      const { error, value } = joiComment.CommentValidate().validate(req.body);

      if (error) {
        console.log(error.message);
        return res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
      }

      const data = {
        parentsCommentId: parseInt(req.params.commentId),
        senderId: req.userId,
        articleId: parseInt(req.params.articleId),
        receiverId: parseInt(req.params.receiverId),
        text: req.body.text,
      };

      const result = await replyToCommentService.sendComment(data);

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  deleteComment = async (req: Request, res: Response) => {
    try {
      const result = await replyToCommentService.deleteComment({
        userCurrently: req.userId,
        commentId: parseInt(req.params.commentId),
      });

      res.json(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  getComment = async (req: Request, res: Response) => {
    try {
      const results = await replyToCommentService.getComment(
        parseInt(req.params.parentsCommentId)
      );

      res.jsonp(success(results, results.length));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
}
