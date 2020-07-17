import { checkToken } from './../middleware/auth.middleware';
import { LikeController } from '../controller/Like.controller';

const likeController = new LikeController();

export default [
  {
    method: 'post',
    route: '/api/like/article/:articleId',
    controller: LikeController,
    middleware: [checkToken],
    action: likeController.likeArticle,
  },
  {
    method: 'post',
    route: '/api/like/article/:articleId/parents_comment/:parentsCommentId',
    controller: LikeController,
    middleware: [checkToken],
    action: likeController.likeParentsComment,
  },
  {
    method: 'post',
    route:
      '/api/like/article/:articleId/parents_comment/:parentsCommentId/comment/:commentId',
    controller: LikeController,
    middleware: [checkToken],
    action: likeController.likeChildComment,
  },
  {
    method: 'get',
    route: '/api/like/article/:articleId',
    controller: LikeController,
    middleware: [checkToken],
    action: likeController.getLikeOfStory,
  },
  {
    method: 'get',
    route: '/api/like/comment/:parentsCommentId',
    controller: LikeController,
    middleware: [checkToken],
    action: likeController.getLikeOfParentsComment,
  },
  {
    method: 'get',
    route: '/api/like/comment/:commentId',
    controller: LikeController,
    middleware: [checkToken],
    action: likeController.getLikeOfParentsComment,
  },
];
