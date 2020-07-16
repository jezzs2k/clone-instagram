import io from 'socket.io-client';

let socket;

export const connectServer = () => {
  if (!socket) {
    socket = io.connect('http://localhost:8000', {
      query: {
        'auth-token': localStorage.token,
      },
    });

    socket.on('connect', () => {
      console.log('connected...');
    });

    return socket;
  }
};

export const joinStory = (storyId) => {
  socket.emit('story-realtime', {
    responseSuccess: true,
    storyId,
  });
};

export const userLikeContent = (
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

export const userUnlikeContent = (
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

export const userLikedContent = (callback, storyId) => {
  socket.on('user-liked-content', ({ message, decoded, data }) => {
    if (data.targetId === storyId) {
      console.log(message);
      callback();
    }
  });
};

export const userUnlikedContent = (callback, storyId) => {
  socket.on('user-unliked-content', ({ message, decoded, data }) => {
    if (data.targetId === storyId) {
      console.log(message);
      callback();
    }
  });
};

export const userCommentContent = (storyId, authorOfStoryId) => {
  socket.emit('user-comment-content', {
    targetId: storyId,
    responseState: true,
    authorOfStoryId,
  });
};

export const userCommentedContent = (callback, storyId) => {
  socket.on('user-commented-content', ({ message, data }) => {
    if (data.targetId === storyId) {
      console.log(message);
      callback();
    }
  });
};

export const userReplyComment = (
  commentId,
  receiverId,
  authorOfStoryId,
  storyId
) => {
  socket.emit('user-reply-comment', {
    commentId,
    targetId: storyId,
    responseState: true,
    authorOfStoryId,
    receiverId,
  });
};

export const userRepliedComment = (callback, commentId) => {
  socket.on('user-replied-comment', ({ message, data }) => {
    if (data.commentId === commentId) {
      console.log(message);
      callback();
    }
  });
};

export const userLikeComment = (receiverId, storyId, commentId) => {
  socket.emit('user-like-comment', {
    responseState: true,
    targetId: storyId,
    receiverId,
    commentId,
  });
};

export const userLikedComment = (callback, commentId) => {
  socket.on('user-liked-comment', ({ message, data }) => {
    if (data.commentId === commentId) {
      console.log(message);
      callback();
    }
  });
};

export const userLikeCommentChild = (data) => {
  socket.emit('user-like-comment-child', {
    responseState: true,
    targetId: data.storyId,
    receiverId: data.receiverId,
    commentChildId: data.commentChildId,
  });
};

export const userLikedCommentChild = (callback, commentChildId) => {
  socket.on('user-liked-comment-child', ({ message, data }) => {
    if (data.commentChildId === commentChildId) {
      console.log(message);
      callback();
    }
  });
};
