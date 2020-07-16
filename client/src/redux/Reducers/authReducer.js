import {
  LOADING_AUTH,
  LOGIN,
  REGISTER,
  LOGIN_ERROR,
  REGISTER_ERROR,
  AUTHENTICATED,
  LOGOUT,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loadingAuth: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('token', action.payload.data);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.data,
        loadingAuth: false,
        error: null,
      };

    case LOGIN_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        error: action.payload,
        loadingAuth: false,
        isAuthenticated: null,
        token: null,
      };

    case REGISTER:
      return {
        ...state,
      };

    case REGISTER_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        error: action.payload,
        loadingAuth: false,
        isAuthenticated: null,
        token: null,
      };

    case AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        loadingAuth: false,
      };

    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        error: null,
        loadingAuth: false,
        isAuthenticated: null,
        token: null,
      };
    case LOADING_AUTH:
      return {
        ...state,
        loadingAuth: true,
      };
    default:
      return { ...state };
  }
};
