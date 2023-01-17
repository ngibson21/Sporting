import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function OrderCard(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const { cardConainerStyle, order } = props;

  const renderProductItem = item => (
    <View style={styles.productContainer}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: item.photo }}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.productDescriptionContainer}>
        <Text style={styles.productDescription}>{item.name}</Text>
      </View>
    </View>
  );

  const renderCardFooter = order => (
    <View style={styles.footerContainer}>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPrice}>{`${props.appConfig.currency}${Number(
          order.totalPrice
        )}`}</Text>
      </View>
      <TouchableOpacity
        onPress={() => props.onReOrder(order)}
        style={styles.actionContainer}
      >
        <Text style={styles.action}>REORDER</Text>
      </TouchableOpacity>
      <View style={styles.blankContainer} />
    </View>
  );

  const options = { month: "short", day: "numeric" };
  const orderedDate = new Date(order.createdAt.seconds * 1000);
  const formattedDate = orderedDate.toLocaleDateString("eng-ENG", options);
  const date = order.createdAt.seconds
    ? formattedDate
    : new Date(order.createdAt).toLocaleDateString("eng-ENG", options);

  return (
    <View style={[styles.OrderCardConainer, cardConainerStyle]}>
      <ImageBackground
        source={{ uri: order.shopertino_products[0].photo }}
        style={styles.imageBackgroundContainer}
        imageStyle={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.orderStatusContainer}>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>{"Order Placed"}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{`Ordered on ${date}`}</Text>
          </View>
        </View>
      </ImageBackground>
      {order.shopertino_products.map((item, index) => (
        <View key={item.id}>
          {renderProductItem(item)}
          {order.shopertino_products.length - 1 == index &&
            renderCardFooter(order)}
        </View>
      ))}
    </View>
  );
}

OrderCard.propTypes = {
  onReOrder: PropTypes.func,
  cardConainerStyle: PropTypes.object,
  order: PropTypes.object
};

export default OrderCard;
