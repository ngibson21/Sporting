const UPDATE_USER = "UPDATE_USER";
const LOG_OUT = "LOG_OUT";

export const DUMMY_USER_DATA = {
  id: "123456",
  photoURI:
    "https://images.unsplash.com/photo-1495846770511-520ab58b957d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  firstName: "",
  lastName: "",
  subscriptions: [],
  streamUser: {}
};

export const setUserData = data => ({
  type: UPDATE_USER,
  data
});

export const logout = () => ({
  type: LOG_OUT
});

const initialState = {
  user: DUMMY_USER_DATA
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.data.user,
        stripeCustomer: action.data.stripeCustomer
      };
    default:
      return state;
  }
};
