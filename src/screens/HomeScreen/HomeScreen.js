import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuidv4";
import { Home } from "../../components";
import {
  firebaseDataManager,
  wooCommerceDataManager,
  shopifyDataManager
} from "../../apis";
import { updatePricesByQty } from "../../utils/updatePricesByQty";
import {
  setUserData,
  setCategories,
  setWishlist,
  setShippingAddress,
  setShoppingBag,
  setProductPricesBYQty,
  setProducts
} from "../../redux/";
import AppConfig from "../../SportinggConfig";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldUpdate: false,
      isProductDetailVisible: false,
      product: {}
    };
    this.appConfig =
      props.navigation.state.params.appConfig ||
      props.navigation.getParam("appConfig");
  }

  async componentDidMount() {
    this.loadFromDatabase();
    this.setWishlistState();
    this.setShippingAddress();
  }

  componentDidUpdate() {
    if (this.state.shouldUpdate === false && this.props.allProducts.length) {
      this.setState({
        shouldUpdate: true
      });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribeProducts && this.unsubscribeCategories) {
      this.unsubscribeFirebaseData();
    }
  }

  loadFromDatabase = () => {
    switch (AppConfig.API_TO_USE.toLowerCase()) {
      case AppConfig.APIs.wooCommerce.toLowerCase():
        this.loadFromWooCommerce();
        break;
      case AppConfig.APIs.shopify.toLowerCase():
        this.loadFromShopify();
        break;
      case AppConfig.APIs.firebase.toLowerCase():
        this.subscribeFirebaseData();
        break;
      default:
        this.subscribeFirebaseData();
    }
  };

  getFirbaseUserData = async () => {
    const data = await firebaseDataManager.getUserData(this.props.user.id);

    return data;
  };

  getWooCommerceUserData = async () => {
    const userResponse = await wooCommerceDataManager.getCustomer({
      email: this.props.user.email
    });
    const user = userResponse.response[0];
    const authUser = {
      id: user.id,
      email: this.props.user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      photoURI: user.avatar_url,
      shipping: { ...user.shipping },
      billing: { ...user.billing },
      phone: user.billing.phone
    };

    return { data: { ...authUser }, success: true };
  };

  updateUserData = async updatedUser => {
    if (updatedUser.success) {
      await this.props.setUserData({
        user: updatedUser.data,
        stripeCustomer: this.props.stripeCustomer
      });
    }
  };

  subscribeFirebaseData = async () => {
    const data = await this.getFirbaseUserData();
    this.updateUserData(data);
    this.unsubscribeProducts = firebaseDataManager.subscribeProducts(
      this.loadProducts
    );
    this.unsubscribeCategories = firebaseDataManager.subscribeCategories(
      this.loadCategories
    );
  };

  loadFromShopify = async () => {
    const products = await shopifyDataManager.loadProducts();
    const categories = await shopifyDataManager.loadCategories();

    if (products.success) {
      this.loadProducts(products.response);
    }

    if (categories.success) {
      this.loadCategories(categories.response);
    }
  };

  loadFromWooCommerce = async () => {
    const data = await this.getWooCommerceUserData();
    this.updateUserData(data);

    const products = await wooCommerceDataManager.fetchMoreProducts();

    const categories = await wooCommerceDataManager.fetchCategories();

    if (products.success) {
      this.loadProducts(products.response);
    }

    if (categories.success) {
      this.loadCategories(categories.response);
    }
  };

  unsubscribeFirebaseData = () => {
    this.unsubscribeProducts();
    this.unsubscribeCategories();
  };

  setWishlistState = () => {
    if (this.props.user.wishlist) {
      this.props.user.wishlist.map(wishlist => {
        this.props.setWishlist(wishlist);
      });
    }
  };

  setShippingAddress = () => {
    if (this.props.user.shippinAddress) {
      this.props.setShippingAddress(this.props.user.shippinAddress);
    }
  };

  onCardPress = item => {
    this.setState({
      product: item,
      isProductDetailVisible: !this.state.isProductDetailVisible
    });
  };

  onCategoryPress = item => {
    this.props.navigation.navigate("CategoryProductGrid", {
      title: item.name,
      categoryId: item.id,
      products: item.products,
      appConfig: this.appConfig
    });
  };

  onFavouritePress = async item => {
    item.isFavourite = !item.isFavourite;
    this.setState({ product: item });

    this.props.setWishlist(item);

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

  loadProducts = products => {
    this.props.setProducts(products);
  };

  loadCategories = categories => {
    this.props.setCategories(categories);
  };

  render() {
    return (
      <Home
        categories={this.props.categories}
        newArrivals={this.props.allProducts}
        featured={this.props.allProducts}
        bestSellers={this.props.allProducts}
        navigation={this.props.navigation}
        shippingMethods={this.props.shippingMethods}
        onCardPress={this.onCardPress}
        onFavouritePress={this.onFavouritePress}
        onCategoryPress={this.onCategoryPress}
        onAddToBag={this.onAddToBag}
        product={this.state.product}
        isProductDetailVisible={this.state.isProductDetailVisible}
        onModalCancelPress={this.onModalCancel}
        appConfig={this.appConfig}
      />
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object,
  categories: PropTypes.array,
  allProducts: PropTypes.array,
  shippingMethods: PropTypes.array,
  user: PropTypes.object,
  stripeCustomer: PropTypes.string,
  productPricesByQty: PropTypes.array,
  wishlist: PropTypes.array,
  setUserData: PropTypes.func,
  setCategories: PropTypes.func,
  setWishlist: PropTypes.func,
  setShippingAddress: PropTypes.func,
  setProducts: PropTypes.func,
  setShoppingBag: PropTypes.func,
  setProductPricesBYQty: PropTypes.func
};

const mapStateToProps = ({ products, checkout, app }) => {
  return {
    categories: products.categories,
    allProducts: products.allProducts,
    shippingMethods: checkout.shippingMethods,
    user: app.user,
    stripeCustomer: app.stripeCustomer,
    productPricesByQty: products.productPricesByQty,
    wishlist: products.wishlist
  };
};

export default connect(mapStateToProps, {
  setUserData,
  setCategories,
  setWishlist,
  setShippingAddress,
  setProducts,
  setShoppingBag,
  setProductPricesBYQty
})(HomeScreen);
