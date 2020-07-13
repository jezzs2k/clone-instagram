import axios from 'axios';

import {
  LOADING_AUTH,
  LOGIN,
  REGISTER,
  LOGIN_ERROR,
  REGISTER_ERROR,
  AUTHENTICATED,
} from '../types';

import setToken from '../../utils/SetToken';

export const Login = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `http://localhost:8000/api/auth/login`,
      data,
      config
    );

    dispatch({
      type: LOGIN,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error,
    });
  }
};

export const Register = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `http://localhost:8000/api/auth/register`,
      data,
      config
    );

    dispatch({
      type: REGISTER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_ERROR,
      payload: error,
    });
  }
};

export const setAuthenticated = () => async (dispatch) => {
  setToken(localStorage.token);
  dispatch({
    type: AUTHENTICATED,
  });
};

export const setAuthLoading = () => (dispatch) => {
  dispatch({
    type: LOADING_AUTH,
  });
};
