import { EntityManager } from 'typeorm';

import { Notification } from '../entity/Notification';
import { success } from '../utils/response';

export class NotificationModel {
  sendNotification = async (
    data: {
      senderId: number;
      receiverId: number;
      text: string;
    },
    transaction: EntityManager
  ) => {
    try {
      const notification = await transaction
        .getRepository(Notification)
        .save(data);

      return notification;
    } catch (error) {
      throw error;
    }
  };

  handleReadNotification = async (
    userId: number,
    transaction: EntityManager
  ) => {
    try {
      const notifications = await transaction
        .getRepository(Notification)
        .find({ where: { receiverId: userId, isRead: false }, cache: true });

      if (notifications.length > 0) {
        notifications.map((notification) => (notification.isRead = true));
      }

      await transaction.getRepository(Notification).save(notifications);

      return notifications;
    } catch (error) {
      throw error;
    }
  };

  getNotification = async (
    userId: number,
    type: string,
    transaction: EntityManager
  ) => {
    try {
      let notifications;
      if (type === 'all') {
        notifications = await transaction.getRepository(Notification).find({
          where: {
            receiverId: userId,
          },

          relations: ['sender', 'receiver'],
          cache: true,
        });
      } else {
        notifications = await transaction.getRepository(Notification).find({
          where: {
            receiverId: userId,
          },
          take: 10,
          relations: ['sender', 'receiver'],
          cache: true,
        });
      }

      return notifications;
    } catch (error) {
      throw error;
    }
  };
}
