import { DynamicStyleSheet } from "react-native-dark-mode";
import AppStyles from "../../AppStyles";

export default new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor
  }
});
