import { getConnection } from 'typeorm';

import { UserModel } from '../model/User.model';
import { UpdateUser } from '../types/types';

const userModel = new UserModel();

export class UserService {
  updateUser = async (data: UpdateUser, userId: number) => {
    try {
      let user;
      await getConnection().transaction(async (transactionUser) => {
        user = await userModel.updateUser(data, userId, transactionUser);
      });
      return user;
    } catch (error) {
      throw error;
    }
  };

  getUser = async (userId: number, page: number) => {
    let result;
    await getConnection().transaction(async (transactionUser) => {
      result = await userModel.getUser(userId, page, transactionUser);
    });
    return result;
  };
}
