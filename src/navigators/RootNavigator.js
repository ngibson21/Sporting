import React from "react";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
import AppStyles from "../AppStyles";
import { LoadScreen } from "../Core/onboarding";
import MainStack from "./MainStackNavigator";
import LoginStack from "./AuthStackNavigator";
import AppConfig from "../SportinggConfig";

export const RootNavigator = createAnimatedSwitchNavigator(
  {
    LoadScreen: LoadScreen,
    LoginStack: LoginStack,
    MainStack: MainStack
  },
  {
    initialRouteName: "LoadScreen",
    initialRouteParams: {
      appStyles: AppStyles,
      appConfig: AppConfig
    },
    cardStyle: {
      backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor
    },
    transition: (
      <Transition.Together>
        <Transition.Out type="fade" durationMs={400} interpolation="easeIn" />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    )
  }
);

export default RootNavigator;
