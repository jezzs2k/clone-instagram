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

export const userLikeContent = (data) => {
  socket.emit('user-like-content', {
    responseStatus: true,
    ...data,
  });
};

export const userLikedContent = (callback, targetId) => {
  socket.on('user-liked-content', ({ message, data }) => {
    if (data.targetId === targetId) {
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

export const userCommentContent = (storyId, commentId, authorOfStoryId) => {
  socket.emit('user-comment-content', {
    targetId: storyId,
    responseState: true,
    authorOfStoryId,
    commentId,
  });
};

export const userCommentedContent = (callback, storyId) => {
  socket.on('user-commented-content', ({ message, data }) => {
    if (data.targetId === storyId) {
      console.log(message);
      callback(data.commentId);
    }
  });
};

export const userReplyComment = (data) => {
  socket.emit('user-reply-comment', {
    responseState: true,
    ...data,
  });
};

export const userRepliedComment = (callback, parentsCommentId) => {
  socket.on('user-replied-comment', ({ message, data }) => {
    if (data.parentsCommentId === parentsCommentId) {
      console.log(message);
      callback(data.currentCommentId);
    }
  });
};

export const userLikeComment = (data) => {
  socket.emit('user-like-action-comment', {
    responseState: true,
    ...data,
  });
};

export const userLikedComment = (callback, targetId) => {
  socket.on('user-liked-action-comment', ({ message, data }) => {
    if (data.targetId === targetId) {
      console.log(message);
      callback();
    }
  });
};

export const deleteChildComment = ({ articleId, commentId }) => {
  socket.emit('user-delete-child-comment', {
    targetId: articleId,
    commentId,
    responseState: true,
  });
};

export const deletedChildComment = (callback, commentId) => {
  socket.on('user-deleted-child-comment', ({ message, data }) => {
    if (data.commentId === commentId) {
      console.log(message);
      callback(data.commentId);
    }
  });
};

export const deleteComment = ({ commentId, articleId }) => {
  socket.emit('user-delete-comment', {
    targetId: articleId,
    commentId,
    responseState: true,
  });
};

export const deletedComment = (callback, commentId) => {
  socket.on('user-deleted-comment', ({ message, data }) => {
    if (data.commentId === commentId) {
      console.log(message);
      callback(data.commentId);
    }
  });
};
