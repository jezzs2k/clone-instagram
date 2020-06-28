import { checkToken } from './../middleware/auth.middleware';
import { NotificationController } from '../controller/Notification.controller';

const notificationController = new NotificationController();

export default [
  {
    method: 'get',
    route: '/api/notification',
    controller: NotificationController,
    middleware: [checkToken],
    action: notificationController.getNotification,
  },
  {
    method: 'put',
    route: '/api/notification',
    controller: NotificationController,
    middleware: [checkToken],
    action: notificationController.handleReadNotification,
  },
];
