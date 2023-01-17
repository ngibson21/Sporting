import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firebaseDataManager } from "../../apis";
import uuid from "uuidv4";
import { updatePricesByQty } from "../../utils/updatePricesByQty";
import { Wishlist } from "../../components";
import {
  setWishlist,
  setShoppingBag,
  setProductPricesBYQty
} from "../../redux/";

class WishlistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProductDetailVisible: false,
      product: {}
    };
    this.appConfig =
      props.navigation.state.params.appConfig ||
      props.navigation.getParam("appConfig");
  }

  onAddToBag = item => {
    const uniqueId = uuid();
    const itemCopy = { ...item, shoppingBagId: uniqueId };
    const product = {
      id: uniqueId,
      qty: 1,
      totalPrice: Number(item.price)
    };

    updatePricesByQty(product, this.props.productPricesByQty, pricesByQty => {
      this.props.setShoppingBag(itemCopy);
      this.props.setProductPricesBYQty(pricesByQty);
    });

    this.setState({ isProductDetailVisible: false });
  };

  onCardPress = item => {
    this.setState({
      product: item,
      isProductDetailVisible: !this.state.isProductDetailVisible
    });
  };

  onFavouritePress = async item => {
    item.isFavourite = !item.isFavourite;
    this.setState({ product: item });
    await this.props.setWishlist(item);

    await firebaseDataManager.setUserWishList(
      this.props.user.id,
      this.props.wishlist
    );
  };

  onModalCancel = () => {
    this.setState({
      isProductDetailVisible: !this.state.isProductDetailVisible
    });
  };

  render() {
    return (
      <Wishlist
        data={this.props.wishlist}
        shippingMethods={this.props.shippingMethods}
        onCardPress={this.onCardPress}
        product={this.state.product}
        onAddToBag={this.onAddToBag}
        onModalCancel={this.onModalCancel}
        onFavouritePress={this.onFavouritePress}
        isProductDetailVisible={this.state.isProductDetailVisible}
        appConfig={this.appConfig}
      />
    );
  }
}

WishlistScreen.propTypes = {
  user: PropTypes.object,
  wishlist: PropTypes.array,
  shippingMethods: PropTypes.array,
  productPricesByQty: PropTypes.array,
  setWishlist: PropTypes.func,
  setShoppingBag: PropTypes.func,
  setProductPricesBYQty: PropTypes.func
};

const mapStateToProps = ({ products, app, checkout }) => {
  return {
    user: app.user,
    wishlist: products.wishlist,
    shippingMethods: checkout.shippingMethods,
    productPricesByQty: products.productPricesByQty,
    stripeCustomer: app.stripeCustomer
  };
};

export default connect(mapStateToProps, {
  setShoppingBag,
  setProductPricesBYQty,
  setWishlist
})(WishlistScreen);
