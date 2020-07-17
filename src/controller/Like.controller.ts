import { Request, Response } from 'express';

import { success, error as err } from './../utils/response';
import { CommonError } from './../common/error';
import { LikeService } from '../service/Like.service';

const likeService = new LikeService();

export class LikeController {
  likeArticle = async (req: Request, res: Response) => {
    try {
      const result = await likeService.likeArticle(
        req.userId,
        parseInt(req.params.articleId)
      );

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  likeParentsComment = async (req: Request, res: Response) => {
    try {
      const type = req.query.type ? req.query.type.toString() : 'all';
      const result = await likeService.likeParentsComment({
        senderId: req.userId,
        articleId: parseInt(req.params.articleId),
        parentsCommentId: parseInt(req.params.parentsCommentId),
      });

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  likeChildComment = async (req: Request, res: Response) => {
    try {
      const type = req.query.type ? req.query.type.toString() : 'all';
      const result = await likeService.likeChildComment({
        senderId: req.userId,
        articleId: parseInt(req.params.articleId),
        parentsCommentId: parseInt(req.params.parentsCommentId),
        commentId: parseInt(req.params.commentId),
      });

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  getLikeOfStory = async (req: Request, res: Response) => {
    try {
      const result = await likeService.getLikeOfStory(
        parseInt(req.params.articleId)
      );

      res.jsonp(success(result, result.length));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  getLikeOfParentsComment = async (req: Request, res: Response) => {
    try {
      const result = await likeService.getLikeOfParentsComment({
        currentUserId: req.userId,
        parentsCommentId: parseInt(req.params.parentsCommentId),
      });

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  getLikeOfChildComment = async (req: Request, res: Response) => {
    try {
      const result = await likeService.getLikeOfChildComment({
        currentUserId: req.userId,
        commentId: parseInt(req.params.commentId),
      });

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
}
