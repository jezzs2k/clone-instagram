import { Request, Response } from 'express';

import { success, error as err } from './../utils/response';
import { CommonError } from './../common/error';
import { LikeService } from '../service/Like.service';
import { JoiLike } from '../joiSchema/JoiLike';

const likeService = new LikeService();
const joiLike = new JoiLike();

export class LikeController {
  likeContent = async (req: Request, res: Response) => {
    try {
      const query = req.query;
      const { error, value } = joiLike.LikeValidate().validate(query);

      if (error) {
        console.log(error.message);
        res.jsonp(err(CommonError.INVALID_INPUT_QUERY));
      }

      const result = await likeService.likeContent(value, req.userId);

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  getLikes = async (req: Request, res: Response) => {
    try {
      const query = req.query;
      const { error, value } = joiLike.LikeValidate().validate(query);

      if (error) {
        console.log(error.message);
        res.jsonp(err(CommonError.INVALID_INPUT_QUERY));
      }

      const result = await likeService.getLikes(value);

      res.jsonp(success(result, result.length));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
}
