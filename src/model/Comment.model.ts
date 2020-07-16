import { EntityManager } from 'typeorm';

import { Comment } from '../entity/Comment';
import { Like } from '../entity/Like';

export class CommentModel {
  sendComment = async (
    data: {
      senderId: number;
      articleId: number;
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

  sendCommentAnswerTo = async (
    data: {
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
    userId: number,
    commentId: number,
    transaction: EntityManager
  ) => {
    try {
      const comment = await transaction
        .getRepository(Comment)
        .findOne({ where: { senderId: userId, id: commentId } });

      if (!comment) throw new Error('Comment not founds!');

      const likes = await transaction
        .getRepository(Like)
        .find({ where: { commentId } });

      if (likes.length > 0) await transaction.getRepository(Like).remove(likes);

      await transaction.getRepository(Comment).delete(comment);

      return comment;
    } catch (error) {
      throw error;
    }
  };

  getCommentByArticleId = async (
    articleId: number,
    transaction: EntityManager
  ) => {
    try {
      const comments = await transaction.getRepository(Comment).find({
        where: { articleId },
        relations: ['sender'],
        cache: true,
      });

      return comments;
    } catch (error) {
      throw error;
    }
  };
}
