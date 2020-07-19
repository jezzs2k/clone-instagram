import { EntityManager } from 'typeorm';

import { ParentsComment } from '../entity/ParentsComment';
import { Comment } from '../entity/Comment';
import { Like } from '../entity/Like';

export class ParentsCommentModel {
  sendComment = async (
    data: {
      senderId: number;
      articleId: number;
      text: string;
    },
    transaction: EntityManager
  ) => {
    try {
      const comment = await transaction
        .getRepository(ParentsComment)
        .save(data);

      return comment;
    } catch (error) {
      throw error;
    }
  };

  deleteComment = async (
    userCurrently: number,
    parentsCommentId: number,
    transaction: EntityManager
  ) => {
    try {
      const comment = await transaction
        .getRepository(ParentsComment)
        .findOne({ where: { senderId: userCurrently, id: parentsCommentId } });

      if (!comment) throw new Error('Comment not founds!');

      const commentsChild = await transaction
        .getRepository(Comment)
        .find({ where: { parentsCommentId } });

      if (commentsChild.length > 0)
        await transaction.getRepository(Comment).remove(commentsChild);

      const likes = await transaction
        .getRepository(Like)
        .find({ where: { parentsCommentId } });

      if (likes.length > 0) await transaction.getRepository(Like).remove(likes);

      await transaction.getRepository(ParentsComment).delete(comment);

      return comment;
    } catch (error) {
      throw error;
    }
  };

  getCommentOfArticle = async (
    page: number,
    articleId: number,
    transaction: EntityManager
  ) => {
    try {
      if (page === 0) {
        page = 1;
      }
      const perPage = 5;
      const skip = (page - 1) * perPage;

      const comments = await transaction.getRepository(ParentsComment).find({
        where: { articleId },
        skip: skip,
        take: perPage,
        order: { createAt: 'DESC' },
        relations: ['sender'],
        cache: true,
      });

      return comments;
    } catch (error) {
      throw error;
    }
  };
}
