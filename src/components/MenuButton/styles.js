import { DynamicStyleSheet } from "react-native-dark-mode";
import AppStyles from "../../AppStyles";

export default new DynamicStyleSheet({
  headerButtonContainer: {
    padding: 10
  },
  headerButtonImage: {
    tintColor: AppStyles.colorSet.mainTextColor,
    justifyContent: "center",
    width: 25,
    height: 25,
    margin: 6
  }
});
