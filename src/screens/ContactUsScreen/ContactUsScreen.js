import React, { Component } from "react";
import { StatusBar } from "react-native";
import { ContactUs } from "../../components";
import AppStyles from "../../AppStyles";

export default class ContactUsScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      title:
        typeof navigation.state.params === "undefined" ||
        typeof navigation.state.params.title === "undefined"
          ? "Contact Us"
          : navigation.state.params.title,
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
      },
      headerTintColor: currentTheme.fontColor
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <ContactUs />;
  }
}
