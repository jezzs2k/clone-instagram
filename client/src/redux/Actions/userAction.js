import axios from 'axios';

import { FETCH_USER_ERROR, FETCH_USER_SUCCESS, LOADING } from '../types';

export const LoadUser = () => async (dispatch) => {
  try {
    SetLoading();

    const res = await axios.get('http://localhost:8000/api/users/personal');

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

export const SetLoading = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
};
