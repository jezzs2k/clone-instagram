import { getConnection } from 'typeorm';

import { CommentToUserModel } from '../model/CommentToUser.model';

const commentToUserModel = new CommentToUserModel();

export class CommentToUSerService {
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
        result = await commentToUserModel.sendComment(data, transaction);
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
        result = await commentToUserModel.deleteComment(data, transaction);
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
        result = await commentToUserModel.getComment(
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
