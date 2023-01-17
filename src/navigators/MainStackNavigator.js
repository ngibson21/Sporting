import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator";
import {
  SettingsScreen,
  ContactUsScreen,
  EditProfileScreen
} from "../screens";
import DrawerStackNavigator from "./DrawerStackNavigator";
import AppStyles from "../AppStyles";

const MainStackNavigator = createStackNavigator(
  {
    Drawer: { screen: DrawerStackNavigator },
    Settings: { screen: SettingsScreen },
    Contact: { screen: ContactUsScreen },
    EditProfile: { screen: EditProfileScreen }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "float",
    cardStyle: {
      backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor
    },
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        // Disable the transition animation when resetting to the main screen
        if (sceneProps.index === 0 && sceneProps.scenes.length > 2) {
          return null;
        }

        // Otherwise, use the usual animation
        return Platform.OS === "ios"
          ? StackViewStyleInterpolator.forHorizontal(sceneProps)
          : StackViewStyleInterpolator.forFadeFromBottomAndroid(sceneProps);
      }
    })
  }
);

export default MainStackNavigator;
