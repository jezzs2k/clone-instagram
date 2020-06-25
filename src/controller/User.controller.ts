import { Request, Response } from 'express';

import { CommonError } from '../common/error';
import { success, error as err } from '../utils/response';
import { JoiUser } from '../joiSchema/JoiUser';
import { UserService } from '../service/User.service';

const joiUser = new JoiUser();
const userService = new UserService();

export class UserController {
  updateUser = async (req: Request, res: Response) => {
    try {
      const { error, value } = joiUser.updateValidate().validate(req.body);
      if (error) {
        console.log(error.message);
        return res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
      }

      const result = await userService.updateUser(req.body, req.userId);
      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
}
