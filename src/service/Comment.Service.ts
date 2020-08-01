import { getConnection } from 'typeorm';

import { CommentModel } from '../model/Comment.model';

const commentModel = new CommentModel();

export class CommentService {
  sendComment = async (
    senderId: number,
    data: {
      text: string;
      articleId: number;
      receiverId: number;
      parentId: number;
    }
  ) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await commentModel.sendComment(
          { senderId, ...data },
          transaction
        );
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  deleteComment = async (userId: number, commentId: number) => {
    try {
      let comment;
      await getConnection().transaction(async (transaction) => {
        comment = await commentModel.deleteComment(
          userId,
          commentId,
          transaction
        );
      });

      return comment;
    } catch (error) {
      throw error;
    }
  };

  getComments = async (
    data: { page: number; parentId: number },
    articleId: number
  ) => {
    try {
      let comments;
      await getConnection().transaction(async (transaction) => {
        comments = await commentModel.getComments(
          { articleId, ...data },
          transaction
        );
      });

      return comments;
    } catch (error) {
      throw error;
    }
  };

  getCommentById = async (commentId: number) => {
    try {
      let comment;
      await getConnection().transaction(async (transaction) => {
        comment = await commentModel.getCommentById(commentId, transaction);
      });

      return comment;
    } catch (error) {
      throw error;
    }
  };
}
