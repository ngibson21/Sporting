import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Order } from "../../components";
import { firebaseDataManager } from "../../apis";
import {
  loadOrderHistory,
  setSubtotalPrice,
  setSelectedShippingMethod,
  setSelectedPaymentMethod,
  setCurrentOrderId
} from "../../redux/";

class OrdersScreen extends Component {
  constructor(props) {
    super(props);
    this.appConfig =
      props.navigation.state.params.appConfig ||
      props.navigation.getParam("appConfig");
  }

  componentDidMount() {
    this.unsubscribeOrders = firebaseDataManager.ordersRef
      .where("user_id", "==", this.props.user.id)
      .onSnapshot(querySnapshot => {
        firebaseDataManager.onOrdersUpdate(querySnapshot, this.setOrderHistory);
      });
  }

  componentWillUnmount() {
    this.unsubscribeOrders();
  }

  setOrderHistory = orders => {
    this.props.loadOrderHistory(orders);
  };

  onReOrder = order => {
    const { navigation } = this.props;

    this.props.setSubtotalPrice(order.totalPrice);
    this.props.setSelectedShippingMethod(order.selectedShippingMethod);
    this.props.setSelectedPaymentMethod(order.selectedPaymentMethod);
    this.props.setCurrentOrderId(order.id);

    navigation.navigate("PaymentMethod");
  };

  render() {
    return (
      <Order
        orderHistory={this.props.orderHistory}
        navigation={this.props.navigation}
        onReOrder={this.onReOrder}
        appConfig={this.appConfig}
      />
    );
  }
}

OrdersScreen.propTypes = {
  navigation: PropTypes.object,
  orderHistory: PropTypes.array,
  user: PropTypes.object,
  loadOrderHistory: PropTypes.func,
  setSubtotalPrice: PropTypes.func,
  setSelectedShippingMethod: PropTypes.func,
  setSelectedPaymentMethod: PropTypes.func,
  setCurrentOrderId: PropTypes.func
};

const mapStateToProps = ({ products, app }) => {
  return {
    categories: products.categories,
    allProducts: products.allProducts,
    orderHistory: products.orderHistory,
    user: app.user
  };
};

export default connect(mapStateToProps, {
  loadOrderHistory,
  setSubtotalPrice,
  setSelectedShippingMethod,
  setSelectedPaymentMethod,
  setCurrentOrderId
})(OrdersScreen);
