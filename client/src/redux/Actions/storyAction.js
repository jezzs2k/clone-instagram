import axios from 'axios';

import {
  FETCH_STORY_SUCCESS,
  LOADING_STORY,
  FETCH_STORY_ERROR,
  LIKE_ERROR,
  UNLIKE_ERROR,
  SEND_COMMENT_ERROR,
  ANSWER_COMMENT_ERROR,
  LIKE_COMMENT_ERROR,
} from '../types.js';

import {
  userLikeContent,
  userUnlikeContent,
  userCommentContent,
  userReplyComment,
  userLikeComment,
  userLikeCommentChild,
} from '../../socket/socket';

export const fetchStory = ({ pageNumber }) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/articles?p=${pageNumber}`
    );

    dispatch({
      type: FETCH_STORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_STORY_ERROR,
      payload: error,
    });
  }
};

export const likeContent = (storyId, authorOfStoryId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/like/article/${storyId}`
    );

    userLikeContent(
      res.data.data.articleId,
      authorOfStoryId,
      dispatch,
      LIKE_ERROR
    );
  } catch (error) {
    dispatch({
      type: UNLIKE_ERROR,
      payload: error,
    });
  }
};

export const unlikeContent = (storyId, authorOfStoryId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/like/article/${storyId}`
    );

    userUnlikeContent(
      res.data.data.articleId,
      authorOfStoryId,
      dispatch,
      UNLIKE_ERROR
    );
  } catch (error) {
    dispatch({
      type: LIKE_ERROR,
      payload: error,
    });
  }
};

export const sendComment = (storyId, authorOfStoryId, text) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `http://localhost:8000/api/comment/${storyId}?q=1`,
      { text },
      config
    );

    userCommentContent(res.data.data.articleId, authorOfStoryId);
  } catch (error) {
    dispatch({
      type: SEND_COMMENT_ERROR,
      payload: error,
    });
  }
};

export const replyComment = (
  commentId,
  receiverId,
  storyId,
  authorOfStoryId,
  text
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(
      `http://localhost:8000/api/comment_to_user/${commentId}/article/${storyId}/receiver/${receiverId}`,
      { text: text.split(' ').splice(1).join(' ') },
      config
    );

    userReplyComment(
      commentId,
      receiverId,
      authorOfStoryId,
      res.data.data.articleId
    );
  } catch (error) {
    dispatch({
      type: ANSWER_COMMENT_ERROR,
      payload: error,
    });
  }
};

export const LikeComment = (commentId, type, receiverId, storyId) => async (
  dispatch
) => {
  try {
    await axios.post(
      `http://localhost:8000/api/like/comment/${commentId}?type=${type}`
    );

    if (type === 'child') {
      userLikeCommentChild({ receiverId, storyId, commentChildId: commentId });
    } else {
      userLikeComment(receiverId, storyId, commentId);
    }
  } catch (error) {
    dispatch({
      type: LIKE_COMMENT_ERROR,
      payload: error,
    });
  }
};

export const setLoading = () => async (dispatch) => {
  dispatch({ type: LOADING_STORY });
};
