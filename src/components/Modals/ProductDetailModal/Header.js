import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
// import Modal from 'react-native-modal';
import AppStyles from "../../../AppStyles";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function Header(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const { headerContainerStyle, onCancelPress, onSharePress } = props;

  return (
    <View style={[styles.headerContainer, headerContainerStyle]}>
      <TouchableOpacity
        onPress={onCancelPress}
        style={styles.headerIconContainer}
      >
        <Image
          style={styles.headerIcon}
          resizeMode={"contain"}
          source={AppStyles.iconSet.arrowDown}
        />
      </TouchableOpacity>
      <View style={styles.headerIconspace} />
      <TouchableOpacity
        onPress={onSharePress}
        style={[styles.headerIconContainer, styles.headerIconRightContainer]}
      >
        <Image
          style={styles.headerIcon}
          resizeMode={"contain"}
          source={AppStyles.iconSet.share}
        />
      </TouchableOpacity>
    </View>
  );
}

Header.propTypes = {
  headerContainerStyle: PropTypes.object,
  onCancelPress: PropTypes.func,
  onSharePress: PropTypes.func
};

export default Header;
