import { getConnection } from 'typeorm';

import { LikeModel } from '../model/Like.model';

const likeModel = new LikeModel();

export class LikeService {
  likeArticle = async (senderId: number, articleId: number) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await likeModel.likeArticle(senderId, articleId, transaction);
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  likeParentsComment = async (data: {
    senderId: number;
    articleId: number;
    parentsCommentId: number;
  }) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await likeModel.likeParentsComment(data, transaction);
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  likeChildComment = async (data: {
    senderId: number;
    articleId: number;
    parentsCommentId: number;
    commentId: number;
  }) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await likeModel.likeChildComment(data, transaction);
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  getLikeOfStory = async (articleId: number) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await likeModel.getLikeOfStory(articleId, transaction);
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  getLikeOfParentsComment = async (data: {
    currentUserId: number;
    parentsCommentId: number;
  }) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await likeModel.getLikeOfParentsComment(data, transaction);
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  getLikeOfChildComment = async (data: {
    currentUserId: number;
    commentId: number;
  }) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await likeModel.getLikeOfChildComment(data, transaction);
      });
      return result;
    } catch (error) {
      throw error;
    }
  };
}
