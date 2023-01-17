import React, { Component } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PropTypes from "prop-types";
import {
  Header,
  ProcedureImage,
  ShippingDetails,
  HeaderButton
} from "../../components";
import { firebaseDataManager } from "../../apis";
import { setShippingAddress } from "../../redux/";
import AppStyles from "../../AppStyles";

// const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/;

// const regexResult = regexEmail.test(value);
//     if (value.length > 0 && !regexResult) {
//       return true;
//     }
//     if (value.length > 0 && regexResult) {
//       return false;
//     }

class ShippingAddressScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    const { params = {} } = navigation.state;

    return {
      headerTintColor: currentTheme.fontColor,
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0
      },
      headerLeft: (
        <HeaderButton
          onPress={() => {
            navigation.goBack();
          }}
          buttonContainerStyle={{ marginLeft: 10 }}
          title={"Cancel"}
        />
      ),
      headerRight: (
        <HeaderButton
          onPress={params.navigateUser}
          buttonContainerStyle={{ marginRight: 10 }}
          title={"Next"}
        />
      )
    };
  };

  constructor(props) {
    super(props);

    this.shippingAddress = [];
    this.shouldNavigateUser = false;
    this.appConfig =
      props.navigation.state.params.appConfig ||
      props.navigation.getParam("appConfig");
  }

  componentDidMount() {
    this.props.navigation.setParams({
      navigateUser: this.navigateUser
    });
  }

  navigateUser = () => {
    if (this.shouldNavigateUser) {
      this.handleUserNavigation();
    } else {
      Alert.alert(
        "Incomplete Address",
        "Kindly complete your Shipping Address.",
        [
          {
            text: "OK"
          }
        ],
        { cancelable: true }
      );
    }
  };

  handleUserNavigation = async () => {
    const { isNativePaymentMethod, key } = this.props.selectedPaymentMethod;

    const convertedAddress = this.convertAddressToObject(this.shippingAddress);

    this.props.setShippingAddress(convertedAddress);

    await firebaseDataManager.setUserShippingAddress(
      this.props.user.id,
      convertedAddress
    );

    if (isNativePaymentMethod && key === "apple") {
      this.props.navigation.replace("Checkout", { appConfig: this.appConfig });
    } else {
      this.props.navigation.replace("ShippingMethod", {
        appConfig: this.appConfig
      });
    }
  };

  convertAddressToObject = address => {
    const result = {};

    address.forEach(item => {
      result[item.key] = item.value;
    });

    return result;
  };

  convertAddressToArray = address => {
    const result = [];

    Object.keys(address).forEach((key, index) => {
      result.push({ index, key, value: address[key] });
    });

    return result;
  };

  onChangeValue = (changeValues, expectedLength) => {
    if (changeValues.length === expectedLength) {
      this.shippingAddress = changeValues;
      this.shouldNavigateUser = true;
    } else {
      this.shouldNavigateUser = false;
    }
  };

  sortAddress = () => {
    if (
      this.props.shippingAddress &&
      Object.keys(this.props.shippingAddress).length > 0
    ) {
      this.shouldNavigateUser = true;
      this.shippingAddress = this.convertAddressToArray(
        this.props.shippingAddress
      );

      return this.shippingAddress;
    }

    return [];
  };

  render() {
    const address = this.sortAddress();
    const currentTheme =
      AppStyles.navThemeConstants[this.props.screenProps.theme];

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: currentTheme.backgroundColor }}
      >
        <Header title={"Shipping"} />
        <ProcedureImage source={AppStyles.imageSet.box} />
        <ShippingDetails
          shippingAddress={address}
          title={"Shipping Adress"}
          isShippinngAddress={true}
          onChangeValue={this.onChangeValue}
        />
      </KeyboardAwareScrollView>
    );
  }
}

ShippingAddressScreen.propTypes = {
  selectedPaymentMethod: PropTypes.object,
  shippingAddress: PropTypes.array,
  user: PropTypes.object,
  navigation: PropTypes.object,
  setShippingAddress: PropTypes.func
};

const mapStateToProps = ({ checkout, app }) => {
  return {
    selectedPaymentMethod: checkout.selectedPaymentMethod,
    shippingAddress: app.user.shippingAddress,
    user: app.user
  };
};

export default connect(mapStateToProps, { setShippingAddress })(
  ShippingAddressScreen
);
