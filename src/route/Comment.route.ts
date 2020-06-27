import { checkToken } from './../middleware/auth.middleware';
import { CommentController } from '../controller/Comment.controller';

const commentController = new CommentController();

export default [
  {
    method: 'post',
    route: '/api/comment/:articleId',
    controller: CommentController,
    middleware: [checkToken],
    action: commentController.sendComment,
  },
  {
    method: 'post',
    route: '/api/comment/:articleId/to/:receiverId',
    controller: CommentController,
    middleware: [checkToken],
    action: commentController.sendCommentAnswerTo,
  },
  {
    method: 'delete',
    route: '/api/comment/:commentId',
    controller: CommentController,
    middleware: [checkToken],
    action: commentController.deleteComment,
  },
  {
    method: 'get',
    route: '/api/comment/:articleId',
    controller: CommentController,
    middleware: [checkToken],
    action: commentController.getCommentByArticleId,
  },
];
