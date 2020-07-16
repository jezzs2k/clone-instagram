import socketIo from 'socket.io';

import { decodeToken } from './middleware/auth.middleware';
import { addUser, getUser, removeUser } from './socket/userConnect';

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

      socket.on(
        'story-realtime',
        (data: { responseSuccess: boolean; storyId: number }) => {
          if (data.responseSuccess) {
            socket.join('user:' + user.id);
            socket.join('story:' + data.storyId);
            console.log('connect...', user.id);
          }
        }
      );

      //user-like-content - send noti to app of user
      //data: {responseStatus: boolean, , targetId: number, authorOfStoryId: number }
      socket.on(
        'user-like-content',
        async (
          data: {
            responseStatus: boolean;
            targetId: number;
            authorOfStoryId: number;
          },
          callback
        ) => {
          if (data.responseStatus) {
            socket
              .to('story:' + data.targetId)
              .broadcast.emit('user-liked-content', {
                message: `${userId} have liked this ${data.targetId} story`,
                decoded,
                data,
              });
          } else {
            callback('fail');
            socket.emit('user-liked-content', {
              message: 'fail',
            });
          }
        }
      );

      //user-unlike-content - send noti to this story
      //data: {responseStatus: boolean, , targetId: number, authorOfStoryId: number }
      socket.on(
        'user-unlike-content',
        async (
          data: {
            responseStatus: boolean;
            targetId: number;
            authorOfStoryId: number;
          },
          callback
        ) => {
          if (data.responseStatus) {
            socket
              .to('story:' + data.targetId)
              .broadcast.emit('user-unliked-content', {
                message: `${userId} have unlike your content ${data.targetId}`,
                decoded,
                data,
              });
          } else {
            callback('fail');
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
          commentId: number;
          responseState: boolean;
          targetId: number;
          authorOfStoryId: number;
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
        'user-like-comment',
        (data: {
          commentId: number;
          responseState: boolean;
          targetId: number;
          receiverId: number;
        }) => {
          const user = getUser(data.receiverId);

          if (data.responseState && user.id !== userId) {
            socket.to('user:' + user.id).emit('user-liked-comment', {
              message: `${userId} have comment in your article ${data.targetId}`,
              data,
            });
          }
        }
      );

      socket.on(
        'user-like-comment-child',
        (data: {
          responseState: boolean;
          targetId: number;
          receiverId: number;
          commentChildId: number;
        }) => {
          const user = getUser(data.receiverId);
          if (data.responseState && user && user.id !== userId) {
            io.to('user:' + user.id).emit('user-liked-comment-child', {
              message: `${userId} have comment in your article ${data.targetId}`,
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
