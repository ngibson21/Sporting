import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import CarouselView from "../Carousel/CarouselView";
import CarouselProductView from "../Carousel/CarouselProductView";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function NewArrivals(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const { dataSource, title, appConfig } = props;

  const renderItem = ({ index, item }) => (
    <CarouselProductView
      key={index + ""}
      onCardPress={() => props.onCardPress(item)}
      item={item}
      index={index}
      appConfig={appConfig}
    />
  );

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.carouselTitleText}>{title}</Text>
      <CarouselView dataSource={dataSource} renderItem={renderItem} />
    </View>
  );
}

NewArrivals.propTypes = {
  title: PropTypes.string,
  dataSource: PropTypes.array,
  onIndexChange: PropTypes.func,
  onCardPress: PropTypes.func
};

export default NewArrivals;
