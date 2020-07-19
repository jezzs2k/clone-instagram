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
    'user-dislike-content',
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

export const userDislikedContent = (callback, storyId) => {
  socket.on('user-disliked-content', ({ message, decoded, data }) => {
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

export const userReplyParentsComment = (
  parents_commentId,
  receiverId,
  storyId
) => {
  socket.emit('user-reply-parents-comment', {
    parents_commentId,
    targetId: storyId,
    responseState: true,
    receiverId,
  });
};

export const userRepliedParentsComment = (callback, parents_commentId) => {
  socket.on('user-replied-parents-comment', ({ message, data }) => {
    if (data.parents_commentId === parents_commentId) {
      console.log(message);
      callback();
    }
  });
};

export const userLikeParentsComment = (
  receiverId,
  storyId,
  parents_commentId
) => {
  socket.emit('user-like-parents-comment', {
    responseState: true,
    targetId: storyId,
    receiverId,
    parents_commentId,
  });
};

export const userLikedParentsComment = (callback, parents_commentId) => {
  socket.on('user-liked-parents-comment', ({ message, data }) => {
    if (data.parents_commentId === parents_commentId) {
      console.log(message);
      callback();
    }
  });
};

export const userLikeComment = (data) => {
  socket.emit('user-like-comment', {
    responseState: true,
    targetId: data.storyId,
    receiverId: data.receiverId,
    commentId: data.commentId,
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

export const deleteParentsComment = ({ storyId }) => {
  socket.emit('user-delete-parents-comment', {
    targetId: storyId,
    responseState: true,
  });
};

export const deletedParentsComment = (callback, storyId) => {
  socket.on('user-deleted-parents-comment', ({ message, data }) => {
    if (data.targetId === storyId) {
      console.log(message);
      callback();
    }
  });
};

export const deleteComment = ({ storyId }) => {
  socket.emit('user-delete-comment', {
    targetId: storyId,
    responseState: true,
  });
};

export const deletedComment = (callback, storyId) => {
  socket.on('user-deleted-comment', ({ message, data }) => {
    if (data.targetId === storyId) {
      console.log(message);
      callback();
    }
  });
};
