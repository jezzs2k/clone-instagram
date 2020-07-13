import { EntityManager } from 'typeorm';

import { User } from '../entity/User';
import { Friend } from '../entity/Friend';
import { UpdateUser } from '../types/types';
import { UserError } from '../common/error';
import * as _ from 'lodash';

export class UserModel {
  updateUser = async (
    data: UpdateUser,
    userId: number,
    transactionUser: EntityManager
  ) => {
    try {
      const user = await transactionUser.findOne(User, {
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw UserError.USER_NOT_FOUND;
      }

      if (data.age) user.age = data.age;
      if (data.avatar) user.avatar = data.avatar;
      if (data.fullName) user.fullName = data.fullName;
      if (data.gender) user.gender = data.gender;
      if (data.nickname) user.nickname = data.nickname;

      await transactionUser.save(user);

      return user;
    } catch (error) {
      throw error;
    }
  };

  getUser = async (
    userId: number,
    page: number,
    transactionUser: EntityManager
  ) => {
    try {
      const perPage = 15;
      let start = perPage * (page - 1);
      let end = page * perPage;

      const users = await transactionUser.getRepository(User).find({
        relations: ['friendsReceiver'],
        cache: true,
      });

      const notFriend = users.filter((user) => {
        if (user.id === userId) {
          return false;
        }
        return _.find(user.friendsReceiver, { senderId: userId })
          ? false
          : true;
      });

      return _.slice(notFriend, start, end);
    } catch (error) {
      throw error;
    }
  };

  getUserById = async (userId: number, transactionUser: EntityManager) => {
    try {
      const user = await transactionUser.getRepository(User).findOne({
        where: { id: userId },
        relations: ['articles'],
        cache: true,
      });

      return user;
    } catch (error) {
      throw error;
    }
  };
}
