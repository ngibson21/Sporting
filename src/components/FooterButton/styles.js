import { DynamicStyleSheet } from "react-native-dark-mode";
import AppStyles from "../../AppStyles";

export default new DynamicStyleSheet({
  footerContainer: {
    height: 50,
    width: "92%",
    margin: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: AppStyles.colorSet.mainThemeForegroundColor,
    marginBottom: 50,
    flexDirection: "row"
  },
  footerTitle: {
    fontSize: 17,
    // padding: 10,
    fontFamily: AppStyles.fontFamily.semiBoldFont,
    color: AppStyles.colorSet.mainTextColor
  }
});
