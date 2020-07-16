import { ReplyToCommentController } from '../controller/ReplyToComment.controller';
import { checkToken } from '../middleware/auth.middleware';

const replyToCommentController = new ReplyToCommentController();

export default [
  {
    method: 'post',
    route:
      '/api/comment_to_user/:commentId/article/:articleId/receiver/:receiverId',
    controller: ReplyToCommentController,
    middleware: [checkToken],
    action: replyToCommentController.sendComment,
  },

  {
    method: 'delete',
    route: '/api/comment_to_user/:commentId',
    controller: ReplyToCommentController,
    middleware: [checkToken],
    action: replyToCommentController.deleteComment,
  },
  {
    method: 'get',
    route: '/api/comment_to_user/:commentArticleId',
    controller: ReplyToCommentController,
    middleware: [checkToken],
    action: replyToCommentController.getComment,
  },
];
