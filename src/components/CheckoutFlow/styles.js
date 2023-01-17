import { Dimensions } from "react-native";
import { DynamicStyleSheet } from "react-native-dark-mode";
import AppStyles from "../../AppStyles";

const { height, width } = Dimensions.get("window");

const cardInputFontSize = 16;

export default new DynamicStyleSheet({
  headerContainer: {
    width: "100%",
    height: height * 0.08,
    borderBottomWidth: 0.5,
    borderBottomColor: AppStyles.colorSet.subHairlineColor
  },
  header: {
    color: AppStyles.colorSet.mainTextColor,
    // fontFamily: AppStyles.fontFamily.boldFont,
    fontWeight: "700",
    fontSize: height * 0.04,
    padding: 13
  },
  procedureImageContainer: {
    width: "100%",
    height: height * 0.33,
    justifyContent: "center",
    alignItems: "center"
  },
  procedureImage: {
    height: height * 0.22,
    width: width * 0.62
  },
  fieldsContainer: {
    width: "100%"
    // height: 60
  },
  fieldsTitle: {
    fontFamily: AppStyles.fontFamily.regularFont,
    fontSize: 16,
    color: AppStyles.colorSet.mainTextColor,
    padding: 10
  },
  inputFieldContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.colorSet.subHairlineColor,
    borderTopWidth: 1,
    borderTopColor: AppStyles.colorSet.subHairlineColor
  },
  iconContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  inputFieldIcon: {
    height: 30,
    width: 35,
    tintColor: "#545d7a"
  },
  cardNumberContainer: {
    flex: 8,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  cardNumber: {
    fontFamily: AppStyles.fontFamily.regularFont,
    color: AppStyles.colorSet.mainTextColor,
    fontSize: cardInputFontSize
  },
  cardDateContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  cardDate: {
    fontFamily: AppStyles.fontFamily.regularFont,
    color: AppStyles.colorSet.mainTextColor,
    fontSize: cardInputFontSize
  },
  cvcContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  cvc: {
    fontFamily: AppStyles.fontFamily.regularFont,
    color: AppStyles.colorSet.mainTextColor,
    fontSize: cardInputFontSize
  },
  shippingItemsContainer: {
    width: "96%",
    // height: "70%",
    alignSelf: "flex-end",
    marginBottom: 20
  },
  shippingDetailsContainer: {
    width: "100%",
    borderBottomColor: AppStyles.colorSet.subHairlineColor,
    borderBottomWidth: 0.5,
    borderTopColor: AppStyles.colorSet.subHairlineColor,
    borderTopWidth: 0.5
  },
  addressInputFieldContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderBottomColor: AppStyles.colorSet.subHairlineColor,
    borderBottomWidth: 0.5
  },
  addressInputField: {
    fontFamily: AppStyles.fontFamily.regularFont,
    color: AppStyles.colorSet.mainTextColor,
    fontSize: cardInputFontSize
  },
  shippingMethodContainer: {
    flexDirection: "row",
    borderBottomColor: AppStyles.colorSet.subHairlineColor,
    borderBottomWidth: 0.5
  },
  methodDetailContainer: {
    flex: 5,
    marginVertical: 10
  },
  methodTitle: {
    fontFamily: AppStyles.fontFamily.regularFont,
    color: AppStyles.colorSet.mainTextColor,
    fontSize: cardInputFontSize
  },
  methodDetail: {
    fontFamily: AppStyles.fontFamily.regularFont,
    color: AppStyles.colorSet.mainSubtextColor,
    fontSize: cardInputFontSize - 3
    // marginTop: -5
  },
  priceContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 6
  },
  price: {
    fontFamily: AppStyles.fontFamily.regularFont,
    color: AppStyles.colorSet.mainTextColor,
    fontSize: cardInputFontSize
  },
  methodIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    fontFamily: AppStyles.fontFamily.regularFont,
    color: AppStyles.colorSet.mainTextColor,
    fontSize: cardInputFontSize
  },
  shippingAddressIcon: {
    height: 17,
    width: 17,
    tintColor: AppStyles.colorSet.mainTextColor
  },
  addressFieldsContainer: {
    height: "100%"
  },
  paymentOptionIconContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  paymentOptionIcon: {
    height: 28,
    width: 28,
    tintColor: AppStyles.colorSet.mainTextColor
  },
  addCardIcon: {
    height: 20,
    width: 20
  },
  optionDetailContainer: {
    flex: 4,
    justifyContent: "center",
    marginVertical: 10
  },
  optionTitle: {
    fontFamily: AppStyles.fontFamily.regularFont,
    color: AppStyles.colorSet.mainSubtextColor,
    fontSize: cardInputFontSize,
    paddingLeft: 7
  },
  addNewCardContainer: {
    flexDirection: "row",
    marginTop: 17,
    borderBottomColor: AppStyles.colorSet.subHairlineColor,
    borderBottomWidth: 0.5,
    borderTopColor: AppStyles.colorSet.subHairlineColor,
    borderTopWidth: 0.5
  },
  addNewCardIconContainer: {
    flex: 0.56,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5
  },
  addNewCardTitleContainer: {
    flex: 4,
    justifyContent: "center",
    marginVertical: 10
  },
  addNewCardTitle: {
    fontFamily: AppStyles.fontFamily.regularFont,
    color: AppStyles.colorSet.mainSubtextColor,
    fontSize: cardInputFontSize,
    paddingLeft: 7
  },
  checkOutDetailContainer: {
    backgroundColor: "white",
    width: "100%",
    borderTopColor: AppStyles.colorSet.subHairlineColor,
    borderTopWidth: 1,
    borderBottomColor: AppStyles.colorSet.subHairlineColor,
    borderBottomWidth: 1,
    marginTop: 50
  },
  checkOutItemContainer: {
    flexDirection: "row",
    borderBottomColor: AppStyles.colorSet.subHairlineColor,
    borderBottomWidth: 1,
    backgroundColor: AppStyles.colorSet.light
  },
  checkOutTitleContainer: {
    flex: 6,
    justifyContent: "center",
    marginVertical: 10
  },
  checkOutTitle: {
    fontFamily: AppStyles.fontFamily.regularFont,
    color: AppStyles.colorSet.mainTextColor,
    fontSize: cardInputFontSize,
    paddingLeft: 10
  },
  checkOutValueContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "flex-end",
    marginVertical: 10,
    marginRight: 10
  },
  checkOutValue: {
    fontFamily: AppStyles.fontFamily.regularFont,
    color: AppStyles.colorSet.mainSubtextColor,
    fontSize: cardInputFontSize,
    paddingLeft: 7
  }
});
