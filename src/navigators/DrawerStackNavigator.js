import React from "react";
import { View, StatusBar } from "react-native";
import { connect } from "react-redux";
import { createDrawerNavigator } from "react-navigation";
import SearchBar from "react-native-search-box";
import { DrawerContainer, MenuButton } from "../components";
import {
  HomeScreen,
  SearchScreen,
  ProfileScreen,
  ChatScreen
} from "../screens";
import styles from "./styles";
import AppStyles from "../AppStyles";
import AppConfig from "../SportinggConfig";

const DrawerNavigator = createDrawerNavigator(
  {
    Chat: ChatScreen,
    Profile: ProfileScreen
  },
  {
    drawerPosition: "left",
    initialRouteName: "Chat",
    initialRouteParams: {
      appStyles: AppStyles,
      appConfig: AppConfig
    },
    drawerWidth: 200,
    contentComponent: DrawerContainer(AppConfig),
    headerMode: "screen",
    navigationOptions: ({ navigation, screenProps }) => {
      const routeIndex = navigation.state.index;
      const currentTheme = AppStyles.navThemeConstants[screenProps.theme];

      return {
        headerStyle: {
          backgroundColor: currentTheme.backgroundColor,
          borderBottomWidth: 0,
          paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
        },
        headerTintColor: currentTheme.fontColor,
        title: getDrawerScreenTitle(navigation.state.routes[routeIndex].key),
        headerLeft: (
          <MenuButton
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerTitle: navigation.state.routes[routeIndex].key == "Search" && (
          <View style={styles.searchBarContainer}>
            <SearchBar
              backgroundColor={"transparent"}
              cancelTitle={"Cancel"}
              onChangeText={text => {
                navigation.dispatch({
                  type: "SEARCH_BY_KEY_TEXT",
                  data: text
                });
              }}
              cancelButtonTextStyle={[
                styles.cancelButtonText,
                {
                  color: currentTheme.mainSubtextColor
                }
              ]}
              inputBorderRadius={9}
              inputStyle={styles.searchInput}
            />
          </View>
        )
      };
    }
  }
);

const getDrawerScreenTitle = routeKey => {
  switch (routeKey) {
    case "Home":
      return "Products";
    case "Chat":
      return "Home";
    case "Search":
      return "Search";
    case "Profile":
      return "Profile";
    default:
      return "Home";
  }
};

export default connect()(DrawerNavigator);
