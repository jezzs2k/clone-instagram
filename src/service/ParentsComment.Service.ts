import { getConnection } from 'typeorm';

import { ParentsCommentModel } from '../model/ParentsComment.model';

const parentsCommentModel = new ParentsCommentModel();

export class ParentsCommentService {
  sendComment = async (
    senderId: number,
    articleId: number,
    data: { text: string }
  ) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await parentsCommentModel.sendComment(
          { senderId, articleId, text: data.text },
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
        comment = await parentsCommentModel.deleteComment(
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

  getCommentOfArticle = async (page: number, articleId: number) => {
    try {
      let comments;
      await getConnection().transaction(async (transaction) => {
        comments = await parentsCommentModel.getCommentOfArticle(
          page,
          articleId,
          transaction
        );
      });

      return comments;
    } catch (error) {
      throw error;
    }
  };
}
