import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, Text } from "react-native";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function FooterButton(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const {
    title,
    onPress,
    disabled,
    footerTitleStyle,
    footerContainerStyle,
    iconSource,
    iconStyle
  } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.footerContainer, footerContainerStyle]}
    >
      {iconSource && <Image style={iconStyle} source={iconSource} />}
      <Text style={[styles.footerTitle, footerTitleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

FooterButton.propTypes = {
  title: PropTypes.string.isRequired,
  footerContainerStyle: PropTypes.object,
  footerTitleStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  iconSource: PropTypes.any,
  onPress: PropTypes.func,
  disabled: PropTypes.bool
};

export default FooterButton;
