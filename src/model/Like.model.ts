import { EntityManager } from 'typeorm';

import { Like } from '../entity/Like';

export class LikeModel {
  articleLike = async (
    userId: number,
    articleId: number,
    transaction: EntityManager
  ) => {
    try {
      const like = await transaction.getRepository(Like).findOne({
        where: {
          userId,
          articleId,
        },
      });

      if (like) {
        like.isLike = !like.isLike;
        await transaction.getRepository(Like).save(like);
        return like;
      } else {
        const like = await transaction
          .getRepository(Like)
          .save({ articleId, userId });

        return like;
      }
    } catch (error) {
      throw error;
    }
  };

  commentLike = async (
    userId: number,
    commentId: number,
    transaction: EntityManager
  ) => {
    try {
      const like = await transaction.getRepository(Like).findOne({
        where: {
          userId,
          commentId,
        },
      });

      if (like) {
        like.isLike = !like.isLike;
        await transaction.getRepository(Like).save(like);
        return like;
      } else {
        const like = await transaction
          .getRepository(Like)
          .save({ commentId, userId });

        return like;
      }
    } catch (error) {
      throw error;
    }
  };

  getArticleLikeTotal = async (
    articleId: number,
    transaction: EntityManager
  ) => {
    try {
      const likes = await transaction
        .getRepository(Like)
        .find({ where: { articleId, isLike: true }, relations: ['article'] });

      return likes;
    } catch (error) {
      throw error;
    }
  };
}
