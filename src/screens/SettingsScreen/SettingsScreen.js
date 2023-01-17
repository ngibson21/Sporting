import React, { Component } from "react";
import { StatusBar } from "react-native";
// import PropTypes from "prop-types";
import { Settings } from "../../components";
import AppStyles from "../../AppStyles";

export default class SettingsScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      title:
        typeof navigation.state.params === "undefined" ||
        typeof navigation.state.params.title === "undefined"
          ? "Settings"
          : navigation.state.params.title,
      headerTintColor: currentTheme.fontColor,
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
      }
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <Settings />;
  }
}
