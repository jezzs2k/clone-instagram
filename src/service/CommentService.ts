import { getConnection } from 'typeorm';

import { CommentModel } from './../model/Comment.model';

const commentModel = new CommentModel();

export class CommentService {
  sendComment = async (
    senderId: number,
    articleId: number,
    data: { text: string }
  ) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await commentModel.sendComment(
          { senderId, articleId, text: data.text },
          transaction
        );
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  sendCommentAnswerTo = async (
    senderId: number,
    articleId: number,
    receiverId: number,
    data: { text: string }
  ) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await commentModel.sendCommentAnswerTo(
          { senderId, articleId, receiverId, text: data.text },
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

  getCommentByArticleId = async (articleId: number, type: string) => {
    try {
      let comments;
      await getConnection().transaction(async (transaction) => {
        comments = await commentModel.getCommentByArticleId(
          articleId,
          type,
          transaction
        );
      });

      return comments;
    } catch (error) {
      throw error;
    }
  };
}
