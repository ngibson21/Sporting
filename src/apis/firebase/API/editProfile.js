import firebase from "react-native-firebase";
import AppConfig from "../../../SportinggConfig";

export const setUserProfile = async (userId, userData) => {
  try {
    const userRef = firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.USERS)
      .doc(userId);

    userRef.update({
      ...userData
    });
  } catch (error) {
    return { error, success: false };
  }
};
