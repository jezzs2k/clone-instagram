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
    type: string,
    transaction: EntityManager
  ) => {
    try {
      if (type === 'child') {
        const likeCurrent = await transaction.getRepository(Like).findOne({
          where: {
            userId,
            commentToUserId: commentId,
          },
          cache: true,
        });

        if (likeCurrent) {
          likeCurrent.isLike = !likeCurrent.isLike;
          await transaction.getRepository(Like).save(likeCurrent);
          return likeCurrent;
        } else {
          const like = await transaction
            .getRepository(Like)
            .save({ commentToUserId: commentId, userId });

          return like;
        }
      } else {
        const likeCurrent = await transaction.getRepository(Like).findOne({
          where: {
            userId,
            commentId,
          },
          cache: true,
        });

        if (likeCurrent) {
          likeCurrent.isLike = !likeCurrent.isLike;
          await transaction.getRepository(Like).save(likeCurrent);
          return likeCurrent;
        } else {
          const like = await transaction
            .getRepository(Like)
            .save({ commentId, userId });

          return like;
        }
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

  getCommentLikeTotal = async (
    commentId: number,
    type: string,
    transaction: EntityManager
  ) => {
    try {
      let likes;
      if (type === 'child') {
        likes = await transaction.getRepository(Like).find({
          where: { commentToUserId: commentId, isLike: true },
          relations: ['commentToUsers'],
        });
      } else {
        likes = await transaction.getRepository(Like).find({
          where: { commentId, isLike: true },
          relations: ['comment'],
        });
      }

      return likes;
    } catch (error) {
      throw error;
    }
  };
}
