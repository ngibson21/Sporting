import React, { useEffect } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

const LoadScreen = props => {
  const { navigation } = props;

  const appStyles =
    navigation.state.params.appStyles || props.navigation.getParam("appStyles");
  const appConfig =
    navigation.state.params.appConfig || props.navigation.getParam("appConfig");

  useEffect(() => {
    setAppState();
  }, []);

  const setAppState = async () => {
    navigation.navigate("LoginStack", {
      appStyles: appStyles,
      appConfig: appConfig
    });
  };

  return <View />;
};

LoadScreen.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object
};

LoadScreen.navigationOptions = {
  header: null
};

export default LoadScreen;
