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

  getCommentLikeOfUser = async (
    currentUser: number,
    commentId: number,
    type: string,
    transaction: EntityManager
  ) => {
    try {
      let like;
      if (type === 'child') {
        like = await transaction.getRepository(Like).findOne({
          where: {
            commentToUserId: commentId,
            userId: currentUser,
          },
          relations: ['commentToUsers'],
        });
      } else {
        like = await transaction.getRepository(Like).findOne({
          where: { commentId, userId: currentUser },
          relations: ['comment'],
        });
      }

      return like || {};
    } catch (error) {
      throw error;
    }
  };
}
