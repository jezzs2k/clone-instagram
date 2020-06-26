import AuthRoute from './Auth.route';
import UserRoute from './User.route';
import ArticleRoute from './Article.route';
import LikeRoute from './Like.route';

const mergeRoutes = [...AuthRoute, ...UserRoute, ...ArticleRoute, ...LikeRoute];

export default mergeRoutes;
