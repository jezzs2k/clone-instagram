import {
  FETCH_STORY_ERROR,
  FETCH_STORY_SUCCESS,
  LOADING_STORY,
  LIKE_ERROR,
  UNLIKE_ERROR,
} from '../types.js';

const initialState = {
  stories: [],
  loadingStory: null,
  hasMore: null,
  storyError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORY_SUCCESS:
      return {
        ...state,
        stories: [...state.stories, ...action.payload.data],
        storyError: null,
        hasMore: action.payload.data.length > 0,
        loadingStory: false,
      };

    case FETCH_STORY_ERROR:
      return {
        ...state,
        stories: [],
        storyError: action.payload.error,
        hasMore: null,
        loading: false,
      };

    case LIKE_ERROR:
      return {
        ...state,
        storyError: action.payload.message,
      };

    case UNLIKE_ERROR:
      return {
        ...state,
        storyError: action.payload.message,
      };

    case LOADING_STORY:
      return {
        ...state,
        loadingStory: true,
      };

    default:
      return { ...state };
  }
};
