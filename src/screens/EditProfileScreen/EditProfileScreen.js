import React, { Component } from "react";
import { StatusBar } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditProfile, HeaderButton } from "../../components";
import { firebaseDataManager, wooCommerceDataManager } from "../../apis";
import AppStyles from "../../AppStyles";
import { setUserData } from "../../redux/";
import AppConfig from "../../SportinggConfig";

class EditProfileScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      title:
        typeof navigation.state.params === "undefined" ||
          typeof navigation.state.params.title === "undefined"
          ? "Edit Profile"
          : navigation.state.params.title,
      headerTintColor: currentTheme.fontColor,
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
      },
      headerRight: (
        <HeaderButton
          onPress={navigation.state.params.onDonePress}
          buttonContainerStyle={{ marginRight: 10 }}
          title={"Done"}
        />
      ),
      headerLeft: (
        <HeaderButton
          onPress={() => {
            navigation.goBack();
          }}
          buttonContainerStyle={{ marginLeft: 10 }}
          title={"Cancel"}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
  }

  componentDidMount () {
    this.props.navigation.setParams({
      onDonePress: this.onDonePress
    });
  }

  onUpdateFirebaseUser = () => {
    const user = { ...this.props.user, ...this.state.userData };

    firebaseDataManager.setUserProfile(this.props.user.id, this.state.userData);

    this.props.setUserData({
      user,
      stripeCustomer: this.props.stripeCustomer
    });

    this.props.navigation.goBack();
  };

  onUpdateWooCommerceUser = async () => {
    const { firstName, lastName, phone } = this.state.userData;
    const data = {
      first_name: firstName,
      last_name: lastName,
      billing: {
        first_name: firstName,
        last_name: lastName,
        phone: phone
      },
      shipping: {
        first_name: firstName,
        last_name: lastName
      }
    };
    const user = { ...this.props.user, ...this.state.userData };

    await wooCommerceDataManager.updateCustomer(this.props.user.id, data);

    this.props.setUserData({
      user,
      stripeCustomer: this.props.stripeCustomer
    });

    this.props.navigation.goBack();
  };

  onDonePress = () => {
    switch (AppConfig.API_TO_USE.toLowerCase()) {
      case AppConfig.APIs.wooCommerce.toLowerCase():
        this.onUpdateWooCommerceUser();
        break;
      case AppConfig.APIs.firebase.toLowerCase():
        this.onUpdateFirebaseUser();
        break;
      default:
        this.onUpdateFirebaseUser();
    }
  };

  onProfileDataChange = userData => {
    this.setState({ userData });
  };

  render () {
    return (
      <EditProfile
        user={this.props.user}
        onProfileDataChange={this.onProfileDataChange}
      />
    );
  }
}

EditProfileScreen.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object,
  setUserData: PropTypes.func,
  stripeCustomer: PropTypes.string,
  streamUser: PropTypes.object
};

const mapStateToProps = ({ app }) => {
  return {
    user: app.user,
    stripeCustomer: app.stripeCustomer,
    streamUser: app.user.streamUser
  };
};

export default connect(mapStateToProps, { setUserData })(EditProfileScreen);
