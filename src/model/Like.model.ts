import { EntityManager } from 'typeorm';

import { Like } from '../entity/Like';

export class LikeModel {
  likeArticle = async (
    senderId: number,
    articleId: number,
    transaction: EntityManager
  ) => {
    try {
      const like = await transaction.getRepository(Like).findOne({
        where: {
          senderId,
          articleId,
          parentsCommentId: null,
        },
      });

      if (like) {
        like.isLike = !like.isLike;
        await transaction.getRepository(Like).save(like);
        return like;
      } else {
        const like = await transaction
          .getRepository(Like)
          .save({ articleId, senderId });

        return like;
      }
    } catch (error) {
      throw error;
    }
  };

  likeParentsComment = async (
    data: {
      senderId: number;
      articleId: number;
      parentsCommentId: number;
    },
    transaction: EntityManager
  ) => {
    try {
      const { senderId, articleId, parentsCommentId } = data;

      const likeCurrently = await transaction.getRepository(Like).findOne({
        where: {
          senderId,
          parentsCommentId,
          articleId,
          commentId: null,
        },
        cache: true,
      });

      if (likeCurrently) {
        likeCurrently.isLike = !likeCurrently.isLike;
        await transaction.getRepository(Like).save(likeCurrently);
        return likeCurrently;
      } else {
        const like = await transaction
          .getRepository(Like)
          .save({ parentsCommentId, senderId, articleId });

        return like;
      }
    } catch (error) {
      throw error;
    }
  };

  likeChildComment = async (
    data: {
      senderId: number;
      articleId: number;
      parentsCommentId: number;
      commentId: number;
    },
    transaction: EntityManager
  ) => {
    try {
      const { senderId, articleId, parentsCommentId, commentId } = data;

      const likeCurrently = await transaction.getRepository(Like).findOne({
        where: {
          senderId,
          parentsCommentId,
          articleId,
          commentId,
        },
        cache: true,
      });

      if (likeCurrently) {
        likeCurrently.isLike = !likeCurrently.isLike;
        await transaction.getRepository(Like).save(likeCurrently);
        return likeCurrently;
      } else {
        const like = await transaction.getRepository(Like).save(data);

        return like;
      }
    } catch (error) {
      throw error;
    }
  };

  getLikeOfStory = async (articleId: number, transaction: EntityManager) => {
    try {
      const likes = await transaction.getRepository(Like).find({
        where: { articleId, parentsCommentId: null, isLike: true },
        relations: ['article'],
      });

      return likes;
    } catch (error) {
      throw error;
    }
  };

  getLikeOfParentsComment = async (
    data: {
      currentUserId: number;
      parentsCommentId: number;
    },
    transaction: EntityManager
  ) => {
    try {
      const { currentUserId, parentsCommentId } = data;
      const like = await transaction.getRepository(Like).findOne({
        where: {
          parentsCommentId,
          senderId: currentUserId,
          commentId: null,
        },
        relations: ['parentsComment'],
      });

      return like;
    } catch (error) {
      throw error;
    }
  };

  getLikeOfChildComment = async (
    data: {
      currentUserId: number;
      commentId: number;
    },
    transaction: EntityManager
  ) => {
    try {
      const { currentUserId, commentId } = data;
      const like = await transaction.getRepository(Like).findOne({
        where: {
          commentId,
          senderId: currentUserId,
        },
      });

      return like;
    } catch (error) {
      throw error;
    }
  };
}
