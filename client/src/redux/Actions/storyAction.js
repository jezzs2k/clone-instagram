import axios from 'axios';

import {
  FETCH_STORY_SUCCESS,
  LOADING_STORY,
  FETCH_STORY_ERROR,
  LIKE_ERROR,
  UNLIKE_ERROR,
} from '../types.js';

import {
  emitLikeContent,
  emitUnlikeContent,
  userCommentContent,
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

    emitLikeContent(
      res.data.data.articleId,
      authorOfStoryId,
      dispatch,
      LIKE_ERROR
    );
  } catch (error) {}
};

export const unlikeContent = (storyId, authorOfStoryId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/like/article/${storyId}`
    );

    emitUnlikeContent(
      res.data.data.articleId,
      authorOfStoryId,
      dispatch,
      UNLIKE_ERROR
    );
  } catch (error) {}
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
  } catch (error) {}
};

export const setLoading = () => async (dispatch) => {
  dispatch({ type: LOADING_STORY });
};
