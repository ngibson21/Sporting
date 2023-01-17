import React from "react";
import PropTypes from "prop-types";
import { View, FlatList, Text } from "react-native";
import ProductCard from "../ProductCard/ProductCard";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function Featured(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const renderItem = ({ item, index }) => (
    <ProductCard
      onPress={() => props.onCardPress(item)}
      key={index + ""}
      item={item}
      appConfig={props.appConfig}
    />
  );

  const { featuredProducts, title } = props;

  return (
    <View style={styles.unitContainer}>
      <Text style={styles.unitTitle}>{title}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={featuredProducts}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        extraData={featuredProducts}
        renderItem={renderItem}
      />
    </View>
  );
}

Featured.propTypes = {
  title: PropTypes.string,
  featuredProducts: PropTypes.array,
  navigation: PropTypes.func,
  onCardPress: PropTypes.func
};

export default Featured;
