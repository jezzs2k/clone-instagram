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
}
