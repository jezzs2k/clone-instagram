import AuthRoute from './Auth.route';
import UserRoute from './User.route';
import ArticleRoute from './Article.route';
import LikeRoute from './Like.route';
import CommentRoute from './Comment.route';
import FriendRoute from './Friend.route';

const mergeRoutes = [
  ...AuthRoute,
  ...UserRoute,
  ...ArticleRoute,
  ...LikeRoute,
  ...CommentRoute,
  ...FriendRoute,
];

export default mergeRoutes;
