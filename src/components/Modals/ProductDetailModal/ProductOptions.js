import React, { useState } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ColorCheckBox from "../../ColorCheckBox/ColorCheckBox";
import SizeCheckBox from "../../SizeCheckBox/SizeCheckBox";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function ProductOptions(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const { optionContainerStyle, item } = props;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const onSizeCheckBoxPress = index => {
    setSelectedSizeIndex(index);
    props.onSizeSelected(index);
  };

  const onColorCheckBoxPress = index => {
    setSelectedColorIndex(index);
    props.onColorSelected(index);
  };

  return (
    <View style={[styles.optionContainer, optionContainerStyle]}>
      <View style={styles.sizeContainer}>
        {item.sizes &&
          item.sizes.map((size, index) => (
            <SizeCheckBox
              containerStyle={styles.checkBox}
              key={index + ""}
              size={size}
              selectedIndex={selectedSizeIndex}
              onPress={() => onSizeCheckBoxPress(index)}
              index={index}
            />
          ))}
      </View>
      <View style={styles.colorContainer}>
        {item.colors &&
          item.colors.map((color, index) => (
            <ColorCheckBox
              containerStyle={styles.checkBox}
              key={index + ""}
              color={color}
              selectedIndex={selectedColorIndex}
              onPress={() => onColorCheckBoxPress(index)}
              index={index}
            />
          ))}
      </View>
    </View>
  );
}

ProductOptions.propTypes = {
  optionContainerStyle: PropTypes.object,
  item: PropTypes.object,
  onSizeSelected: PropTypes.func,
  onColorSelected: PropTypes.func
};

export default ProductOptions;
