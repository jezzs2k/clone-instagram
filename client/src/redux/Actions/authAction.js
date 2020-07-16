import axios from 'axios';

import {
  LOADING_AUTH,
  LOGIN,
  REGISTER,
  LOGIN_ERROR,
  REGISTER_ERROR,
  AUTHENTICATED,
  LOGOUT,
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

    if (res && !res.data.success) {
      dispatch({
        type: LOGIN_ERROR,
        payload: res.data.message,
      });

      return;
    }

    setToken(res.data.data);

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

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const setAuthenticated = (token) => async (dispatch) => {
  axios.defaults.headers.common['auth-token'] = token;
  const res = await axios.get('http://localhost:8000/api/auth/verify');

  if (!res.data.success) {
    dispatch({
      type: REGISTER_ERROR,
      payload: res.data.data,
    });

    return;
  }

  dispatch({
    type: AUTHENTICATED,
    payload: res.data,
  });
};

export const setAuthLoading = () => (dispatch) => {
  dispatch({
    type: LOADING_AUTH,
  });
};
