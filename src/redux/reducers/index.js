import { combineReducers } from "redux";
import { createNavigationReducer } from "react-navigation-redux-helpers";
import { app } from "./app";
import { auth } from "../../Core/onboarding/redux/auth";
import { RootNavigator } from "../../navigators/RootNavigator";
import deviceStorage from "../../Core/onboarding/utils/AuthDeviceStorage";

const navReducer = createNavigationReducer(RootNavigator);

// combine reducers to build the state
const appReducer = combineReducers({
  auth,
  app,
  nav: navReducer
});

export default appReducer;
