import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import ProductGrid from "../ProductGrid/ProductGrid";
import FooterButton from "../FooterButton/FooterButton";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function BestSellers(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const {
    bestSellerProducts,
    title,
    extraData,
    onCardPress,
    shouldLimit,
    limit,
    appConfig
  } = props;

  const onFooterPress = () => {
    props.navigation.navigate("CategoryProductGrid", {
      title: "Best Sellers",
      products: bestSellerProducts,
      appConfig
    });
  };

  const renderlistFooter = () => (
    <FooterButton onPress={() => onFooterPress()} title={"Browse all"} />
  );

  const data = [...bestSellerProducts];

  return (
    <View style={styles.unitContainer}>
      <Text style={styles.unitTitle}>{title}</Text>
      <ProductGrid
        products={shouldLimit ? data.splice(0, limit) : data}
        onCardPress={onCardPress}
        extraData={extraData}
        ListFooterComponent={renderlistFooter}
        itemContainerStyle={{ alignItems: "center" }}
        appConfig={appConfig}
      />
    </View>
  );
}

BestSellers.propTypes = {
  title: PropTypes.string,
  bestSellerProducts: PropTypes.array,
  navigation: PropTypes.object,
  extraData: PropTypes.object,
  onCardPress: PropTypes.func,
  shouldLimit: PropTypes.bool,
  limit: PropTypes.number
};

export default BestSellers;
