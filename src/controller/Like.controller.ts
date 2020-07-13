import { Request, Response } from 'express';

import { success, error as err } from './../utils/response';
import { CommonError } from './../common/error';
import { LikeService } from '../service/Like.service';

const likeService = new LikeService();

export class LikeController {
  articleLike = async (req: Request, res: Response) => {
    try {
      const result = await likeService.articleLike(
        req.userId,
        parseInt(req.params.id)
      );

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  commentLike = async (req: Request, res: Response) => {
    try {
      const type = req.query.type ? req.query.type.toString() : 'all';
      const result = await likeService.commentLike(
        req.userId,
        parseInt(req.params.id),
        type
      );

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  getArticleLikeTotal = async (req: Request, res: Response) => {
    try {
      const result = await likeService.getArticleLikeTotal(
        parseInt(req.params.id)
      );

      res.jsonp(success(result, result.length));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  getCommentLikeTotal = async (req: Request, res: Response) => {
    try {
      const type = req.query.type ? req.query.type.toString() : 'all';

      const result = await likeService.getCommentLikeTotal(
        parseInt(req.params.id),
        type
      );

      res.jsonp(success(result, result.length));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
}
