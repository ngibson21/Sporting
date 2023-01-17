import React, { Component } from "react";
import { View, Alert, Platform, StatusBar } from "react-native";
import { connect } from "react-redux";
import uuid from "uuidv4";
import stripe from "tipsi-stripe";
import Loading from "react-native-loader-overlay";
import {
  firebaseDataManager,
  stripeDataManager,
  wooCommerceDataManager
} from "../../apis";
import PropTypes from "prop-types";
import { Header, CheckOutDetails, FooterButton } from "../../components";
import Order from "../../models/Order";
import { setOrderHistory } from "../../redux/";
import AppStyles from "../../AppStyles";
import AppConfig from "../../SportinggConfig";

class CheckoutScreen extends Component {
  static navigationOptions = ({ screenProps }) => {
    const currentTheme = AppStyles.navThemeConstants[screenProps.theme];

    return {
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
    this.state = {
      isNativePayPossible: false
    };
    this.appConfig =
      props.navigation.state.params.appConfig ||
      props.navigation.getParam("appConfig");
  }

  async componentDidMount () {
    const isDeviceSupported = await stripe.deviceSupportsNativePay();

    if (isDeviceSupported) {
      this.setState({
        isNativePayPossible: true
      });
    }
  }

  onFooterPress = async () => {
    this.loading = Loading.show(AppStyles.loadingModal);
    const { selectedPaymentMethod, shippingMethods } = this.props;
    const items = [
      {
        label: "Shopertino, Inc",
        amount: `${this.props.totalPrice}`
      }
    ];
    const options = {
      requiredBillingAddressFields: ["all"],
      billing_address_required: true,
      total_price: `${this.props.totalPrice}`,
      currency_code: "USD",
      shipping_countries: ["US", "CA"], //android
      line_items: [
        {
          currency_code: "USD",
          description: "Pay Shopertino, Inc",
          unit_price: `${this.props.totalPrice}`,
          total_price: `${this.props.totalPrice}`,
          // total_price: "0.1",
          // unit_price: `0.1`,
          quantity: "1"
        }
      ],
      shippingMethods
    };

    if (selectedPaymentMethod.isNativePaymentMethod) {
      this.handleNativePaymentMethod(items, options);
    } else {
      this.handleNonNativePaymentMethod();
    }
  };

  handleNativePaymentMethod = async (items, options) => {
    try {
      const token = await stripe.paymentRequestWithNativePay(options, items);

      console.log("native pay", token);

      await this.createOrder(token.tokenId);
      stripe.completeNativePayRequest();
    } catch (error) {
      Loading.hide(this.loading);
      alert(error);
      stripe.cancelNativePayRequest();
    }
  };

  handleNonNativePaymentMethod = async () => {
    const source = this.props.selectedPaymentMethod.cardId;

    this.createOrder(source);
  };

  createOrder = async source => {
    const {
      totalPrice,
      selectedShippingMethod,
      selectedPaymentMethod,
      shoppingBag,
      user
    } = this.props;

    const line_items = this.getWooCommerceLineItems(shoppingBag);

    const order = {
      id: uuid(),
      createdAt: new Date(),
      shopertino_products:
        shoppingBag.length > 0
          ? [...shoppingBag]
          : this.getProductsFromOrderHistory(),
      totalPrice,
      status: "Order Placed",
      user: user,
      selectedShippingMethod,
      selectedPaymentMethod,
      shippingAddress: user.shippingAddress,
      user_id: user.id
    };

    const wooCommerceOrder = {
      payment_method: selectedPaymentMethod.brand,
      payment_method_title: selectedPaymentMethod.title,
      set_paid: false,
      status: "pending",
      shipping: {
        first_name: user.shippingAddress.name,
        last_name: user.shippingAddress.name,
        address_1: user.shippingAddress.apt,
        address_2: user.shippingAddress.address,
        city: user.shippingAddress.city,
        state: user.shippingAddress.state,
        postcode: user.shippingAddress.zipCode,
        country: "US"
      },
      line_items,
      shipping_lines: [
        {
          method_id: selectedShippingMethod.id,
          method_title: selectedShippingMethod.label,
          total: selectedShippingMethod.amount
        }
      ],
      totalPrice
    };

    switch (AppConfig.API_TO_USE.toLowerCase()) {
      case AppConfig.APIs.wooCommerce.toLowerCase():
        this.chargeWooCommerceOrder(wooCommerceOrder, totalPrice, source);
        break;
      // case APIs.shopify.toLowerCase():
      //
      //   break;
      case AppConfig.APIs.firebase.toLowerCase():
        this.chargeFirebaseOrder(order, totalPrice, source);
        break;
      default:
        this.chargeFirebaseOrder(order, totalPrice, source);
    }
  };

  getWooCommerceLineItems = products => {
    return products.map(product => {
      return {
        product_id: product.id,
        quantity: product.quantity ? product.quantity : 1
      };
    });
  };

  chargeWooCommerceOrder = async (order, totalPrice, source) => {
    const { selectedShippingMethod } = this.props;

    try {
      const orderCopy = {
        ...order,
        total: order.totalPrice - selectedShippingMethod.amount
      };

      const wooOrderPending = await wooCommerceDataManager.placeOrder(
        orderCopy
      );

      if (wooOrderPending.response.id && wooOrderPending.success) {
        const charge = await this.chargeCustomer(source, totalPrice);

        if (charge.success) {
          const wooOrderCompleted = await wooCommerceDataManager.updateOrder(
            wooOrderPending.response.id,
            {
              status: "completed",
              set_paid: true
            }
          );

          this.alertOrderPLaced(
            orderCopy,
            charge.data.response,
            wooOrderCompleted.response
          );
        }

        if (!charge.success) {
          Loading.hide(this.loading);
          alert(charge.error);
        }
      }

      if (!wooOrderPending.response.id || !wooOrderPending.success) {
        Loading.hide(this.loading);

        alert(wooOrderPending.error);
      }
    } catch (error) {
      Loading.hide(this.loading);
      alert(error);
    }
  };

  chargeFirebaseOrder = async (order, totalPrice, source) => {
    const { selectedShippingMethod } = this.props;

    try {
      const orderCopy = {
        ...order,
        totalPrice: order.totalPrice - selectedShippingMethod.amount
      };

      const charge = await this.chargeCustomer(source, totalPrice);

      console.log(charge, "charge");

      if (charge.success) {
        this.alertOrderPLaced(orderCopy, charge.data.response);
      } else {
        Loading.hide(this.loading);
        alert(charge.response.data);
      }
    } catch (error) {
      Loading.hide(this.loading);
      alert(error);
    }
  };

  chargeCustomer = async (source, totalPrice) => {
    const charge = await stripeDataManager.chargeStripeCustomer({
      customer: this.props.stripeCustomer,
      amount: Math.round(Number(totalPrice) * 100),
      currency: "usd",
      source,
      uuid
    });

    return charge;
  };

  alertOrderPLaced = (order, charge, response) => {
    Alert.alert(
      "Success",
      "Congratulations! Your order has been placed successfully.",
      [
        {
          text: "OK",
          onPress: () => this.handleOrderPlaced(order, charge, response)
        }
      ],
      { cancelable: true }
    );
  };

  handleOrderPlaced = async (order, charge, response) => {
    switch (AppConfig.API_TO_USE.toLowerCase()) {
      case AppConfig.APIs.wooCommerce.toLowerCase():
        this.handleWooCommerceOrder(response, charge);
        break;
      // case APIs.shopify.toLowerCase():
      //
      //   break;
      case AppConfig.APIs.firebase.toLowerCase():
        this.handleFirebaseOrder(order, charge);
        break;
      default:
        this.handleFirebaseOrder(order, charge);
    }
  };

  handleFirebaseOrder = async (order, charge) => {
    const { user, shoppingBag } = this.props;

    const modeledOrder = new Order(
      order.createdAt,
      order.id,
      order.status,
      order.totalPrice,
      shoppingBag.length > 0
        ? [...shoppingBag]
        : this.getProductsFromOrderHistory(),
      user,
      order.selectedShippingMethod,
      order.selectedPaymentMethod,
      user.shippingAddress,
      user.id
    );

    await firebaseDataManager.savePaymentCharge(user.id, charge);
    await firebaseDataManager.updateOrders(modeledOrder);
    await this.props.setOrderHistory(modeledOrder);
    Loading.hide(this.loading);
    this.props.navigation.navigate("Order");
  };

  handleWooCommerceOrder = async (response, charge) => {
    // const responseCopy = { ...response };

    // const products = await this.getWooProducts(responseCopy.line_items);

    const {
      selectedShippingMethod,
      selectedPaymentMethod,
      user,
      shoppingBag
    } = this.props;

    const modeledOrder = new Order(
      new Date(),
      response.id,
      response.status,
      response.total,
      shoppingBag.length > 0
        ? [...shoppingBag]
        : this.getProductsFromOrderHistory(),
      user,
      selectedShippingMethod,
      selectedPaymentMethod,
      user.shippingAddress,
      user.id
    );

    await this.props.setOrderHistory(modeledOrder);
    await firebaseDataManager.savePaymentCharge(user.id, charge);
    await firebaseDataManager.updateOrders(modeledOrder);
    Loading.hide(this.loading);
    this.props.navigation.navigate("Order");
  };

  // getWooProducts = async lineItems => {
  //   return await Promise.all(
  //     lineItems.map(async item => {
  //       const result = await wooCommerceDataManager.getProductById(
  //         item.product_id
  //       );

  //       return await { ...result.response };
  //     })
  //   );
  // };

  getProductsFromOrderHistory = () => {
    const order = this.props.orderHistory.find(product => {
      return product.id === this.props.currentOrderId;
    });

    return order.products;
  };

  render () {
    const currentTheme =
      AppStyles.navThemeConstants[this.props.screenProps.theme];
    const { selectedPaymentMethod } = this.props;
    const canNativePay =
      selectedPaymentMethod.isNativePaymentMethod &&
      this.state.isNativePayPossible;
    const footerButtonTitle = canNativePay
      ? "Place Order"
      : "Can't accept payment method";

    return (
      <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
        <Header
          headerContainerStyle={{ borderBottomWidth: 0 }}
          headerStyle={{ fontFamily: AppStyles.fontFamily.boldFont }}
          title={"Check out"}
        />
        <CheckOutDetails
          appConfig={this.appConfig}
          totalPrice={this.props.totalPrice}
          selectedShippingMethod={this.props.selectedShippingMethod}
          title={"Shipping Adress"}
          cardNumbersEnding={this.props.cardNumbersEnding}
          isShippinngAddress={true}
          selectedPaymentMethod={this.props.selectedPaymentMethod}
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <FooterButton
            disabled={
              selectedPaymentMethod.isNativePaymentMethod
                ? !canNativePay
                : false
            }
            footerContainerStyle={{
              backgroundColor: AppStyles.colorSet.mainThemeForegroundColor
            }}
            footerTitleStyle={{ color: "white" }}
            onPress={this.onFooterPress}
            title={
              selectedPaymentMethod.isNativePaymentMethod
                ? footerButtonTitle
                : "Place Order"
            }
          />
        </View>
      </View>
    );
  }
}

CheckoutScreen.propTypes = {
  totalPrice: PropTypes.any,
  orderHistory: PropTypes.array,
  cardNumbersEnding: PropTypes.array,
  currentOrderId: PropTypes.string,
  selectedShippingMethod: PropTypes.object,
  selectedPaymentMethod: PropTypes.object,
  shoppingBag: PropTypes.array,
  navigation: PropTypes.object,
  shippingMethods: PropTypes.array,
  stripeCustomer: PropTypes.string,
  user: PropTypes.object,
  setOrderHistory: PropTypes.func
};

const mapStateToProps = ({ checkout, products, app }) => {
  return {
    totalPrice: checkout.totalPrice,
    selectedShippingMethod: checkout.selectedShippingMethod,
    shippingMethods: checkout.shippingMethods,
    cardNumbersEnding: checkout.cardNumbersEnding,
    selectedPaymentMethod: checkout.selectedPaymentMethod,
    currentOrderId: checkout.currentOrderId,
    shoppingBag: products.shoppingBag,
    orderHistory: products.orderHistory,
    stripeCustomer: app.stripeCustomer,
    user: app.user
  };
};

export default connect(mapStateToProps, { setOrderHistory })(CheckoutScreen);
