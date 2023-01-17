import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Alert, TouchableHighlight } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import ImageView from 'react-native-image-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import { useDynamicStyleSheet } from 'react-native-dark-mode';

// import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import dynamicStyles from './styles';
import { IMLocalized } from '../../localization/IMLocalization';

const TNProfilePictureSelector = props => {
  const [profilePictureURL, setProfilePictureURL] = useState('');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [tappedImage, setTappedImage] = useState([]);
  const actionSheet = useRef(null);
  const { appStyles } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  useEffect(() => {
    if (props.profilePictureURL && props.profilePictureURL.length > 0) {
      setProfilePictureURL(props.profilePictureURL);
    }
  }, []);

  const handleProfilePictureClick = url => {
    if (url) {
      const isAvatar = url.search('avatar');
      const image = [
        {
          source: {
            uri: url,
          },
        },
      ];
      if (isAvatar === -1) {
        setTappedImage(image);
        setIsImageViewerVisible(true);
      } else {
        showActionSheet();
      }
    } else {
      showActionSheet();
    }
  };

  const onImageError = () => {
    Alert.alert(
      '',
      IMLocalized('An error occurred while trying to load Profile Picture!'),
      [{ text: IMLocalized('OK') }],
      {
        cancelable: false,
      }
    );
    setProfilePictureURL('');
  };

  const onPressAddPhotoBtn = () => {
    const options = {
      title: IMLocalized('Select photo'),
      cancelButtonTitle: IMLocalized('Cancel'),
      takePhotoButtonTitle: IMLocalized('Take Photo'),
      chooseFromLibraryButtonTitle: IMLocalized('Choose from Library'),
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (props.accountDetailsScreen) {
          props.setButtonActionTitle(IMLocalized('Uploading'));
          setProfilePictureURL(response.uri);
          props.onChangeProfilePhoto(response.uri);
        } else {
          setProfilePictureURL(response.uri);
          props.setProfilePictureURL(response.uri);
        }
      }
    });
  };

  const closeButton = () => (
    <TouchableOpacity style={styles.closeButton} onPress={() => setIsImageViewerVisible(false)}>
      <Image style={styles.closeIcon} source={appStyles.iconSet.close} />
    </TouchableOpacity>
  );

  const showActionSheet = index => {
    setSelectedPhotoIndex(index);
    actionSheet.current.show();
  };

  const onPressRemovePhotoBtn = () => {
    if (profilePictureURL) setProfilePictureURL(null);
  };

  const onActionDone = index => {
    if (index == 0) {
      console.log('add index', index);
      onPressAddPhotoBtn();
    }
    if (index == 2) {
      console.log('remove index', index);
      onPressRemovePhotoBtn();
      if (props.accountDetailsScreen) {
        props.setButtonActionTitle(IMLocalized('Removing'));
        props.onChangeProfilePhoto(null);
      }
    }
  };

  return (
    <>
      <View style={styles.imageBlock}>
        <TouchableHighlight
          style={styles.imageContainer}
          onPress={() => handleProfilePictureClick(profilePictureURL)}
        >
          <Image
            style={[styles.image, { opacity: profilePictureURL ? 1 : 0.3 }]}
            source={profilePictureURL ? { uri: profilePictureURL } : appStyles.iconSet.userAvatar}
            resizeMode="cover"
            onError={onImageError}
          />
        </TouchableHighlight>

        <TouchableOpacity onPress={showActionSheet} style={styles.addButton}>
          <Icon name="camera" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ActionSheet
          ref={actionSheet}
          title={IMLocalized('Confirm action')}
          options={[
            IMLocalized('Add New Profile Photo'),
            IMLocalized('Cancel'),
            IMLocalized('Remove'),
          ]}
          cancelButtonIndex={1}
          destructiveButtonIndex={2}
          onPress={index => {
            onActionDone(index);
          }}
        />
        <ImageView
          images={tappedImage}
          isVisible={isImageViewerVisible}
          onClose={() => setIsImageViewerVisible(false)}
          controls={{ close: closeButton }}
        />
      </ScrollView>
    </>
  );
};

export default TNProfilePictureSelector;
