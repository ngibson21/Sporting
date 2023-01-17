import { StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation";
import {
  WelcomeScreen,
  LoginScreen
} from "../Core/onboarding";
import AppStyles from "../AppStyles";
import AppConfig from "../SportinggConfig";

const AuthStackNavigator = createStackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: { header: null }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: { header: null }
    }
  },
  {
    initialRouteName: "Welcome",
    initialRouteParams: {
      appStyles: AppStyles,
      appConfig: AppConfig
    },
    headerMode: "float",
    headerBackTitleVisible: false,
    cardStyle: { backgroundColor: "#FFFFFF" },
    cardShadowEnabled: false
  }
);

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: "transparent",
    shadowOpacity: 0,
    elevation: 0 // remove shadow on Android
  }
});

export default AuthStackNavigator;
