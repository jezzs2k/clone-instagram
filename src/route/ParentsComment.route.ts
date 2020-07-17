import { checkToken } from '../middleware/auth.middleware';
import { ParentsCommentController } from '../controller/ParentsComment.controller';

const parentsCommentController = new ParentsCommentController();

export default [
  {
    method: 'post',
    route: '/api/comment/:articleId',
    controller: ParentsCommentController,
    middleware: [checkToken],
    action: parentsCommentController.sendComment,
  },
  {
    method: 'delete',
    route: '/api/comment/:commentId',
    controller: ParentsCommentController,
    middleware: [checkToken],
    action: parentsCommentController.deleteComment,
  },
  {
    method: 'get',
    route: '/api/comment/:articleId',
    controller: ParentsCommentController,
    middleware: [checkToken],
    action: parentsCommentController.getCommentOfArticle,
  },
];
