import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, Text } from "react-native";
import { useDynamicStyleSheet } from "react-native-dark-mode";
import dynamicStyles from "./styles";

function ProfileImageCard(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const { user } = props;
  const lastName = user.lastName ? user.lastName : "";
  const fullName = `${user.firstName} ${lastName}`;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardImageContainer}>
        <Image
          style={styles.cardImage}
          source={{
            uri: user.photoURI || user.profilePictureURL
          }}
        />
      </View>
      <View style={styles.cardNameContainer}>
        <Text style={styles.cardName}>{fullName}</Text>
      </View>
    </View>
  );
}

ProfileImageCard.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.func,
  extraData: PropTypes.object,
  user: PropTypes.object
};

export default ProfileImageCard;
