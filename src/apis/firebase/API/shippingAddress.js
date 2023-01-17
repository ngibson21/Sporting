import firebase from "react-native-firebase";
import AppConfig from "../../../SportinggConfig";

const shippingMethodsRef = firebase
  .firestore()
  .collection(AppConfig.FIREBASE_COLLECTIONS.SHIPPING_METHODS);

export const setUserShippingAddress = async (userId, shippingAddress) => {
  try {
    const userRef = firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.USERS)
      .doc(userId);

    await userRef.update({
      shippingAddress
    });
    const user = await userRef.get();

    return { user: user.data(), success: true };
  } catch (error) {
    return { error, success: false };
  }
};

export const subscribeShippingMethods = callback => {
  return shippingMethodsRef.onSnapshot(querySnapshot => {
    const shippingMethods = [];

    querySnapshot.forEach(doc => {
      const data = doc.data();

      shippingMethods.push(data);
    });

    return callback(shippingMethods);
  });
};
