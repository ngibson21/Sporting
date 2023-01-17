import React from "react";
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Share,
  Platform,
  Image
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import stripe from "tipsi-stripe";
import Header from "./Header";
import ProductOptions from "./ProductOptions";
import Favourite from "./Favourite";
import FooterButton from "../../FooterButton/FooterButton";
import AppStyles from "../../../AppStyles";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

function ProductDetailModal(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const { visible, onCancelPress, item, onAddToBag, appConfig } = props;

  const onSizeSelected = index => {
    props.item.selectedSizeIndex = index;
  };

  const onColorSelected = index => {
    props.item.selectedColorIndex = index;
  };

  const onShare = async () => {
    try {
      await Share.share({
        title: "Shopertino Product",
        dialogTitle: `Shopertino Product: ${item.name}`,
        message: item.description,
        url: item.photo
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const onPay = async () => {
    const items = [
      {
        label: "Shopertino, Inc",
        amount: `${props.item.price}`
      }
    ];
    const options = {
      requiredBillingAddressFields: ["all"],
      billing_address_required: true,
      total_price: `${props.item.price}`,
      currency_code: "USD",
      shipping_countries: ["US", "CA"], //android
      line_items: [
        {
          currency_code: "USD",
          description: "Pay Shopertino, Inc",
          unit_price: `${props.item.price}`,
          total_price: `${props.item.price}`,
          quantity: "1"
        }
      ],
      shippingMethods: [...props.shippingMethods]
    };

    try {
      const token = await stripe.paymentRequestWithNativePay(options, items);

      console.log("native pay", token);
      // api.sendTokenToBackend(token)
      // You should complete the operation by calling
      // stripe.completeApplePayRequest()
    } catch (error) {
      stripe.cancelNativePayRequest();
      console.log("native pay error", error);
    }
  };

  return (
    <Modal
      isVisible={visible}
      hideModalContentWhileAnimating={true}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      style={styles.modalStyle}
      backdropOpacity={0.5}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
    >
      <View style={styles.transparentContainer}>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="dark-content" />
        <View style={styles.viewContainer}>
          {item.details && (
            <Swiper
              loop={false}
              activeDot={<View style={styles.activeDot} />}
              containerStyle={styles.swiperContainer}
            >
              {item.details.map((image, index) => (
                <View key={index + ""} style={styles.imageBackgroundContainer}>
                  <Image
                    style={styles.imageBackground}
                    source={{ uri: image }}
                  />
                </View>
              ))}
            </Swiper>
          )}
          <Header
            onCancelPress={onCancelPress}
            headerContainerStyle={styles.headerContainerStyle}
            onSharePress={onShare}
          />
          <ProductOptions
            item={item}
            onSizeSelected={onSizeSelected}
            onColorSelected={onColorSelected}
            optionContainerStyle={styles.optionContainerStyle}
          />
          <Favourite
            onPress={() => props.onFavouritePress(item)}
            isFavourite={item.isFavourite}
            favouriteContainerStyle={styles.favouriteContainerStyle}
          />
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text
              style={styles.price}
            >{`${appConfig.currency}${item.price}`}</Text>
            <View style={styles.borderLine} />
          </View>
          <View style={styles.footerContainer}>
            <FooterButton
              onPress={() => onAddToBag(item)}
              footerContainerStyle={styles.addToBagContainerStyle}
              footerTitleStyle={{
                color: "white",
                fontFamily: AppStyles.fontFamily.regularFont
              }}
              title={"ADD TO BAG"}
            />
            <View style={styles.buttonSpace} />
            <FooterButton
              onPress={onPay}
              footerContainerStyle={styles.payContainerStyle}
              footerTitleStyle={{
                color: AppStyles.colorSet.mainTextColor,
                fontFamily: AppStyles.fontFamily.regularFont
              }}
              iconSource={
                Platform.OS === "ios"
                  ? AppStyles.iconSet.appleFilled
                  : AppStyles.imageSet.googlePayColored
              }
              iconStyle={styles.footerIconStyle}
              title={"Pay"}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

ProductDetailModal.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.object,
  visible: PropTypes.bool,
  onCancelPress: PropTypes.func,
  onFavouritePress: PropTypes.func,
  onAddToBag: PropTypes.func,
  shippingMethods: PropTypes.array
};

export default ProductDetailModal;
