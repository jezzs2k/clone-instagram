import { checkToken } from './../middleware/auth.middleware';
import { LikeController } from '../controller/Like.controller';

const likeController = new LikeController();

export default [
  {
    method: 'put',
    route: '/api/like',
    controller: LikeController,
    middleware: [checkToken],
    action: likeController.likeContent,
  },
  {
    method: 'get',
    route: '/api/like',
    controller: LikeController,
    middleware: [checkToken],
    action: likeController.getLikes,
  },
];
