import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import SettingsItem from "./SettingsItem";
import dynamicStyles from "./styles";

function Settings (props) {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [isFaceID, setIsFaceID] = useState(false);
  const [shouldTipsUpdate, setShouldTipsUpdate] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body}>
        <View style={styles.labelView}>
          <Text style={styles.label}>SECURITY</Text>
        </View>
        <View style={styles.contentView}>
          <SettingsItem
            title={"Enable Face ID / Touch ID Login"}
            value={isFaceID}
            onValueChange={() => setIsFaceID(!isFaceID)}
          />
        </View>
        <View style={styles.captionView}>
          <Text style={styles.caption}>
            While turned off, you will not be able to login with your password.
          </Text>
        </View>
        <View style={styles.labelView}>
          <Text style={styles.label}>PUSH NOTIFICATIONS</Text>
        </View>
        <View style={styles.contentView}>
          <SettingsItem
            title={"New Tips"}
            value={shouldTipsUpdate}
            onValueChange={() => setShouldTipsUpdate(!shouldTipsUpdate)}
          />
        </View>
        <View style={styles.labelView}>
          <Text style={styles.label}>ACCOUNT</Text>
        </View>
        <View style={styles.contentView}>
          <View style={styles.itemButton}>
            <Text style={[styles.text, { color: "#384c8d" }]}>Support</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

Settings.propTypes = {
  title: PropTypes.string,
  SettingsScreen: PropTypes.array,
  navigation: PropTypes.func,
  extraData: PropTypes.object
};

export default Settings;
