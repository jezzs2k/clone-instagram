import { ArticleController } from '../controller/Article.controller';
import { checkToken } from '../middleware/auth.middleware';
const articleController = new ArticleController();

export default [
  {
    method: 'post',
    route: '/api/articles',
    controller: ArticleController,
    middleware: [checkToken],
    action: articleController.createArticle,
  },
  {
    method: 'put',
    route: '/api/articles/:articleId',
    controller: ArticleController,
    middleware: [checkToken],
    action: articleController.updateArticle,
  },
  {
    method: 'delete',
    route: '/api/articles/:articleId',
    controller: ArticleController,
    middleware: [checkToken],
    action: articleController.deleteArticle,
  },
  {
    method: 'get',
    route: '/api/articles/',
    controller: ArticleController,
    middleware: [],
    action: articleController.getManyArticle,
  },
  {
    method: 'get',
    route: '/api/articles/user',
    controller: ArticleController,
    middleware: [checkToken],
    action: articleController.getArticleOfUser,
  },
];
