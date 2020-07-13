import { FETCH_USER_ERROR, FETCH_USER_SUCCESS, LOADING_USER } from '../types';

const initialState = {
  infoUser: null,
  loadingUser: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        infoUser: action.payload.data,
        error: null,
      };

    case FETCH_USER_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        loadingUser: false,
        error: action.data,
        infoUser: null,
      };

    case LOADING_USER:
      return {
        ...state,
        loadingUser: true,
      };

    default:
      return {
        ...state,
      };
  }
};
