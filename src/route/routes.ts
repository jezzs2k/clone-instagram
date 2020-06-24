import AuthRoute from './Auth.route';
import UserRoute from './User.route';

const mergeRoutes = [...AuthRoute, ...UserRoute];

export default mergeRoutes;
