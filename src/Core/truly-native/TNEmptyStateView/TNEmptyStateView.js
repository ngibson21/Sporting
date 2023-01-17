import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyles from './styles';

const TNEmptyStateView = props => {
  const styles = new useDynamicStyleSheet(dynamicStyles(props.appStyles));
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.title}> {props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
      <TouchableOpacity onPress={props.onPress} style={styles.buttonContainer}>
        <Text style={styles.buttonName}>{props.buttonName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TNEmptyStateView;
