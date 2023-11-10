import { Dimensions, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const {width} = Dimensions.get('window');

export const ConnectionCardStyle = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.darkBackground,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    overflow: 'hidden'
  },
  colorBand: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 8
  },
  premiumIconContainer: {
    backgroundColor: Colors.premium,
    padding: 3,
    borderRadius: 50,
    position: 'absolute',
    top: 0,
    right: 0
  },
  agentColorBand: {
    backgroundColor: Colors.agentBg,
    opacity: 0.4
  },
  retailerColorBand: {
    backgroundColor: Colors.retailerBg
  },
  wholesalerColorBand: {
    backgroundColor: Colors.wholesalerBg
  },
  groupColorBand: {
    backgroundColor: Colors.groupBg
  },
  profileImage: {
    height: 36,
    width: 36,
    borderRadius: 18
  },
  initialNameContainer: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.darkBackground,
    backgroundColor: Colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  initialNameText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 8
  },
  headerTextStyle: {
    color: Colors.black,
    fontSize: 12,
    marginBottom: 2
  },
  textStyle: {
    color: Colors.text,
    fontSize: 8,
  },
  cityTextStyle: {
    color: Colors.orange
  },
  horizontalLineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginVertical: 3,
    width: 25
  },
  buttonTextStyle: {
    color: Colors.text,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginRight: 12,
    padding: 2
  },
  highlightedText: {
    color: Colors.primary
  }
});

export const ProductCardStyle = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 10,
    marginVertical: 7,
    position: 'relative',
    width: (Dimensions.get('window').width / 2) - 27.5
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  productImage: {
    width: '100%',
    height: 175
  },
  categoryImage: {
    width: 87.5,
    height: 87.5
  },
  moreImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  moreImageText: {
    color: Colors.white,
    fontSize: 12
  },
  tagPosition: {
    position: 'absolute',
    top: 15,
    left: -5
  },
  catalogueTagPosition: {
    position: 'absolute',
    top: 15,
    left: 10
  },
  bodyContainer: {
    padding: 10
  },
  productDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  productNameText: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: '700',
    width: 130
  },
  soldByText: {
    color: Colors.text,
    fontSize: 10,
    width: 140
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  offerPriceText: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: '700'
  },
  priceText: {
    color: Colors.text,
    fontSize: 10
  },
  strikeThroughText: {
    textDecorationLine: 'line-through'
  },
  discountText: {
    color: Colors.chipBorder,
    fontSize: 10
  },
  colorBox: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3
  }
});

export const LiveVideoCardStyle = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    width: width - 125,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 20
  },
  imageContainer: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden',
    position: 'relative'
  },
  notificationIconPosition: {
    position: 'absolute',
    top: 15,
    left: 15
  },
  tagPosition: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  notificationContainer: {
    backgroundColor: Colors.white,
    height: 28,
    width: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  productImage: {
    height: 150,
    width: width - 125
  },
  bodyContainer: {
    padding: 10
  },
  headerText: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: '700'
  },
  subheaderText: {
    color: Colors.black,
    fontSize: 12
  }
});

export const OrderDetailsCardStyle = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15
  },
  textStyle: {
    color: Colors.black,
    fontSize: 14,
  },
  textBoldStyle: {
  }
});
