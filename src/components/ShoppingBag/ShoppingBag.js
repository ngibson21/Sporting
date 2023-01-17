import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import ShoppingBagCard from "./ShoppingBagCard";
import FooterButton from "../FooterButton/FooterButton";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function ShoppingBag(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const renderItem = ({ item }) => (
    <ShoppingBagCard
      item={item}
      onColorSelected={index => props.onColorSelected({ item, index })}
      onSizeSelected={index => props.onSizeSelected({ item, index })}
      productPricesByQty={props.productPricesByQty}
      onQtyChange={totalPriceObj => props.onQtyChange(totalPriceObj, item)}
      onLongPress={product => props.onLongPress(product)}
      removeFromShoppingBag={product => props.removeFromShoppingBag(product)}
      appConfig={props.appConfig}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props.shoppingBag}
        keyExtractor={item => item.shoppingBagId.toString()}
        extraData={props.shoppingBag}
        renderItem={renderItem}
        style={{ flex: 1 }}
      />
      <View style={styles.footerContainer}>
        <View style={styles.totalContainer}>
          <View style={styles.totalTitleContainer}>
            <Text style={styles.totalTitle}>{"Total"}</Text>
          </View>
          <View style={styles.titleCostSpace} />
          <View style={styles.totalCostContainer}>
            <Text
              style={styles.totalCost}
            >{`${props.appConfig.currency}${props.totalShoppinBagPrice}`}</Text>
          </View>
        </View>
        <FooterButton
          title={"CONTINUE"}
          onPress={props.onContinuePress}
          footerTitleStyle={styles.footerTitle}
          footerContainerStyle={styles.footerButtonContainer}
        />
      </View>
    </View>
  );
}

ShoppingBag.propTypes = {
  shoppingBag: PropTypes.array,
  productPricesByQty: PropTypes.array,
  totalShoppinBagPrice: PropTypes.number,
  removeFromShoppingBag: PropTypes.func,
  onContinuePress: PropTypes.func,
  onColorSelected: PropTypes.func,
  onSizeSelected: PropTypes.func,
  onQtyChange: PropTypes.func,
  onLongPress: PropTypes.func
};

export default ShoppingBag;
