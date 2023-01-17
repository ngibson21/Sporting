import React, { useEffect, useState, useRef } from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";
import AppStyles from "../../AppStyles";

let name = {
  id: 1,
  key: "name",
  placeholder: "Name",
  isEditable: true,
  value: "",
  onSelectedValueChange: () => false
};

let email = {
  id: 2,
  key: "email",
  placeholder: "Email",
  isEditable: true,
  value: "",
  onSelectedValueChange: () => false
};

let address = {
  id: 3,
  key: "address",
  placeholder: "Address",
  isEditable: true,
  value: "",
  onSelectedValueChange: () => false
};

let apt = {
  id: 4,
  key: "apt",
  placeholder: "Apt.",
  isEditable: true,
  value: "",
  onSelectedValueChange: () => false
};

let zipCode = {
  id: 5,
  key: "zipCode",
  placeholder: "Zip Code",
  isEditable: true,
  value: "",
  onSelectedValueChange: () => false
};

let city = {
  id: 6,
  key: "city",
  placeholder: "city",
  isEditable: true,
  value: "",
  onSelectedValueChange: () => false
};

let state = {
  id: 7,
  key: "state",
  placeholder: "state",
  isEditable: true,
  onSelectedValueChange: () => false
};

let country = {
  id: 8,
  key: "country",
  placeholder: "country",
  isEditable: false,
  value: "United States",
  onSelectedValueChange: () => false
};

const shippingAddressFields = [
  name,
  email,
  address,
  apt,
  zipCode,
  city,
  state,
  country
];

function ShippingDetails(props) {
  const {
    title,
    containerStyle,
    titleStyle,
    shippingMethods,
    isShippinngMethod,
    isShippinngAddress
  } = props;
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [
    selectedShipppingMethodIndex,
    setSelectedShipppingMethodIndex
  ] = useState(props.selectedShipppingMethodIndex);
  const [changedValues, setChangedValues] = useState(
    props.shippingAddress && props.shippingAddress.length > 0
      ? [...props.shippingAddress]
      : [...shippingAddressFields]
  );
  const shippingAddress = useRef([]);

  useEffect(() => {
    if (props.shippingAddress && props.shippingAddress.length > 0) {
      shippingAddress.current = props.shippingAddress;
    }
  }, []);

  const onShippingMethodSelected = index => {
    setSelectedShipppingMethodIndex(index);
    props.onShippingMethodSelected(index);
  };

  const onChangeValue = ({ value, index, key }) => {
    const shippingAddressItem = {
      index,
      key,
      value
    };
    const updatedValues = [...changedValues];
    const indexValueToUpdate = changedValues.findIndex(item => {
      return item.key === key;
    });

    if (indexValueToUpdate > -1) {
      updatedValues[indexValueToUpdate].value = value;
    }

    setChangedValues(updatedValues);

    const shouldUpdateItemInShippingAddress = hasShippingItemAlreadyBeenUpdated(
      shippingAddressItem.key,
      shippingAddress.current
    );

    if (shouldUpdateItemInShippingAddress.isFound) {
      shippingAddress.current[
        shouldUpdateItemInShippingAddress.atIndex
      ] = shippingAddressItem;
    }

    if (!shouldUpdateItemInShippingAddress.isFound) {
      shippingAddress.current.push(shippingAddressItem);
    }

    if (!shippingAddressItem.value) {
      shippingAddress.current.splice(
        shouldUpdateItemInShippingAddress.atIndex,
        1
      );
    }

    props.onChangeValue(
      shippingAddress.current,
      shippingAddressFields.length - 1
    );
  };

  const hasShippingItemAlreadyBeenUpdated = (key, shippingAddress) => {
    const foundIndex = shippingAddress.findIndex(item => {
      return item.key === key;
    });

    if (foundIndex > -1) {
      return {
        isFound: true,
        atIndex: foundIndex
      };
    } else {
      return {
        isFound: false,
        atIndex: -1
      };
    }
  };

  const keyExtractor = (item, index) => index.id;

  const renderAddressFields = ({ index, item }) => {
    const isLastItem = index === shippingAddressFields.length - 1;
    const textInputObj = changedValues.find(value => {
      return value.key === item.key;
    });

    return (
      <View
        style={[
          styles.addressInputFieldContainer,
          { borderBottomWidth: isLastItem ? 0 : 0.5 }
        ]}
        key={index + ""}
      >
        <TextInput
          underlineColorAndroid="transparent"
          style={styles.addressInputField}
          editable={item.isEditable}
          placeholderTextColor={AppStyles.colorSet.hairlineColor}
          placeholder={item.placeholder}
          value={isLastItem ? item.value : textInputObj.value}
          onChangeText={value => onChangeValue({ value, index, key: item.key })}
        />
      </View>
    );
  };

  const renderMethodFields = ({ index, item }) => {
    return (
      <TouchableOpacity
        onPress={() => onShippingMethodSelected(index)}
        style={[
          styles.shippingMethodContainer,
          {
            borderBottomWidth:
              index === props.shippingMethods.length - 1 ? 0 : 0.5
          }
        ]}
        key={index + ""}
      >
        <View style={styles.methodDetailContainer}>
          <Text style={styles.methodTitle}>{item.label}</Text>
          <Text style={styles.methodDetail}>{item.arrivalTime}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {Number(item.amount) > 0 ? item.amount : "free"}
          </Text>
        </View>
        <View style={styles.methodIconContainer}>
          {selectedShipppingMethodIndex === index && (
            <Image
              source={AppStyles.iconSet.tick}
              resizeMode="contain"
              style={styles.shippingAddressIcon}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.fieldsContainer, containerStyle]}>
      <Text style={[styles.fieldsTitle, titleStyle]}>{title}</Text>
      <View style={styles.shippingDetailsContainer}>
        <View style={styles.shippingItemsContainer}>
          {isShippinngMethod &&
            shippingMethods.map((item, index) =>
              renderMethodFields({ item, index })
            )}
          {isShippinngAddress && (
            <View style={styles.addressFieldsContainer}>
              {shippingAddressFields.map((item, index) =>
                renderAddressFields({ item, index })
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

ShippingDetails.propTypes = {
  title: PropTypes.string.isRequired,
  containerStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  isShippinngAddress: PropTypes.bool,
  isShippinngMethod: PropTypes.bool,
  onShippingMethodSelected: PropTypes.func,
  shippingMethods: PropTypes.array,
  onChangeValue: PropTypes.func,
  ChangedValues: PropTypes.array,
  shippingAddress: PropTypes.array,
  selectedShipppingMethodIndex: PropTypes.number
};
export default ShippingDetails;
