import { getConnection } from 'typeorm';

import { LikeModel } from '../model/Like.model';

const likeModel = new LikeModel();

export class LikeService {
  likeContent = async (
    data: { articleId: number; commentId: number; parent_Comment_Id: number },
    senderId: number
  ) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await likeModel.likeContent(data, senderId, transaction);
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  getLikes = async (data: {
    articleId: number;
    commentId: number;
    parent_Comment_Id: number;
  }) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await likeModel.getLikes(data, transaction);
      });
      return result;
    } catch (error) {
      throw error;
    }
  };
}
