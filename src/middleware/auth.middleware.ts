import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { error } from '../utils/response';
import { CommonError, AuthError } from '../common/error';

interface decodeData {
  userId: number;
}

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('auth-token') || '';

  if (!token) return res.jsonp(error(AuthError.NO_TOKEN));
  try {
    const decode = (await verify(
      token,
      process.env.TOKEN_SECRET
    )) as decodeData;

    req.userId = decode.userId;

    next();
  } catch (error) {
    console.log(error.message);
    res.jsonp(error(CommonError.UNKNOWN_ERROR));
  }
};
