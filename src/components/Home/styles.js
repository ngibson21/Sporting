import { DynamicStyleSheet } from "react-native-dark-mode";
import AppStyles from "../../AppStyles";

export default new DynamicStyleSheet({
  container: {
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
    flex: 1
  },
  carouselContainer: {
    marginTop: 18
  },
  carouselTitleText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: AppStyles.fontFamily.semiBoldFont,
    color: AppStyles.colorSet.mainTextColor,
    marginTop: 10,
    marginBottom: 12
  },
  unitContainer: {
    marginTop: 20,
    marginLeft: 7
  },
  unitTitle: {
    textAlign: "left",
    fontSize: 20,
    fontFamily: AppStyles.fontFamily.semiBoldFont,
    color: AppStyles.colorSet.mainTextColor,
    marginLeft: 7,
    marginBottom: 7
  }
});
