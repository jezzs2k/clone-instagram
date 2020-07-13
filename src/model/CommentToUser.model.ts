import { EntityManager } from 'typeorm';

import { CommentToUser } from './../entity/CommentToUser';
import { Like } from '../entity/Like';

export class CommentToUserModel {
  sendComment = async (
    data: {
      commentArticleId: number;
      senderId: number;
      articleId: number;
      receiverId: number;
      text: string;
    },
    transaction: EntityManager
  ) => {
    try {
      const comment = await transaction.getRepository(CommentToUser).save(data);

      return comment;
    } catch (error) {
      throw error;
    }
  };

  deleteComment = async (
    data: { userId: number; commentId: number },
    transaction: EntityManager
  ) => {
    try {
      const comment = await transaction
        .getRepository(CommentToUser)
        .findOne({ where: { senderId: data.userId, id: data.commentId } });

      if (!comment) throw new Error('Comment not founds!');

      const likes = await transaction
        .getRepository(Like)
        .find({ where: { commentId: data.commentId } });

      if (likes.length > 0) await transaction.getRepository(Like).remove(likes);

      await transaction.getRepository(CommentToUser).delete(comment);

      return comment;
    } catch (error) {
      throw error;
    }
  };

  getComment = async (commentArticleId: number, transaction: EntityManager) => {
    try {
      const comments = await transaction.getRepository(CommentToUser).find({
        where: { commentArticleId },
        relations: ['sender', 'receiver'],
        cache: true,
      });

      return comments;
    } catch (error) {
      throw error;
    }
  };
}
