import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View, ActivityIndicator } from "react-native";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import NewArrivals from "./NewArrivals";
import dynamicStyles from "./styles";
import AppStyles from "../../AppStyles";

function Home(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const {
    navigation,
    newArrivals,
    appConfig
  } = props;

  if (!newArrivals.length) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          color={AppStyles.colorSet.mainThemeForegroundColor}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <NewArrivals
        title={"Subscriptions"}
        dataSource={newArrivals}
        onCardPress={props.onCardPress}
        navigation={navigation}
        appConfig={appConfig}
      />
    </ScrollView>
  );
}

Home.propTypes = {
  navigation: PropTypes.object,
  newArrivals: PropTypes.array,
  user: PropTypes.object,
  onCardPress: PropTypes.func,
  product: PropTypes.object,
  onModalCancelPress: PropTypes.func,
  isProductDetailVisible: PropTypes.bool
};

export default Home;
