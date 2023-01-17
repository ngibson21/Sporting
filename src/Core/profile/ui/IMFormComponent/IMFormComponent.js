import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Switch} from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyles from './styles';

function IMFormComponent(props) {
  const {form, initialValuesDict, onFormChange, onFormButtonPress, appStyles} = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  const [alteredFormDict, setAlteredFormDict] = useState({});

  const onFormFieldValueChange = (formField, value) => {
    var newFieldsDict = alteredFormDict;
    newFieldsDict[formField.key] = value;
    setAlteredFormDict(newFieldsDict);
    onFormChange(newFieldsDict);
  };

  const renderSwithField = (switchField) => {
    return (
      <View
        style={[styles.settingsTypeContainer, styles.appSettingsTypeContainer]}>
        <Text style={styles.text}>{switchField.displayName}</Text>
        <Switch
          value={computeValue(switchField)}
          onValueChange={value => onFormFieldValueChange(switchField, value)}
          style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
        />
      </View>
    );
  };

  const renderTextField = (formTextField, index, totalLen) => {
    return (
      <View>
        <View
          style={[
            styles.settingsTypeContainer,
            styles.appSettingsTypeContainer,
          ]}>
          <Text style={styles.text}>{formTextField.displayName}</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={[styles.text, {textAlign: 'right'}]}
            editable={formTextField.editable}
            onChangeText={(text) => {onFormFieldValueChange(formTextField, text)}}
            placeholderTextColor={styles.placeholderTextColor}
            placeholder={formTextField.placeholder}
            value={computeValue(formTextField)}
          />
        </View>
        {index < totalLen - 1 && (
          <View style={styles.divider} />
        )}
      </View>
    );
  };

  const renderButtonField = (buttonField) => {
    return (
      <TouchableOpacity
        onPress={() => onFormButtonPress(buttonField)}
        style={[styles.settingsTypeContainer, styles.appSettingsSaveContainer]}>
        <Text style={styles.settingsType}>{buttonField.displayName}</Text>
      </TouchableOpacity>
    );
  };

  const renderField = (formField, index, totalLen) => {
    const type = formField.type;
    if (type == 'text') {
      return renderTextField(formField, index, totalLen);
    };
    if (type == 'switch') {
      return renderSwithField(formField);
    }
    if (type == 'button') {
      return renderButtonField(formField);
    }
    return null;
  };

  const renderSection = section => {
    return (
      <View>
        <View style={styles.settingsTitleContainer}>
          <Text style={styles.settingsTitle}>{section.title}</Text>
        </View>
        <View style={styles.contentContainer}>
          {section.fields.map((field, index) => renderField(field, index, section.fields.length))}
        </View>
      </View>
    );
  };

  const computeValue = field => {
    if (alteredFormDict[field.key] != null) {
      return alteredFormDict[field.key];
    }
    if (initialValuesDict[field.key] != null) {
      return initialValuesDict[field.key];
    }
    return field.value;
  }

  return (
    <View style={styles.container}>
      {form.sections.map(section => renderSection(section))}
    </View>
  );
}

IMFormComponent.propTypes = {
  onFormChange: PropTypes.func,
};

export default IMFormComponent;
