import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { User } from '../entity/User';

import { UserError } from '../common/error';
import { RegisterData } from './../types/types';

export class AuthModel {
  login = async (
    transactionAuth: EntityManager,
    data: { email: string; password: string }
  ) => {
    try {
      const user = await transactionAuth.getRepository(User).findOne({
        where: { email: data.email },
        cache: true,
      });
      if (!user) {
        throw UserError.USER_NOT_FOUND;
      }

      const match = await bcrypt.compare(data.password, user.password);

      if (!match) {
        throw UserError.LOGIN_WRONG_PASSWORD;
      }

      const payload = {
        userId: user.id,
      };

      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '2h',
      });

      return token;
    } catch (error) {
      throw error;
    }
  };

  register = async (transactionUser: EntityManager, data: RegisterData) => {
    try {
      const user = await transactionUser.getRepository(User).findOne({
        where: { email: data.email },
        cache: true,
      });

      if (user) {
        throw UserError.USER_EXISTING;
      }

      const hashPassword = await bcrypt.hash(data.password, 10);
      const newUser = await transactionUser.getRepository(User).save({
        ...data,
        password: hashPassword,
      });

      const payload = {
        userId: newUser.id,
      };

      const token = await jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '1h',
      });

      return token;
    } catch (error) {
      throw error;
    }
  };
}
