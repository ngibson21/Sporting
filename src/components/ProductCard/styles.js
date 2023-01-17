import { Dimensions } from "react-native";
import { DynamicStyleSheet } from "react-native-dark-mode";
import AppStyles from "../../AppStyles";

const { width, height } = Dimensions.get("window");

const featuredTextPadding = 3;

export default new DynamicStyleSheet({
  productCardConainer: {
    width: 0.35 * width,
    height: 0.32 * height,
    margin: 10,
    overflow: "visible",
    marginLeft: 7
  },
  productCardImageConainer: {
    width: "100%",
    height: "80%"
  },
  productCardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 6
  },
  productCardPrice: {
    textAlign: "left",
    fontSize: 14,
    color: AppStyles.colorSet.mainTextColor,
    fontFamily: AppStyles.fontFamily.boldFont,
    paddingTop: featuredTextPadding
  },
  productCardDescription: {
    textAlign: "left",
    fontSize: 13,
    color: AppStyles.colorSet.mainSubtextColor,
    fontFamily: AppStyles.fontFamily.regularFont,
    paddingTop: featuredTextPadding
  }
});
