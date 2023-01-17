import { Dimensions } from "react-native";
import { DynamicStyleSheet } from "react-native-dark-mode";
import AppStyles from "../../AppStyles";

const { width, height } = Dimensions.get("window");

export default new DynamicStyleSheet({
  container: {
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
    flex: 1
  },
  categoryImageContainerStyle: {
    width: width * 0.93,
    height: height * 0.12
  }
});
