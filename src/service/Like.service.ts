import { getConnection } from 'typeorm';

import { LikeModel } from '../model/Like.model';

const likeModel = new LikeModel();

export class LikeService {
  articleLike = async (userId: number, articleId: number) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await likeModel.articleLike(userId, articleId, transaction);
      });
      return result;
    } catch (error) {
      throw error;
    }
  };
  commentLike = async (userId: number, commentId: number, type: string) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await likeModel.commentLike(
          userId,
          commentId,
          type,
          transaction
        );
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  getArticleLikeTotal = async (articleId: number) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await likeModel.getArticleLikeTotal(articleId, transaction);
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  getCommentLikeOfUser = async (
    currentUser: number,
    commentId: number,
    type: string
  ) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await likeModel.getCommentLikeOfUser(
          currentUser,
          commentId,
          type,
          transaction
        );
      });
      return result;
    } catch (error) {
      throw error;
    }
  };
}
