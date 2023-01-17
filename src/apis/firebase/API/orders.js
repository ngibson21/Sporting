import firebase from "react-native-firebase";
import AppConfig from "../../../SportinggConfig";

export const ordersRef = firebase
  .firestore()
  .collection(AppConfig.FIREBASE_COLLECTIONS.ORDERS);

export const onOrdersUpdate = (querySnapshot, callback) => {
  const orders = [];

  querySnapshot.forEach(doc => {
    const data = doc.data();

    orders.push(data);
  });

  return callback(orders);
};
