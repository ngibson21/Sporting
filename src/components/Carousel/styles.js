import { Dimensions } from "react-native";
import { DynamicStyleSheet } from "react-native-dark-mode";
import AppStyles from "../../AppStyles";

const { width: screenWidth } = Dimensions.get("window");
const width = screenWidth * 0.7;
const carouselHeightMultiplier = 1.52;

export default new DynamicStyleSheet({
  carouselProductViewContainer: {
    width: width - 15,
    height: carouselHeightMultiplier * width - 60,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.36,
    shadowRadius: 7,
    margin: 10,
    elevation: 11
  },
  carouselProductViewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 7
  },
  carouselProductViewTitle: {
    textAlign: "center",
    color: AppStyles.colorSet.mainTextColor,
    fontSize: 14,
    fontFamily: AppStyles.fontFamily.semiBoldFont,
    marginTop: 17
  },
  carouselProductViewPrice: {
    textAlign: "center",
    color: AppStyles.colorSet.mainSubtextColor,
    fontSize: 14,
    fontFamily: AppStyles.fontFamily.mediumFont,
    marginTop: 4
  }
});
