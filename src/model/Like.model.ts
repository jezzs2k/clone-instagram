import { EntityManager } from 'typeorm';

import { Like } from '../entity/Like';

export class LikeModel {
  likeContent = async (
    data: { articleId: number; commentId: number; parent_Comment_Id: number },
    senderId: number,
    transaction: EntityManager
  ) => {
    try {
      const like = await transaction.getRepository(Like).findOne({
        where: {
          senderId,
          articleId: data.articleId,
          parent_Comment_Id: data.parent_Comment_Id || null,
          commentId: data.commentId || null,
        },
      });

      if (like) {
        like.isLike = !like.isLike;
        like.updateAt = new Date();
        await transaction.getRepository(Like).save(like);
        return like;
      } else {
        const like = await transaction.getRepository(Like).save({
          articleId: data.articleId,
          parent_Comment_Id: data.parent_Comment_Id || null,
          commentId: data.commentId || null,
          senderId,
        });

        return like;
      }
    } catch (error) {
      throw error;
    }
  };

  getLikes = async (
    data: { articleId: number; commentId: number; parent_Comment_Id: number },
    transaction: EntityManager
  ) => {
    try {
      const likes = await transaction.getRepository(Like).find({
        where: {
          articleId: data.articleId,
          parent_Comment_Id: data.parent_Comment_Id || null,
          commentId: data.commentId || null,
          isLike: true,
        },
        cache: true,
        relations: ['article'],
      });

      return likes;
    } catch (error) {
      throw error;
    }
  };
}
