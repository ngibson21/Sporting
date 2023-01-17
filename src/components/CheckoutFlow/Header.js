import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function Header(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const { title, headerContainerStyle, headerStyle } = props;

  return (
    <View style={[styles.headerContainer, headerContainerStyle]}>
      <Text style={[styles.header, headerStyle]}>{title}</Text>
    </View>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  headerContainerStyle: PropTypes.any,
  headerStyle: PropTypes.any
};

export default Header;
