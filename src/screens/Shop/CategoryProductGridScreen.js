import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StatusBar } from "react-native";
import { connect } from "react-redux";
import uuid from "uuidv4";
import { updatePricesByQty } from "../../utils/updatePricesByQty";
import { ProductGrid, ProductDetailModal } from "../../components";
import { firebaseDataManager } from "../../apis";
import {
  setWishlist,
  setShoppingBag,
  setProductPricesBYQty
} from "../../redux/";
import styles from "./styles";
import AppStyles from "../../AppStyles";

class CategoryProductGridScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      title:
        typeof navigation.state.params === "undefined" ||
        typeof navigation.state.params.title === "undefined"
          ? "Cartegory Grid"
          : navigation.state.params.title,
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
    this.state = {
      isProductDetailVisible: false,
      product: {},
      categoryProducts: []
    };
    this.appConfig =
      props.navigation.state.params.appConfig ||
      props.navigation.getParam("appConfig");
    this.categoryProducts = this.props.navigation.getParam("products");
    this.categoryId = this.props.navigation.getParam("categoryId");
  }

  componentDidMount() {
    if (this.categoryProducts && this.categoryProducts.length) {
      this.setState({ categoryProducts: this.categoryProducts });
    } else {
      this.getCategoryProducts(this.categoryId);
    }
  }

  getCategoryProducts = categoryId => {
    const categoryProducts = this.props.allProducts.filter(product => {
      if (product.categories && typeof product.categories === "object") {
        return product.categories.find(id => {
          return id === categoryId;
        });
      }
    });

    this.setState({ categoryProducts });
  };

  onCardPress = item => {
    this.setState({
      isProductDetailVisible: !this.state.isProductDetailVisible,
      product: item
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

  render() {
    const { extraData } = this.props;

    return (
      <View style={styles.container}>
        <ProductGrid
          products={this.state.categoryProducts}
          onCardPress={this.onCardPress}
          itemContainerStyle={{ alignItems: "center" }}
          extraData={extraData}
          appConfig={this.appConfig}
        />
        <ProductDetailModal
          shippingMethods={this.props.shippingMethods}
          item={this.state.product}
          visible={this.state.isProductDetailVisible}
          onFavouritePress={this.onFavouritePress}
          onAddToBag={this.onAddToBag}
          onCancelPress={() =>
            this.setState({
              isProductDetailVisible: !this.state.isProductDetailVisible
            })
          }
          appConfig={this.appConfig}
        />
      </View>
    );
  }
}

CategoryProductGridScreen.propTypes = {
  title: PropTypes.string,
  CategoryProductGridScreen: PropTypes.array,
  navigation: PropTypes.object,
  extraData: PropTypes.object,
  allProducts: PropTypes.array,
  productPricesByQty: PropTypes.array,
  user: PropTypes.object,
  wishlist: PropTypes.array,
  shippingMethods: PropTypes.array,
  setWishlist: PropTypes.func,
  setShoppingBag: PropTypes.func,
  setProductPricesBYQty: PropTypes.func
};

const mapStateToProps = ({ products, app, checkout }) => {
  return {
    productPricesByQty: products.productPricesByQty,
    allProducts: products.allProducts,
    user: app.user,
    wishlist: products.wishlist,
    shippingMethods: checkout.shippingMethods
  };
};

export default connect(mapStateToProps, {
  setWishlist,
  setShoppingBag,
  setProductPricesBYQty
})(CategoryProductGridScreen);
