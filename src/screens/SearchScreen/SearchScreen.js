import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from "uuidv4";
import { Search } from "../../components";
import { firebaseDataManager } from "../../apis";
import { updatePricesByQty } from "../../utils/updatePricesByQty";
import {
  setWishlist,
  setShoppingBag,
  setProductPricesBYQty
} from "../../redux/";

class SearchScreen extends Component {
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

  onModalCancel = () => {
    this.setState({
      isProductDetailVisible: !this.state.isProductDetailVisible
    });
  };

  render() {
    return (
      <Search
        products={this.props.searchResultProducts}
        shippingMethods={this.props.shippingMethods}
        onModalCancel={this.onModalCancel}
        onAddToBag={this.onAddToBag}
        onCardPress={this.onCardPress}
        onFavouritePress={this.onFavouritePress}
        product={this.state.product}
        isProductDetailVisible={this.state.isProductDetailVisible}
        appConfig={this.appConfig}
      />
    );
  }
}

SearchScreen.propTypes = {
  navigation: PropTypes.object,
  searchResultProducts: PropTypes.array,
  shippingMethods: PropTypes.array,
  productPricesByQty: PropTypes.array,
  wishlist: PropTypes.array,
  user: PropTypes.object,
  setWishlist: PropTypes.func,
  setProductPricesBYQty: PropTypes.func,
  setShoppingBag: PropTypes.func
};

const mapStateToProps = ({ products, checkout, app }) => {
  return {
    searchResultProducts: products.searchResultProducts,
    shippingMethods: checkout.shippingMethods,
    productPricesByQty: products.productPricesByQty,
    user: app.user,
    stripeCustomer: app.stripeCustomer,
    wishlist: products.wishlist
  };
};

export default connect(mapStateToProps, {
  setWishlist,
  setProductPricesBYQty,
  setShoppingBag
})(SearchScreen);
