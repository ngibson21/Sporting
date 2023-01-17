import React from "react";
import { TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import AppStyles from "../../AppStyles";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function ColorCheckBox(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const { color, index, containerStyle, selectedIndex, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.colorOptionBox,
        containerStyle,
        { backgroundColor: color }
      ]}
    >
      {index === selectedIndex && (
        <Image
          style={styles.selectedColorIcon}
          source={AppStyles.iconSet.simpleCheck}
        />
      )}
    </TouchableOpacity>
  );
}

ColorCheckBox.propTypes = {
  color: PropTypes.string,
  index: PropTypes.number,
  onPress: PropTypes.func,
  selectedIndex: PropTypes.number,
  containerStyle: PropTypes.any
};

export default ColorCheckBox;
