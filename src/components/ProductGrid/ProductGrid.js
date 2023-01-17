import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import ProductCard from "../ProductCard/ProductCard";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

const { width } = Dimensions.get("window");

function ProductGrid(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const { products, ListFooterComponent, itemContainerStyle } = props;

  const renderItem = ({ item, index }) => (
    <ProductCard
      key={index}
      item={item}
      appConfig={props.appConfig}
      onPress={() => props.onCardPress(item)}
      cardConainerStyle={{ width: 0.41 * width }}
    />
  );

  return (
    <View style={styles.container}>
      <FlatGrid
        items={products}
        extraData={products}
        itemDimension={0.41 * width}
        itemContainerStyle={itemContainerStyle}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
  ListFooterComponent: PropTypes.any,
  itemContainerStyle: PropTypes.object,
  navigation: PropTypes.func,
  onCardPress: PropTypes.func
};

export default ProductGrid;
