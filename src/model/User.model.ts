import { EntityManager } from 'typeorm';

import { User } from '../entity/User';
import { UpdateUser } from '../types/types';
import { UserError } from '../common/error';

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
}
