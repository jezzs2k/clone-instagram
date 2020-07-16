import { Request, Response } from 'express';

import { success, error as err } from '../utils/response';
import { AuthService } from '../service/Auth.service';
import { CommonError } from '../common/error';
import { JoiUser } from '../joiSchema/JoiUser';

const authService = new AuthService();
const joiUser = new JoiUser();

export class AuthController {
  login = async (req: Request, res: Response) => {
    try {
      const { error, value } = joiUser.loginValidate().validate(req.body);

      if (error) {
        console.log(error.message);
        return res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
      }

      const result = await authService.login(req.body);

      res.jsonp(success(result));
    } catch (error) {
      console.error(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
  register = async (req: Request, res: Response) => {
    try {
      const { error, value } = joiUser.registerValidate().validate(req.body);

      if (error) {
        console.log(error.message);
        return res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
      }

      const result = await authService.register(req.body);

      res.jsonp(success(result));
    } catch (error) {
      console.error(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
  checkToken = async (req: Request, res: Response) => {
    try {
      res.jsonp(success('Token Right'));
    } catch (error) {
      console.error(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
}
