import {
  LOADING,
  LOGIN,
  REGISTER,
  LOGIN_ERROR,
  REGISTER_ERROR,
  AUTHENTICATED,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: null,
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
        loading: false,
        error: null,
      };

    case LOGIN_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        error: action.payload,
        loading: false,
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
        loading: false,
        isAuthenticated: null,
        token: null,
      };

    case AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return { ...state };
  }
};
