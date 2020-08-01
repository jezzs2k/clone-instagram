import socketIo from 'socket.io';

import { decodeToken } from './middleware/auth.middleware';
import { addUser, addStory, getStory, removeUser } from './socket/userConnect';

let io;

export default {
  getSocket(server) {
    if (!io) {
      io = socketIo(server, {
        transports: ['websocket', 'polling'],
      });
    }

    io.on('connection', async function (socket) {
      let token = socket.handshake.query['auth-token'];

      const { errorToken, decoded } = await decodeToken(token);
      if (errorToken) {
        console.log(errorToken);
        socket.disconnect();
        return;
      }

      const userId = decoded.userId;

      const { error, user } = addUser({ userId });

      socket.join('user:' + user.id);
      console.log('connect...', user.id);

      socket.on(
        'story-realtime',
        (data: { responseSuccess: boolean; storyId: number }) => {
          const storyCurrent = getStory(data.storyId);
          if (data.responseSuccess && storyCurrent === undefined) {
            const { error, story } = addStory({ storyId: data.storyId });
            socket.join('story:' + story.id);
          }
        }
      );

      //user-like-content - send noti to app of user
      //data: {responseStatus: boolean, , targetId: number, authorOfStoryId: number }
      socket.on(
        'user-like-content',
        async (data: {
          responseStatus: boolean;
          articleId: number;
          targetId: number;
        }) => {
          if (data.responseStatus) {
            socket
              .to('story:' + data.articleId)
              .broadcast.emit('user-liked-content', {
                message: `${userId} have liked this ${data.articleId} story`,
                data,
              });
          } else {
            socket.emit('user-liked-content', {
              message: 'fail',
            });
          }
        }
      );

      //user-comment-content - send noti to this story
      //data: {responseState: boolean, targetId: number}
      socket.on(
        'user-comment-content',
        (data: {
          responseState: boolean;
          targetId: number;
          authorOfStoryId: number;
          commentId: number;
        }) => {
          if (data.responseState) {
            io.to('story:' + data.targetId).emit('user-commented-content', {
              message: `${userId} is writing comment your article ${data.targetId}`,
              data,
            });
          }
        }
      );

      socket.on(
        'user-reply-comment',
        (data: {
          currentCommentId: number;
          parentsCommentId: number;
          responseState: boolean;
          targetId: number;
          receiverId: number;
        }) => {
          if (data.responseState) {
            io.to('story:' + data.targetId).emit('user-replied-comment', {
              message: `${userId} have comment in your article ${data.targetId}`,
              data,
            });
          }
        }
      );

      socket.on(
        'user-delete-child-comment',
        (data: {
          responseState: boolean;
          targetId: number;
          commentId: number;
        }) => {
          if (data.responseState) {
            io.to('story:' + data.targetId).emit('user-deleted-child-comment', {
              message: `${userId} deleted comment of article ${data.targetId}`,
              data,
            });
          }
        }
      );

      socket.on(
        'user-delete-comment',
        (data: {
          responseState: boolean;
          targetId: number;
          commentId: number;
        }) => {
          if (data.responseState) {
            io.to('story:' + data.targetId).emit('user-deleted-comment', {
              message: `${userId} deleted comment of article ${data.targetId}`,
              data,
            });
          }
        }
      );

      socket.on('disconnect', () => {
        socket.leave('user:' + user.id);
        removeUser(userId);
        console.log('Client disconnected');
      });
    });

    return io;
  },
};
