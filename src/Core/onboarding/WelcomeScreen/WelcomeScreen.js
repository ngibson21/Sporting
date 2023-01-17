import React, { useState, useEffect } from "react";
import Button from "react-native-button";
import { Text, View, Image } from "react-native";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import TNActivityIndicator from "../../truly-native/TNActivityIndicator";
import { IMLocalized } from "../../localization/IMLocalization";
import dynamicStyles from "./styles";
import { setUserData } from "../redux/auth";
import { connect } from "react-redux";
import authManager from "../utils/authManager";

const WelcomeScreen = props => {
  const [isLoading, setIsLoading] = useState(true);
  const appStyles =
    props.navigation.state.params.appStyles ||
    props.navigation.getParam("appStyles");
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));
  const appConfig =
    props.navigation.state.params.appConfig ||
    props.navigation.getParam("appConfig");

  useEffect(() => {
    tryToLoginFirst();
  }, []);

  const tryToLoginFirst = async () => {
    setIsLoading(true);

    authManager
      .retrievePersistedAuthUser(appConfig)
      .then(response => {
        setIsLoading(false);
        if (response) {
          const user = response.user;
          props.setUserData({
            user: user
          });
          props.navigation.navigate("MainStack", { user: user });
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  if (isLoading == true) {
    return <TNActivityIndicator appStyles={appStyles} />;
  }

  props.navigation.navigate("Login", { appStyles, appConfig });

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.logoImage} source={appStyles.iconSet.logo} />
      </View>
      <Text style={styles.title}>
        {appConfig.onboardingConfig.welcomeTitle}
      </Text>
      <Text style={styles.caption}>
        {appConfig.onboardingConfig.welcomeCaption}
      </Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => {
          props.navigation.navigate("Login", { appStyles, appConfig });
        }}
      >
        {IMLocalized("Log In")}
      </Button>
    </View>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user
  };
};

export default connect(mapStateToProps, {
  setUserData
})(WelcomeScreen);
