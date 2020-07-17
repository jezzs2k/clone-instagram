import { EntityManager } from 'typeorm';

import { Comment } from '../entity/Comment';
import { Like } from '../entity/Like';

export class ReplyToCommentModel {
  sendComment = async (
    data: {
      parentsCommentId: number;
      senderId: number;
      articleId: number;
      receiverId: number;
      text: string;
    },
    transaction: EntityManager
  ) => {
    try {
      const comment = await transaction.getRepository(Comment).save(data);

      return comment;
    } catch (error) {
      throw error;
    }
  };

  deleteComment = async (
    data: { userCurrently: number; commentId: number },
    transaction: EntityManager
  ) => {
    try {
      const comment = await transaction
        .getRepository(Comment)
        .findOne({
          where: { senderId: data.userCurrently, id: data.commentId },
        });

      if (!comment) throw new Error('Comment not founds!');

      const likes = await transaction
        .getRepository(Like)
        .find({ where: { commentId: data.commentId } });

      if (likes.length > 0) await transaction.getRepository(Like).remove(likes);

      await transaction.getRepository(Comment).delete(comment);

      return comment;
    } catch (error) {
      throw error;
    }
  };

  getComment = async (parentsCommentId: number, transaction: EntityManager) => {
    try {
      const comments = await transaction.getRepository(Comment).find({
        where: { parentsCommentId },
        relations: ['sender', 'receiver'],
        cache: true,
      });

      return comments;
    } catch (error) {
      throw error;
    }
  };
}
