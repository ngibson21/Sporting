import { DynamicStyleSheet } from "react-native-dark-mode";
import AppStyles from "../../AppStyles";

const optionBoxSize = 23;
const optionBoxMargin = 7;

export default new DynamicStyleSheet({
  sizeOptionBox: {
    height: optionBoxSize,
    width: optionBoxSize,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "white",
    margin: optionBoxMargin
  },
  selectedSizeOptionBox: {
    backgroundColor: AppStyles.colorSet.mainThemeForegroundColor
  },
  size: {
    textAlign: "center",
    color: AppStyles.colorSet.mainTextColor,
    fontFamily: AppStyles.fontFamily.boldFont
  },
  selectedSize: {
    color: "white"
  }
});
