import React from "react";
import { TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import AppStyles from "../../AppStyles";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function MenuButton(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <TouchableOpacity
      style={styles.headerButtonContainer}
      onPress={props.onPress}
    >
      <Image
        style={styles.headerButtonImage}
        source={AppStyles.iconSet.menuHamburger}
      />
    </TouchableOpacity>
  );
}

MenuButton.propTypes = {
  onPress: PropTypes.func
};

export default MenuButton;
