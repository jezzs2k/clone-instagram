import { CommentToUserController } from '../controller/CommentToUser.controller';
import { checkToken } from '../middleware/auth.middleware';

const commentController = new CommentToUserController();

export default [
  {
    method: 'post',
    route:
      '/api/comment_to_user/:commentId/article/:articleId/receiver/:receiverId',
    controller: CommentToUserController,
    middleware: [checkToken],
    action: commentController.sendComment,
  },

  {
    method: 'delete',
    route: '/api/comment_to_user/:commentId',
    controller: CommentToUserController,
    middleware: [checkToken],
    action: commentController.deleteComment,
  },
  {
    method: 'get',
    route: '/api/comment_to_user/:commentArticleId',
    controller: CommentToUserController,
    middleware: [checkToken],
    action: commentController.getComment,
  },
];
