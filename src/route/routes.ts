import AuthRoute from './Auth.route';
import UserRoute from './User.route';
import ArticleRoute from './Article.route';

const mergeRoutes = [...AuthRoute, ...UserRoute, ...ArticleRoute];

export default mergeRoutes;
