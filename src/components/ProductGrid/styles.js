import { DynamicStyleSheet } from "react-native-dark-mode";
import AppStyles from "../../AppStyles";

export default new DynamicStyleSheet({
  container: {
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
    flex: 1
  }
});
