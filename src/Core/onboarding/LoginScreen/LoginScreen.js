import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";
import Button from "react-native-button";
import { connect } from "react-redux";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TNActivityIndicator from "../../truly-native/TNActivityIndicator";
import { IMLocalized } from "../../localization/IMLocalization";
import dynamicStyles from "./styles";
import { setUserData } from "../redux/auth";
import authManager from "../utils/authManager";
import { localizedErrorMessage } from "../utils/ErrorCode";
const LoginScreen = props => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const appStyles =
    props.navigation.state.params.appStyles ||
    props.navigation.getParam("appStyles");
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));
  const appConfig =
    props.navigation.state.params.appConfig ||
    props.navigation.getParam("appConfig");

  const onPressLogin = () => {
    setLoading(true);


    authManager
      .loginWithEmailAndPassword(email, password, appConfig)
      .then(response => {
        if (response.user) {
          setLoading(false);
          props.setUserData({ user: response.user });
          props.navigation.navigate("MainStack", { user: response.user });
        } else {
          setLoading(false);
          Alert.alert(
            "",
            localizedErrorMessage(response.error),
            [{ text: IMLocalized("OK") }],
            {
              cancelable: false
            }
          );
        }
      })
      .catch(error => {
        setLoading(false);
        console.log("wooResponse >>>>>>" + JSON.stringify(error))
        Alert.alert(
          "",
          localizedErrorMessage(error),
          [{ text: IMLocalized("OK") }],
          {
            cancelable: false
          }
        );
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{ flex: 1, width: "100%" }}>
        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
          onPress={() => props.navigation.goBack()}
        >
          <Image
            style={appStyles.styleSet.backArrowStyle}
            source={appStyles.iconSet.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{IMLocalized("Sign In")}</Text>
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized("E-mail")}
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.InputContainer}
          placeholderTextColor="#aaaaaa"
          //secureTextEntry
          placeholder={IMLocalized("Password")}
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
        />
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => onPressLogin()}
        >
          {IMLocalized("Log In")}
        </Button>

        {loading && <TNActivityIndicator appStyles={appStyles} />}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default connect(null, {
  setUserData
})(LoginScreen);
