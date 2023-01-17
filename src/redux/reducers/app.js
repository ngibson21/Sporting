const SET_LOADER = "SET_LOADER";
const SET_MODE = "SET_MODE";
const SET_LANGUAGE = "SET_LANGUAGE";
const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';


export const setLoader = data => ({
  type: SET_LOADER,
  data
});

export const setMode = data => ({
  type: SET_MODE,
  data
});

export const setNotifications = data => ({
  type: SET_NOTIFICATIONS,
  data,
});

export const setLanguage = data => ({
  type: SET_LANGUAGE,
  data
});

const initialState = {
  isLoading: false,
  mode: 'light',
  language: '',
  notifications: []
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        isLoading: action.data
      };
    case SET_MODE:
      return {
        ...state,
        mode: action.data
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.data
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...action.data],
      };
    default:
      return state;
  }
};
