import axios from 'axios';

import { FETCH_USER_ERROR, FETCH_USER_SUCCESS, LOADING_USER } from '../types';

export const LoadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:8000/api/users/personal');

    if (res && !res.data.success) {
      dispatch({
        type: FETCH_USER_ERROR,
        payload: { message: res.data.data.message },
      });
      return;
    }

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_ERROR,
      payload: error,
    });
  }
};

export const setUserLoading = () => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });
};
