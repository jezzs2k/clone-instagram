import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

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
        where: { email: data.email, isActive: true },
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

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: `${newUser.email}`,
        from: 'vuthanhhieu00@gmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<p>Welcome ${newUser.fullName}!</p> 
        <p>Thanks for signing up with fake instagram!</p>
        <p>You must follow this link to activate your account:</p>
        <a href='http://localhost:8000/api/auth/active/${newUser.id}'>http://localhost:8000/api/auth/active/${newUser.id}</a>
        <p>Have fun coding, and don't hesitate to contact us with your feedback.</p>`,
      };

      http: sgMail.send(msg);

      http: return msg;
    } catch (error) {
      throw error;
    }
  };

  activeAccount = async (transactionUser: EntityManager, userId: number) => {
    try {
      const user = await transactionUser.getRepository(User).findOne({
        where: { id: userId, isActive: false },
        cache: true,
      });

      if (!user) {
        throw UserError.USER_NOT_FOUND;
      }

      user.isActive = true;
      await transactionUser.save(user);

      return user;
    } catch (error) {
      throw error;
    }
  };
}
