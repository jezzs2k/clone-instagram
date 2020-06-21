import { Request, Response } from 'express';

import { CommonError } from './../common/error';
import { success, error as err } from '../utils/response';

export class DemoController {
  demo = async (req: Request, res: Response) => {
    try {
      //code here
      res.jsonp(success('data'));
    } catch (error) {
      console.error(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
}
