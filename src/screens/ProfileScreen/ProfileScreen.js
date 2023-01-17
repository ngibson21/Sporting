import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Profile } from "../../components";
import deviceStorage from "../../utils/deviceStorage";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.appConfig =
      props.navigation.state.params.appConfig ||
      props.navigation.getParam("appConfig");
  }

  onLogout = async () => {
    await deviceStorage.removeUserData();
    this.onItemPress("LoginStack");
  };

  onItemPress = (routeName, title) => {
    this.props.navigation.navigate(routeName, {
      title: title ? title : routeName,
      appConfig: this.appConfig
    });
  };

  render () {
    return (
      <Profile
        user={this.props.user}
        onLogout={this.onLogout}
        onItemPress={this.onItemPress}
        navigation={this.props.navigation}
      />
    );
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = ({ app }) => {
  return {
    user: app.user
  };
};

export default connect(mapStateToProps)(ProfileScreen);
