import { getConnection } from 'typeorm';

import { NotificationModel } from '../model/Notification.model';

const notificationModel = new NotificationModel();
export class NotificationService {
  sendNotification = async (
    senderId: number,
    receiverId: number,
    text: string
  ) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await notificationModel.sendNotification(
          {
            senderId,
            receiverId,
            text,
          },
          transaction
        );
      });

      return result;
    } catch (error) {
      throw error;
    }
  };

  handleReadNotification = async (userId: number) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await notificationModel.handleReadNotification(
          userId,
          transaction
        );
      });

      return result;
    } catch (error) {
      throw error;
    }
  };

  getNotification = async (userId: number, type: string) => {
    try {
      let result;
      await getConnection().transaction(async (transaction) => {
        result = await notificationModel.getNotification(
          userId,
          type,
          transaction
        );
      });
      return result;
    } catch (error) {
      throw error;
    }
  };
}
