import socketIo from 'socket.io';

import { decodeToken } from './middleware/auth.middleware';

import { addUser, getUser, removeUser } from './socket/userConnect';

let io;

export default {
  getSocket(server) {
    if (!io) {
      io = socketIo(server, {
        transports: ['websocket'],
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

      socket.on('story-realtime', (responseSuccess) => {
        socket.join('user:' + user.id);

        console.log('connect...', user.id);
      });

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
          const authorOfStoryId = data.authorOfStoryId;
          const { user } = getUser(authorOfStoryId);

          if (data.responseStatus) {
            if (user) {
              io.to('user:' + user.id).emit('user-liked-content', {
                message: `${userId} have liked this ${data.targetId} story`,
                decoded,
                data,
              });
            }

            io.emit('user-liked-content', {
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
      socket.on('user-unlike-content', async (data, callback) => {
        const { user } = getUser(data.authorOfStoryId);

        if (data.responseStatus) {
          if (user) {
            io.to('user:' + user.id).emit('user-unliked-content', {
              message: `${userId} have unlike your content ${data.targetId}`,
              decoded,
              data,
            });
          }

          io.emit('user-unliked-content', {
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
      });

      //user-comment-content - send noti to this story
      //data: {responseState: boolean, targetId: number}
      socket.on('user-comment-content', (data) => {
        const { user } = getUser(data.authorOfStoryId);

        if (data.responseState) {
          if (user) {
            io.to('user:' + user.id).emit('user-commented-content', {
              message: `${userId} is writing comment your article ${data.targetId}`,
            });
          }

          io.emit('user-commented-content', {
            message: `${userId} is writing comment your article ${data.targetId}`,
          });
        }
      });

      socket.on('disconnect', () => {
        socket.leave('user:' + user.id);
        removeUser(userId);
        console.log('Client disconnected');
      });
    });

    return io;
  },
};
