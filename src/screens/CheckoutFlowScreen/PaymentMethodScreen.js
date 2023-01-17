import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PropTypes from "prop-types";
import stripe from "tipsi-stripe";
import {
  Header,
  ProcedureImage,
  PaymentOptions,
  HeaderButton
} from "../../components";
import { firebaseDataManager, stripeDataManager } from "../../apis";
import { updatePaymentMethods, setShippingMethods } from "../../redux";
import AppStyles from "../../AppStyles";

const options = {
  requiredBillingAddressFields: "full",
  prefilledInformation: {
    billingAddress: {
      name: "Marya Ken",
      line1: "Canary Place",
      line2: "3",
      city: "Macon",
      state: "Georgia",
      country: "US",
      postalCode: "31217"
    }
  }
};

class PaymentMethodScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      headerTintColor: currentTheme.fontColor,
      cardStyle: {
        backgroundColor: currentTheme.backgroundColor
      },
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
          onPress={() => {
            navigation.replace("ShippingAddress", {
              appConfig: navigation.state.params.appConfig
            });
          }}
          buttonContainerStyle={{ marginRight: 10 }}
          title={"Next"}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      cardNumberValue: ""
    };
  }

  componentDidMount() {
    this.unsubscribePaymentMethods = firebaseDataManager.subscribePaymentMethods(
      this.props.user.id,
      this.setPaymentMethods
    );
    this.unsubscribeShippingMethods = firebaseDataManager.subscribeShippingMethods(
      this.setShippingMethods
    );
  }

  componentWillUnmount() {
    this.unsubscribePaymentMethods();
    this.unsubscribeShippingMethods();
  }

  setPaymentMethods = methods => {
    this.props.updatePaymentMethods(methods);
  };

  setShippingMethods = async methods => {
    if (methods.length > 1) {
      this.props.setShippingMethods(methods);
    }
  };

  onAddNewCard = async () => {
    const { user } = this.props;

    if (this.props.paymentMethods.length > 4) {
      Alert.alert(
        "Card Limit Exceeded",
        "Kindly delete a card to add a new payment method.",
        [
          {
            text: "Cancel"
          }
        ],
        { cancelable: true }
      );
    } else {
      try {
        const token = await stripe.paymentRequestWithCardForm(options);

        if (token) {
          const source = await stripeDataManager.addNewPaymentSource(
            this.props.stripeCustomer,
            token.tokenId
          );

          if (source.data.response) {
            await firebaseDataManager.updateUserPaymentMethods({
              ownerId: user.id,
              card: token.card
            });
            await firebaseDataManager.savePaymentSource(
              this.props.user.id,
              source.data.response
            );
          }
        }
      } catch (err) {
        console.log(err);
        // alert("an error occured while trying to add card, please try again.");
        alert(err);
      }
    }
  };

  onPaymentMethodLongPress = method => {
    Alert.alert(
      "Remove card",
      "This card will be removed from payment methods.",
      [
        {
          text: "Remove",
          onPress: () => this.removeFromPaymentMethods(method),
          style: "destructive"
        },
        {
          text: "Cancel"
        }
      ],
      { cancelable: true }
    );
  };

  removeFromPaymentMethods = async method => {
    try {
      const result = await stripeDataManager.deletePaymentSource(
        this.props.stripeCustomer,
        method.cardId
      );

      if (result.data.response.deleted) {
        await firebaseDataManager.deleteFromUserPaymentMethods(method.cardId);
      }
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const currentTheme =
      AppStyles.navThemeConstants[this.props.screenProps.theme];

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: currentTheme.backgroundColor }}
      >
        <Header title={"Payment Method"} />
        <ProcedureImage source={AppStyles.imageSet.creditCard} />
        <PaymentOptions
          onPaymentMethodLongPress={this.onPaymentMethodLongPress}
          onAddNewCard={this.onAddNewCard}
          navigation={this.props.navigation}
          cardNumbersEnding={this.props.cardNumbersEnding}
          paymentMethods={this.props.paymentMethods}
        />
      </KeyboardAwareScrollView>
    );
  }
}

PaymentMethodScreen.propTypes = {
  cardNumbersEnding: PropTypes.array,
  navigation: PropTypes.object,
  paymentMethods: PropTypes.array,
  user: PropTypes.object,
  stripeCustomer: PropTypes.string,
  setShippingMethods: PropTypes.func,
  updatePaymentMethods: PropTypes.func
};

const mapStateToProps = ({ checkout, app }) => {
  return {
    totalPrice: checkout.totalPrice,
    shippingMethod: checkout.shippingMethod,
    cardNumbersEnding: checkout.cardNumbersEnding,
    paymentMethods: checkout.paymentMethods,
    user: app.user,
    stripeCustomer: app.stripeCustomer
  };
};

export default connect(mapStateToProps, {
  setShippingMethods,
  updatePaymentMethods
})(PaymentMethodScreen);
