import io from 'socket.io-client';

let socket;

export const connectServer = () => {
  socket = io.connect('http://localhost:8000', {
    transports: ['websocket'],
    query: {
      'auth-token': localStorage.token,
    },
  });

  socket.on('connect', () => {
    console.log('connected...');
  });

  return socket;
};

export const joinStory = () => {
  connectServer();
  socket.emit('story-realtime', {
    responseSuccess: true,
  });
};

export const emitLikeContent = (
  storyId,
  authorOfStoryId,
  callback,
  typeDispatch
) => {
  socket.emit(
    'user-like-content',
    {
      responseStatus: true,
      targetId: storyId,
      authorOfStoryId,
    },
    (error) => {
      callback({
        type: typeDispatch,
        payload: { message: error },
      });
    }
  );
};

export const emitUnlikeContent = (
  storyId,
  authorOfStoryId,
  callback,
  typeDispatch
) => {
  socket.emit(
    'user-unlike-content',
    {
      targetId: storyId,
      responseStatus: true,
      authorOfStoryId,
      typeDispatch,
    },
    (error) => {
      callback({
        type: typeDispatch,
        payload: { message: error },
      });
    }
  );
};

export const listenEventLikeOfAnotherUser = (callback) => {
  socket.on('user-liked-content', ({ message, decoded, data }) => {
    console.log(message);
    callback();
  });
};

export const listenEventUnlikeOfAnotherUser = (callback) => {
  socket.on('user-unliked-content', ({ message, decoded, data }) => {
    console.log(message);
    callback();
  });
};

export const userCommentContent = (storyId, authorOfStoryId) => {
  socket.emit('user-comment-content', {
    targetId: storyId,
    responseState: true,
    authorOfStoryId,
  });
};

export const userCommentedContent = (callback) => {
  socket.on('user-commented-content', ({ message }) => {
    console.log(message);
    callback();
  });
};
