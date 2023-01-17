import Geolocation from "@react-native-community/geolocation";
import WooCommerceManager from "../../wooCommerce";
import AppConfig from "../../../SportinggConfig";
import { set } from "react-native-reanimated";
import { wooCommerceDataManager } from "../../../apis";
const FBSDK = require("react-native-fbsdk");

const defaultProfilePhotoURL =
  "https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg";

const loginWithEmailAndPassword = (email, password, appConfig) => {
  switch (appConfig.API_TO_USE.toLowerCase()) {
    case appConfig.APIs.wooCommerce.toLowerCase():
      return wooCommerceLogin(email, password, appConfig);

    default:
      return wooCommerceLogin(email, password);
  }
};

const createAccountWithEmailAndPassword = (userDetails, appConfig) => {
  switch (appConfig.API_TO_USE.toLowerCase()) {
    case appConfig.APIs.wooCommerce.toLowerCase():
      return createWooCommerceAccount(userDetails, appConfig);

    default:
      return createWooCommerceAccount(userDetails, appConfig);
  }
};

const retrievePersistedAuthUser = appConfig => {
  switch (appConfig.API_TO_USE.toLowerCase()) {
    case appConfig.APIs.wooCommerce.toLowerCase():
      return retrieveWooCommerceAuthUser(appConfig);

    default:
      return retrieveWooCommerceAuthUser();
  }
};

const retrieveWooCommerceAuthUser = async appConfig => {
  return new Promise(async (resolve, reject) => {
    const authResponse = await WooCommerceManager.configWooCommerceAuth(
      appConfig.wooCommerceConfig
    ).wooCommerceAuthManager.retrievePersistedAuthUser();

    if (authResponse.success && authResponse.response.token) {
      const res = await getWooCommerceUser(
        authResponse.response.user_email,
        appConfig
      );
      if (res.user) {
        const stream = await getStreamToken(res.user, appConfig)
        const data = {
          token: stream.token
        };
        await wooCommerceDataManager.updateCustomer(res.user.id, data);

        var updatedUser = res.user
        updatedUser.streamUser = stream
        console.log(updatedUser)
        resolve({
          user: updatedUser,
          stripeCustomer: res.stripeCustomer
        });
      } else {
        resolve(null);
      }
    } else {
      reject({
        error: authResponse.error
      });
    }
  });
};

const getWooCommerceUser = async (email, appConfig) => {
  const userResponse = await WooCommerceManager.configWooCommerceData(
    appConfig.wooCommerceConfig
  ).wooCommerceDataManager.getCustomer({ email });

  const user = userResponse.response[0];
  const authUser = {
    id: user.id,
    email,
    firstName: user.first_name,
    lastName: user.last_name,
    photoURI: user.avatar_url,
    shipping: { ...user.shipping },
    billing: { ...user.billing },
    phone: user.billing.phone
  };

  return {
    user: authUser,
    stripeCustomer: user.billing.address_1
  };
};

const wooCommerceLogin = async (email, password, appConfig) => {
  return new Promise(async (resolve, reject) => {
    const wooResponse = await WooCommerceManager.configWooCommerceAuth(
      appConfig.wooCommerceConfig
    ).wooCommerceAuthManager.authCustomer({
      username: email,
      password: password
    });
    if (wooResponse.success && wooResponse.response && wooResponse.response.token) {
      const res = await getWooCommerceUser(email, appConfig);
      if (res.user) {
        const stream = await getStreamToken(res.user, appConfig)
        const data = {
          token: stream.token
        };
        await wooCommerceDataManager.updateCustomer(res.user.id, data);
        var updatedUser = res.user
        updatedUser.streamUser = stream
        console.log(updatedUser)
        resolve({
          user: updatedUser,
          stripeCustomer: res.stripeCustomer
        });
      } else {
        resolve(null);
      }
    } else {
      reject({
        error: wooResponse.error
      });
    }
  });
};

const getStreamToken = async (user, appConfig) => {
  let name = user.firstName + " " + user.lastName
  let data = {
    id: user.id.toString(),
    name: name
  }
  const settings = {
    method: 'POST',
    body: JSON.stringify(data)
  };
  try {
    const fetchResponse = await fetch(appConfig.stream_ENV.API.tokenURL, settings);
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
}

const createWooCommerceAccount = async (userDetails, appConfig) => {
  return new Promise(async (resolve, reject) => {
    const { firstName, lastName, email, password } = userDetails;

    const wooCustomer = {
      email,
      first_name: firstName,
      password,
      last_name: lastName
    };

    const res = await WooCommerceManager.configWooCommerceData(
      appConfig.wooCommerceConfig
    ).wooCommerceDataManager.createCustomer(wooCustomer);

    if (res.success && res.response.id) {
      const userResponse = await WooCommerceManager.configWooCommerceData(
        appConfig.wooCommerceConfig
      ).wooCommerceDataManager.getCustomer({ email });
      const user = userResponse.response[0];
      const authUser = {
        id: user.id,
        email,
        firstName: user.first_name,
        lastName: user.last_name,
        photoURI: user.avatar_url,
        shipping: { ...user.shipping },
        billing: {
          ...user.billing
        },
        phone: user.billing.phone
      };

      resolve({
        user: authUser
      });
    } else {
      reject({
        error: res.error
      });
    }
  });
};



const handleSuccessfulLogin = (user, accountCreated) => {
  // we don't wait for fetching & updating the location or push token, for performance reasons
  fetchAndStoreExtraInfoUponLogin(user, accountCreated);
  return new Promise(resolve => {
    resolve({ user: { ...user } });
  });
};

const fetchAndStoreExtraInfoUponLogin = async (user, accountCreated) => {
  getCurrentLocation(Geolocation).then(async location => {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    var locationData = {};
    if (location) {
      locationData = {
        location: {
          latitude: latitude,
          longitude: longitude
        }
      };
      if (accountCreated) {
        locationData = {
          ...locationData,
          signUpLocation: {
            latitude: latitude,
            longitude: longitude
          }
        };
      }
    }
  });
};

const getCurrentLocation = geolocation => {
  return new Promise(resolve => {
    geolocation.getCurrentPosition(
      resolve,
      () => resolve({ coords: { latitude: "", longitude: "" } }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  });
};

const logout = () => {
  const userData = {
    ...user,
    isOnline: false
  };
};

const authManager = {
  retrievePersistedAuthUser,
  loginWithEmailAndPassword,
  logout
};

export default authManager;
