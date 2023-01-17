import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Alert, Image } from "react-native";
import { connect } from "react-redux";
import CardContent from "./CardContent";
import QuantityControl from "./QuantityControl";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function ShoppingBagCard(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const { item } = props;
  const [itemQty, setItemQty] = useState(1);
  const totalPrice = (item.price * itemQty).toFixed(2);

  useEffect(() => {
    const product = props.productPricesByQty.find(product => {
      return product.id === props.item.shoppingBagId;
    });

    if (product) {
      setItemQty(product.qty);
    }
  }, []);

  useEffect(() => {
    setObjForProps();
    itemQty === 0 && onItemEqualsZero();
  }, [itemQty]);

  const increaseQty = () => {
    setItemQty(itemQty + 1);
  };

  const decreaseQty = () => {
    setItemQty(itemQty === 0 ? itemQty : itemQty - 1);
  };

  const setObjForProps = () => {
    const obj = {
      id: props.item.shoppingBagId,
      qty: itemQty,
      totalPrice: props.item.price * itemQty
    };

    props.onQtyChange(obj);
  };

  const onItemEqualsZero = () => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from the cart?",
      [
        {
          text: "Remove",
          onPress: () => props.removeFromShoppingBag(item),
          style: "destructive"
        },
        {
          text: "Cancel",
          onPress: () => increaseQty()
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      onLongPress={() => props.onLongPress(item)}
      activeOpacity={1}
      style={styles.cardContainer}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.photo }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      </View>
      <CardContent
        price={`${props.appConfig.currency}${totalPrice}`}
        item={item}
        onColorSelected={props.onColorSelected}
        onSizeSelected={props.onSizeSelected}
        contentContainer={styles.contentContainer}
      />
      <QuantityControl
        quantity={itemQty}
        onIncreaseQuantity={() => increaseQty()}
        onDecreaseQuantity={() => decreaseQty()}
        containerStyle={styles.quantityControlContainer}
      />
    </TouchableOpacity>
  );
}

ShoppingBagCard.propTypes = {
  onQtyChange: PropTypes.func,
  item: PropTypes.object,
  productPricesByQty: PropTypes.array,
  onSizeSelected: PropTypes.func,
  onColorSelected: PropTypes.func,
  onLongPress: PropTypes.func,
  removeFromShoppingBag: PropTypes.func
};

export default connect()(ShoppingBagCard);
