import { DynamicStyleSheet } from "react-native-dark-mode";
import AppStyles from "../../AppStyles";

export default new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colorSet.grey0
  },
  body: {
    width: "100%"
  },
  labelView: {
    width: "100%",
    height: 60,
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  captionView: {
    width: "100%",
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  contentView: {
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: AppStyles.colorSet.hairlineColor,
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor
  },
  itemView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },
  lineView: {
    left: 15,
    width: "95%",
    height: 1,
    backgroundColor: AppStyles.colorSet.hairlineColor
  },
  itemButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  text: {
    fontSize: 20,
    color: AppStyles.colorSet.mainTextColor
  },
  label: {
    fontSize: 14,
    color: AppStyles.colorSet.mainTextColor
  },
  caption: {
    fontSize: 13,
    color: AppStyles.colorSet.mainTextColor
  }
});
