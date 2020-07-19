import { getConnection } from 'typeorm';

import { AuthModel } from '../model/Auth.model';
import { RegisterData } from './../types/types';
const authModel = new AuthModel();

export class AuthService {
  login = async (data: { email: string; password: string }) => {
    try {
      let token;
      await getConnection().transaction(async (transactionAuth) => {
        token = await authModel.login(transactionAuth, data);
      });
      return token;
    } catch (error) {
      throw error;
    }
  };

  register = async (data: RegisterData) => {
    try {
      let token;
      await getConnection().transaction(async (transactionAuth) => {
        token = await authModel.register(transactionAuth, data);
      });
      return token;
    } catch (error) {
      throw error;
    }
  };

  activeAccount = async (userId: number) => {
    try {
      let user;
      await getConnection().transaction(async (transactionAuth) => {
        user = await authModel.activeAccount(transactionAuth, userId);
      });

      return user;
    } catch (error) {
      throw error;
    }
  };
}
