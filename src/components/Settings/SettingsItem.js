import React from "react";
import { Switch, Text, View } from "react-native";
import PropTypes from "prop-types";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function SettingsItem(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const { title, value, onValueChange } = props;

  return (
    <View style={styles.itemView}>
      <Text style={styles.text}>{title}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        style={styles.switch}
      />
    </View>
  );
}

SettingsItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.bool,
  onValueChange: PropTypes.func
};

export default SettingsItem;
