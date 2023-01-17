import React, { Component } from "react";
import { Alert, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ShoppingBag } from "../../components";
import { updatePricesByQty } from "../../utils/updatePricesByQty";
import AppStyles from "../../AppStyles";
import {
  setProductPricesBYQty,
  setTotalShoppingBagPrice,
  removeFromShoppingBag,
  removeProductPricesBYQty,
  updateShoppingBag,
  setSubtotalPrice
} from "../../redux/";

class ShoppingBagScreen extends Component {
  static navigationOptions = ({ screenProps }) => {
    const currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      title: "Shopping Bag",
      headerTintColor: currentTheme.fontColor,
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
      }
    };
  };

  constructor(props) {
    super(props);
    this.appConfig =
      props.navigation.state.params.appConfig ||
      props.navigation.getParam("appConfig");
  }

  componentDidMount() {
    this.props.setTotalShoppingBagPrice();
  }

  onQtyChange = (totalPriceObj, product) => {
    updatePricesByQty(
      totalPriceObj,
      this.props.productPricesByQty,
      pricesByQty => {
        this.props.setProductPricesBYQty(pricesByQty);
        this.props.setTotalShoppingBagPrice();

        product.quantity = totalPriceObj.qty;

        this.props.updateShoppingBag(product);
      }
    );
  };

  onLongPress = item => {
    Alert.alert(
      "Remove from cart",
      "This product will be removed from cart.",
      [
        {
          text: "Remove",
          onPress: () => this.removeFromShoppingBag(item),
          style: "destructive"
        },
        {
          text: "Cancel"
        }
      ],
      { cancelable: true }
    );
  };

  removeFromShoppingBag = item => {
    this.props.removeProductPricesBYQty(item.shoppingBagId);
    this.props.removeFromShoppingBag(item);
    this.props.setTotalShoppingBagPrice();
  };

  onColorSelected = ({ item, index }) => {
    item.selectedColorIndex = index;

    this.props.updateShoppingBag(item);
  };

  onSizeSelected = ({ item, index }) => {
    item.selectedSizeIndex = index;
    this.props.updateShoppingBag(item);
  };

  onContinuePress = async () => {
    this.props.setSubtotalPrice(Number(this.props.totalShoppinBagPrice));

    this.props.shoppingBag.length &&
      this.props.navigation.navigate("PaymentMethod", {
        appConfig: this.appConfig
      });
  };

  render() {
    return (
      <ShoppingBag
        shoppingBag={this.props.shoppingBag}
        productPricesByQty={this.props.productPricesByQty}
        totalShoppinBagPrice={this.props.totalShoppinBagPrice}
        removeFromShoppingBag={this.removeFromShoppingBag}
        onContinuePress={this.onContinuePress}
        onColorSelected={this.onColorSelected}
        onSizeSelected={this.onSizeSelected}
        onQtyChange={this.onQtyChange}
        onLongPress={this.onLongPress}
        appConfig={this.appConfig}
      />
    );
  }
}

ShoppingBagScreen.propTypes = {
  navigation: PropTypes.object,
  shoppingBag: PropTypes.array,
  productPricesByQty: PropTypes.array,
  totalShoppinBagPrice: PropTypes.number,
  setProductPricesBYQty: PropTypes.func,
  setTotalShoppingBagPrice: PropTypes.func,
  removeFromShoppingBag: PropTypes.func,
  removeProductPricesBYQty: PropTypes.func,
  updateShoppingBag: PropTypes.func,
  setSubtotalPrice: PropTypes.func
};

const mapStateToProps = ({ products }) => {
  return {
    shoppingBag: products.shoppingBag,
    productPricesByQty: products.productPricesByQty,
    totalShoppinBagPrice: products.totalShoppinBagPrice
  };
};

export default connect(mapStateToProps, {
  setProductPricesBYQty,
  setTotalShoppingBagPrice,
  removeFromShoppingBag,
  removeProductPricesBYQty,
  updateShoppingBag,
  setSubtotalPrice
})(ShoppingBagScreen);
