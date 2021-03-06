import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { error as err } from '../utils/response';
import { CommonError, AuthError } from '../common/error';

interface decodeData {
  userId: number;
}

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('auth-token');

    if (!token) return res.jsonp(err(AuthError.NO_TOKEN));

    const decode = (await verify(
      token,
      process.env.TOKEN_SECRET
    )) as decodeData;

    req.userId = decode.userId;

    next();
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

export const decodeToken = async (token) => {
  if (token === 'undefined') {
    return { errorToken: 'No Token' };
  }
  const decoded = (await verify(token, process.env.TOKEN_SECRET)) as decodeData;

  return { decoded };
};
