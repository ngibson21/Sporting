import PropTypes from "prop-types";
import React from "react";
import { FlatList, View } from "react-native";
import CategoryCard from "../CategoryCard/CategoryCard";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function Shop(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const { extraData, categories, appConfig } = props;

  const onCategoryPress = item => {
    props.navigation.navigate("CategoryProductGrid", {
      title: item.name,
      categoryId: item.id,
      appConfig
    });
  };

  const renderItem = ({ item, index }) => (
    <CategoryCard
      onCategoryPress={() => onCategoryPress(item)}
      imageContainerStyle={styles.categoryImageContainerStyle}
      key={index}
      item={item}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        extraData={extraData}
        renderItem={renderItem}
        itemContainerStyle={{ alignItems: "center" }}
        style={{ alignSelf: "center" }}
      />
    </View>
  );
}

Shop.propTypes = {
  navigation: PropTypes.object,
  extraData: PropTypes.object,
  categories: PropTypes.array
};

export default Shop;
