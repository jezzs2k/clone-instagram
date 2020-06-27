import AuthRoute from './Auth.route';
import UserRoute from './User.route';
import ArticleRoute from './Article.route';
import LikeRoute from './Like.route';
import CommentRoute from './Comment.route';

const mergeRoutes = [
  ...AuthRoute,
  ...UserRoute,
  ...ArticleRoute,
  ...LikeRoute,
  ...CommentRoute,
];

export default mergeRoutes;
