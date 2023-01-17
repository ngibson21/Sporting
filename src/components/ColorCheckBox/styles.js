import { DynamicStyleSheet } from "react-native-dark-mode";
import AppStyles from "../../AppStyles";

// const { width, height } = Dimensions.get("window");
const optionBoxSize = 23;
const optionBoxMargin = 7;

export default new DynamicStyleSheet({
  colorOptionBox: {
    height: optionBoxSize,
    width: optionBoxSize,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    margin: optionBoxMargin
  },
  selectedColorIcon: {
    height: 17,
    width: 17,
    tintColor: AppStyles.colorSet.mainThemeForegroundColor
  }
});
