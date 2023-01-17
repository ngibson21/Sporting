import PropTypes from "prop-types";
import React, { Component } from "react";
import { FlatList, View } from "react-native";
import OrderCard from "../OrderCard/OrderCard";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function Order(props) {
  const { extraData, orderHistory, appConfig } = props;
  const styles = useDynamicStyleSheet(dynamicStyles);

  const renderItem = ({ item, index }) => (
    <OrderCard
      key={index}
      onReOrder={props.onReOrder}
      appConfig={appConfig}
      order={item}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={orderHistory}
        keyExtractor={item => item.id}
        extraData={extraData}
        renderItem={renderItem}
        itemContainerStyle={{ alignItems: "center" }}
        style={{ alignSelf: "center" }}
      />
    </View>
  );
}

Order.propTypes = {
  orderHistory: PropTypes.array,
  extraData: PropTypes.object,
  navigation: PropTypes.object,
  onReOrder: PropTypes.func
};

export default Order;
