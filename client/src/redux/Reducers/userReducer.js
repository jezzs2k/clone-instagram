import { FETCH_USER_ERROR, FETCH_USER_SUCCESS, LOADING } from '../types';

const initialState = {
  user: null,
  loading: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
        error: null,
      };

    case FETCH_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.data,
        user: null,
      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return {
        ...state,
      };
  }
};
