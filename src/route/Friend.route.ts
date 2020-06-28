import { checkToken } from './../middleware/auth.middleware';
import { FriendController } from '../controller/Friend.controller';

const friendController = new FriendController();

export default [
  {
    method: 'post',
    route: '/api/follower/:receiverId',
    controller: FriendController,
    middleware: [checkToken],
    action: friendController.sendRequest,
  },
  {
    method: 'put',
    route: '/api/follower/unfriend/:id',
    controller: FriendController,
    middleware: [checkToken],
    action: friendController.unFollowFriend,
  },
  {
    method: 'get',
    route: '/api/follower',
    controller: FriendController,
    middleware: [checkToken],
    action: friendController.getFollower,
  },
];
