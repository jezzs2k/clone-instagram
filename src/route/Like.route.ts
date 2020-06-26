import { checkToken } from './../middleware/auth.middleware';
import { LikeController } from '../controller/Like.controller';

const likeController = new LikeController();

export default [
  {
    method: 'post',
    route: '/api/like/article/:id',
    controller: LikeController,
    middleware: [checkToken],
    action: likeController.articleLike,
  },
  {
    method: 'post',
    route: '/api/like/comment/:id',
    controller: LikeController,
    middleware: [checkToken],
    action: likeController.commentLike,
  },
  {
    method: 'get',
    route: '/api/like/article/:id',
    controller: LikeController,
    middleware: [],
    action: likeController.getArticleLikeTotal,
  },
];
