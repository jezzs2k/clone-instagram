import { EntityManager } from 'typeorm';

import { Comment } from '../entity/Comment';
import { Like } from '../entity/Like';

export class CommentModel {
  sendComment = async (
    data: {
      senderId: number;
      receiverId: number;
      parentId: number;
      articleId: number;
      text: string;
    },
    transaction: EntityManager
  ) => {
    try {
      console.log(data);
      const comment = await transaction.getRepository(Comment).save(data);

      return comment;
    } catch (error) {
      throw error;
    }
  };

  deleteComment = async (
    userCurrently: number,
    commentId: number,
    transaction: EntityManager
  ) => {
    try {
      const comment = await transaction
        .getRepository(Comment)
        .findOne({
          where: { senderId: userCurrently, id: commentId },
          cache: true,
        });

      if (!comment) throw new Error('Comment not founds!');
      const commentsChild = await transaction
        .getRepository(Comment)
        .find({ where: { parentId: commentId } });

      let likeChilds =
        commentsChild.length > 0
          ? await transaction
              .getRepository(Like)
              .find({ where: { parent_Comment_Id: commentId } })
          : [];

      const likes = await transaction
        .getRepository(Like)
        .find({ where: { commentId } });

      await transaction.getRepository(Like).remove([...likes, ...likeChilds]);

      await transaction
        .getRepository(Comment)
        .remove([...commentsChild, comment]);

      return comment;
    } catch (error) {
      throw error;
    }
  };

  getComments = async (
    data: { articleId: number; page: number; parentId: number },
    transaction: EntityManager
  ) => {
    try {
      data.page === 0 ? (data.page = 1) : data.page;
      const perPage = 2;
      const skip = (data.page - 1) * perPage;

      const comments = await transaction.getRepository(Comment).find({
        where: { articleId: data.articleId, parentId: data.parentId || null },
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
