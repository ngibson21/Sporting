import { Platform } from "react-native";
import { IMLocalized } from "./Core/localization/IMLocalization";
import AppStyles from "./AppStyles";

const regexForNames = /^[a-zA-Z]{2,25}$/;
const regexForPhoneNumber = /\d{9}$/;
const SportinggConfig = {
  currency: "$",
  isSMSAuthEnabled: true,
  appIdentifier: "rn-social-network-android",
  onboardingConfig: {
    welcomeTitle: IMLocalized("Welcome to your Sportingg"),
    welcomeCaption: IMLocalized(
      "Stop dreaming. Start Winning."
    ),
    walkthroughScreens: [
      {
        icon: require("../assets/images/shopping-bag.png"),
        title: IMLocalized("Shopping Bag"),
        description: IMLocalized(
          "Add products to your shopping cart, and check them out later."
        )
      },
      {
        icon: require("../assets/images/quick-search.png"),
        title: IMLocalized("Quick Search"),
        description: IMLocalized("Quickly find the products you like the most.")
      },
      {
        icon: require("../assets/images/wishlist.png"),
        title: IMLocalized("Wishlist"),
        description: IMLocalized(
          "Build a wishlist with your favourite products to buy them later."
        )
      },
      {
        icon: require("../assets/images/delivery.png"),
        title: IMLocalized("Order Tracking"),
        description: IMLocalized(
          "Monitor your orders and get updates when something changes."
        )
      },
      {
        icon: require("../assets/images/notification.png"),
        title: IMLocalized("Group Chats"),
        description: IMLocalized(
          "Get notifications for new products, promotions and discounts."
        )
      },
      {
        icon: require("../assets/images/payment.png"),
        title: IMLocalized("Stripe Payments"),
        description: IMLocalized(
          "We support all payment options, thanks to stripe."
        )
      },
      {
        icon:
          Platform.OS === "ios"
            ? require("../assets/images/apple-pay.png")
            : require("../assets/images/google-pay.png"),
        title:
          Platform.OS === "ios"
            ? IMLocalized("Apple Pay")
            : IMLocalized("Google Pay"),
        description:
          Platform.OS === "ios"
            ? IMLocalized("Pay with a single click with Apple Pay.")
            : IMLocalized("Pay with a single click with Google Pay.")
      }
    ]
  },
  tabIcons: {
    Feed: {
      focus: AppStyles.iconSet.homefilled,
      unFocus: AppStyles.iconSet.homeUnfilled
    },
    Discover: {
      focus: AppStyles.iconSet.search,
      unFocus: AppStyles.iconSet.search
    },
    Chat: {
      focus: AppStyles.iconSet.commentFilled,
      unFocus: AppStyles.iconSet.commentUnfilled
    },
    Friends: {
      focus: AppStyles.iconSet.friendsFilled,
      unFocus: AppStyles.iconSet.friendsUnfilled
    },
    Profile: {
      focus: AppStyles.iconSet.profileFilled,
      unFocus: AppStyles.iconSet.profileUnfilled
    }
  },
  editProfileFields: {
    sections: [
      {
        title: IMLocalized("PUBLIC PROFILE"),
        fields: [
          {
            displayName: IMLocalized("First Name"),
            type: "text",
            editable: true,
            regex: regexForNames,
            key: "firstName",
            placeholder: "Your first name"
          },
          {
            displayName: IMLocalized("Last Name"),
            type: "text",
            editable: true,
            regex: regexForNames,
            key: "lastName",
            placeholder: "Your last name"
          }
        ]
      },
      {
        title: IMLocalized("PRIVATE DETAILS"),
        fields: [
          {
            displayName: IMLocalized("E-mail Address"),
            type: "text",
            editable: false,
            key: "email",
            placeholder: "Your email address"
          },
          {
            displayName: IMLocalized("Phone Number"),
            type: "text",
            editable: true,
            regex: regexForPhoneNumber,
            key: "phone",
            placeholder: "Your phone number"
          }
        ]
      }
    ]
  },
  userSettingsFields: {
    sections: [
      {
        title: IMLocalized("GENERAL"),
        fields: [
          {
            displayName: IMLocalized("Allow Push Notifications"),
            type: "switch",
            editable: true,
            key: "push_notifications_enabled",
            value: false
          },
          {
            displayName: IMLocalized("Enable Face ID / Touch ID"),
            type: "switch",
            editable: true,
            key: "face_id_enabled",
            value: false
          }
        ]
      },
      {
        title: "",
        fields: [
          {
            displayName: IMLocalized("Save"),
            type: "button",
            key: "savebutton"
          }
        ]
      }
    ]
  },
  contactUsFields: {
    sections: [
      {
        title: IMLocalized("CONTACT"),
        fields: [
          {
            displayName: IMLocalized("Address"),
            type: "text",
            editable: false,
            key: "push_notifications_enabled",
            value: "142 Steiner Street, San Francisco, CA, 94115"
          },
          {
            displayName: IMLocalized("E-mail us"),
            value: "info@sportingg.eu",
            type: "text",
            editable: false,
            key: "email",
            placeholder: "Your email address"
          }
        ]
      },
      {
        title: "",
        fields: [
          {
            displayName: IMLocalized("Call Us"),
            type: "button",
            key: "savebutton"
          }
        ]
      }
    ]
  },
  contactUsPhoneNumber: "+16504859694",
  APIs: {
    wooCommerce: "wooCommerce",
    firebase: "firebase",
    shopify: "shopify"
  },
  API_TO_USE: "wooCommerce", // "firebase", "wooCommerce", "shopify",
  stripe_ENV: {
    API: {
      baseURL: "https://murmuring-caverns-94283.herokuapp.com/", //your copied heroku link
      timeout: 9000
    }
  },
  stream_ENV: {
    API: {
      tokenURL: 'https://i2gc32j3s0.execute-api.eu-west-1.amazonaws.com/prod/init',
      baseURL: "https://i2gc32j3s0.execute-api.eu-west-1.amazonaws.com/prod", //your copied heroku link
      timeout: 9000
    }
  },
  wooCommerceConfig: {
    url: "https://dev.sportingg.eu",
    consumerKey: "ck_da0616ffa8cfb5b8912db75ee58453ccbbf8b542",
    consumerSecret: "cs_3e98567c72494d0291cb3452270df6606ee5cba1"
  },
  STRIPE_CONFIG: {
    PUBLISHABLE_KEY: "pk_test_LSo5mTIQqkRiTWd0eBMSDAXf00QZGCttt3", // "pk_test_..." in test mode and ""pk_live_..."" in live mode
    MERCHANT_ID: "Your_merchant_id_goes_here",
    ANDROID_PAYMENT_MODE: "test" // test || production
  },
  GOOGLE_SIGNIN_CONFIG: {
    SCOPES: ["https://www.googleapis.com/auth/drive.photos.readonly"],
    WEB_CLIENT_ID:
      "706061484183-l0l58dds4kg329fh1trbiha1ci5rqm5n.apps.googleusercontent.com", // from google-services.json file
    OFFLINE_ACCESS: true
  },
  SHOPIFY_CONFIG: {
    domain: "iosapptemplates.myshopify.com",
    storefrontAccessToken: "04aedbaf7ca1cbe268cc9a1547b2817e"
  },
  FIREBASE_COLLECTIONS: {
    USERS: "users",
    PAYMENT_METHODS: "payment_methods",
    STRIPE_CUSTOMERS: "stripe_customers",
    CATEGORIES: "shopertino_categories",
    CHARGES: "charges",
    ORDERS: "shopertino_orders",
    SOURCES: "sources",
    PRODUCTS: "shopertino_products",
    SHIPPING_METHODS: "shipping_methods"
  },
  STREAM_SDK: {
    CHAT_CLIENT: "zs7944f2yb7s",
    USER_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic2hpbnktc3Vuc2V0LTUifQ.wTCAiaNpxk004dWF2v5hQ06svC1cgGUyrvONpTuLqfs"
  }
};

export default SportinggConfig;
