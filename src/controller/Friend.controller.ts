import { Request, Response } from 'express';

import { success, error as err } from '../utils/response';
import { CommonError } from '../common/error';
import { FriendService } from '../service/Friend.service';
import { NotificationService } from '../service/Notification.service';

const friendService = new FriendService();
const notificationService = new NotificationService();

export class FriendController {
  sendRequest = async (req: Request, res: Response) => {
    try {
      const result = await friendService.sendRequest(
        req.userId,
        parseInt(req.params.receiverId)
      );

      if (result && result.isFollow && !result.isFollowAgain) {
        await notificationService.sendNotification(
          req.userId,
          parseInt(req.params.receiverId),
          `${result.sender.nickname} đang theo dõi bạn`
        );
      } else if (result && result.isFollowAgain) {
        await notificationService.sendNotification(
          req.userId,
          parseInt(req.params.receiverId),
          `${result.receiver.nickname} đã theo dõi lại bạn`
        );
      }

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  unFollowFriend = async (req: Request, res: Response) => {
    try {
      const result = await friendService.unFollowFriend(
        req.userId,
        parseInt(req.params.id)
      );

      res.jsonp(success(result));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };

  getFollower = async (req: Request, res: Response) => {
    try {
      const result = await friendService.getFollower(req.userId);

      res.jsonp(success(result, result.length));
    } catch (error) {
      console.log(error.message);
      res.jsonp(err(CommonError.UNKNOWN_ERROR));
    }
  };
}
