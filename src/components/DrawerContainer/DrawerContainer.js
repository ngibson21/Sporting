import React from "react";
import { View } from "react-native";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import DrawerItem from "../DrawerItem/DrawerItem";
import deviceStorage from "../../utils/deviceStorage";
import AppStyles from "../../AppStyles";
import dynamicStyles from "./styles";

function DrawerContainer (appConfig) {
  return props => {
    const styles = useDynamicStyleSheet(dynamicStyles);
    const { navigation } = props;

    const onLogout = async () => {
      await deviceStorage.removeUserData();
      navigation.navigate("LoginStack");
    };

    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <DrawerItem
            title="HOME"
            source={AppStyles.iconSet.homeDrawer}
            onPress={() => {
              navigation.navigate("Chat", { appConfig });
            }}
          />
          <DrawerItem
            title="PROFILE"
            source={AppStyles.iconSet.profileDrawer}
            onPress={() => {
              navigation.navigate("Profile", { appConfig });
            }}
          />
        </View>
      </View>
    );
  };
}

export default DrawerContainer;
