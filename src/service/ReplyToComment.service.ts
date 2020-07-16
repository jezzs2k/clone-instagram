import { getConnection } from 'typeorm';

import { ReplyToCommentModel } from '../model/ReplyToComment.model';

const replyToCommentModel = new ReplyToCommentModel();

export class ReplyToCommentService {
  sendComment = async (data: {
    commentArticleId: number;
    senderId: number;
    articleId: number;
    receiverId: number;
    text: string;
  }) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await replyToCommentModel.sendComment(data, transaction);
      });

      return result;
    } catch (error) {
      throw error;
    }
  };

  deleteComment = async (data: { userId: number; commentId: number }) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await replyToCommentModel.deleteComment(data, transaction);
      });

      return result;
    } catch (error) {
      throw error;
    }
  };

  getComment = async (commentArticleId: number) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await replyToCommentModel.getComment(
          commentArticleId,
          transaction
        );
      });

      return result;
    } catch (error) {
      throw error;
    }
  };
}
