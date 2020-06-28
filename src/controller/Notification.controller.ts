import { Request, Response } from 'express';

import { success, error as err } from './../utils/response';
import { CommonError } from './../common/error';
import { NotificationService } from '../service/Notification.service';

const notificationService = new NotificationService();

export class NotificationController {
  getNotification = async (req: Request, res: Response) => {
    try {
      let type;
      if (req.query.q) type = req.query.q;
      const result = await notificationService.getNotification(
        req.userId,
        type
      );

      res.jsonp(success(result, result.length));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  handleReadNotification = async (req: Request, res: Response) => {
    try {
      const result = await notificationService.handleReadNotification(
        req.userId
      );

      res.jsonp(success(result, result.length));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
}
