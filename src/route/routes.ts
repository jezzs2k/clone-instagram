import AuthRoute from './Auth.route';
import UserRoute from './User.route';
import ArticleRoute from './Article.route';
import LikeRoute from './Like.route';
import ParentsCommentRoute from './ParentsComment.route';
import FriendRoute from './Friend.route';
import NotificationRoute from './Notification.route';
import ReplyToCommentRoute from './ReplyToComment.route';

const mergeRoutes = [
  ...AuthRoute,
  ...UserRoute,
  ...ArticleRoute,
  ...LikeRoute,
  ...ParentsCommentRoute,
  ...FriendRoute,
  ...NotificationRoute,
  ...ReplyToCommentRoute,
];

export default mergeRoutes;
