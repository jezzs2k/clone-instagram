import { getConnection } from 'typeorm';

import { FriendModel } from '../model/Friend.model';

const friendModel = new FriendModel();

export class FriendService {
  sendRequest = async (senderId: number, receiverId: number) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await friendModel.sendRequest(
          senderId,
          receiverId,
          transaction
        );
      });

      return result;
    } catch (error) {
      throw error;
    }
  };
  unFollowFriend = async (userId: number, id: number) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await friendModel.unFollowFriend(userId, id, transaction);
      });

      return result;
    } catch (error) {
      throw error;
    }
  };
  getFollower = async (userId: number) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await friendModel.getFollower(userId, transaction);
      });

      return result;
    } catch (error) {
      throw error;
    }
  };
}
