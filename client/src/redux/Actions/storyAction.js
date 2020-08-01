import axios from 'axios';

import {
  FETCH_STORY_SUCCESS,
  LOADING_STORY,
  FETCH_STORY_ERROR,
  UNLIKE_ERROR,
  SEND_COMMENT_ERROR,
  ANSWER_COMMENT_ERROR,
  DELETE_COMMENT_ERROR,
  POST_STORY,
  POST_ERROR,
} from '../types.js';

import {
  userLikeContent,
  userCommentContent,
  userReplyComment,
  userLikeComment,
  deleteParentsComment,
  deletedComment,
} from '../../socket/socket';

///
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

export const postStory = ({ image, title }) => async (dispatch) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.post(
      'http://localhost:8000/api/articles',
      { image, title },
      config
    );

    if (res.data.success) {
      dispatch({
        type: POST_ERROR,
        payload: res.data,
      });

      return;
    }

    dispatch({
      type: POST_STORY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

export const likeActionContent = (data) => async (dispatch) => {
  try {
    let link = `http://localhost:8000/api/like?articleId=${data.articleId}`;
    let targetId = data.articleId;
    await axios.put(link);

    userLikeContent({
      targetId: targetId,
      articleId: data.articleId,
    });
  } catch (error) {
    dispatch({
      type: UNLIKE_ERROR,
      payload: error,
    });
  }
};

export const likeActionComment = (data) => async (dispatch) => {
  try {
    let link;
    let targetId;

    if (data.parent_CommentId) {
      link = `http://localhost:8000/api/like?articleId=${data.articleId}&parent_Comment_Id=${data.parent_CommentId}`;
      targetId = data.parent_CommentId;
    }
    if (data.commentId) {
      link = `http://localhost:8000/api/like?articleId=${data.articleId}&parent_Comment_Id=${data.parent_CommentId}&commentId=${data.commentId}`;
      targetId = data.commentId;
    }

    await axios.put(link);

    userLikeComment({
      targetId: targetId,
      storyId: data.articleId,
      receiverId: data.receiverId,
    });
  } catch (error) {
    dispatch({
      type: UNLIKE_ERROR,
      payload: error,
    });
  }
};

export const sendComment = (authorOfStoryId, data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      'http://localhost:8000/api/comment',
      data,
      config
    );

    userCommentContent(
      res.data.data.articleId,
      res.data.data.id,
      authorOfStoryId
    );
  } catch (error) {
    dispatch({
      type: SEND_COMMENT_ERROR,
      payload: error,
    });
  }
};

export const replyComment = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      'http://localhost:8000/api/comment',
      data,
      config
    );

    userReplyComment({
      currentCommentId: res.data.data.id,
      parentsCommentId: data.parentId,
      receiverId: data.receiverId,
      targetId: data.articleId,
    });
  } catch (error) {
    dispatch({
      type: ANSWER_COMMENT_ERROR,
      payload: error,
    });
  }
};

export const DeleteParentsComment = ({ parentsCommentId }) => async (
  dispatch
) => {
  try {
    const Url = `http://localhost:8000/api/comment/${parentsCommentId}`;
    const res = await axios.delete(Url);

    deleteParentsComment({
      storyId: res.data.data.articleId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_ERROR,
      payload: error,
    });
  }
};

export const DeleteComment = ({ commentId }) => async (dispatch) => {
  try {
    const Url = `http://localhost:8000/api/comment_to_user/${commentId}`;
    const res = await axios.delete(Url);

    deletedComment({
      storyId: res.data.data.articleId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_ERROR,
      payload: error,
    });
  }
};

export const setLoading = () => async (dispatch) => {
  dispatch({ type: LOADING_STORY });
};
