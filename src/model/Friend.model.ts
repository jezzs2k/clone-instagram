import { EntityManager } from 'typeorm';

import { Friend } from '../entity/Friend';

export class FriendModel {
  sendRequest = async (
    senderId: number,
    receiverId: number,
    transaction: EntityManager
  ) => {
    try {
      const friend = await transaction.getRepository(Friend).findOne({
        where: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
        cache: true,
      });

      if (!friend) {
        const newFriend = await transaction
          .getRepository(Friend)
          .save({ senderId, receiverId });
        return newFriend;
      }

      if (friend.isFollow) {
        friend.isFollowAgain = true;
      } else {
        friend.isFollow = true;
      }

      await transaction.getRepository(Friend).save(friend);
      return friend;
    } catch (error) {
      throw error;
    }
  };

  unFollowFriend = async (
    userId: number,
    id: number,
    transaction: EntityManager
  ) => {
    try {
      const friend = await transaction
        .getRepository(Friend)
        .findOne({ where: { id }, cache: true });

      if (friend.senderId === userId) friend.isFollow = false;
      if (friend.receiverId === userId) friend.isFollowAgain = false;

      await transaction.getRepository(Friend).save(friend);
      return friend;
    } catch (error) {
      throw error;
    }
  };

  //lấy những người đang theo dõi mình có thể isFollow = true và isFollowAgain true or false
  getFollower = async (userId: number, transaction: EntityManager) => {
    try {
      const followers = await transaction.getRepository(Friend).find({
        where: [
          {
            receiverId: userId,
          },
          {
            senderId: userId,
          },
        ],
        relations: ['sender', 'receiver'],
        cache: true,
      });

      //nếu isFollowAgain === true //show đã là bạn bè
      //nếu isFollowAgain === false //show Theo dõi lại

      return followers;
    } catch (error) {
      throw error;
    }
  };
}
