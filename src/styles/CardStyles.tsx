import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

export const OrganizationProfileCardStyle = StyleSheet.create({
  profileCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.darkBackground,
    borderRadius: 10,
    marginVertical: 7,
    marginHorizontal: 20,
    paddingVertical: 15,
    overflow: 'hidden'
  },
  colorBand: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 40,
    height: 95,
    borderBottomRightRadius: 10
  },
  premiumIconContainer: {
    backgroundColor: Colors.premium,
    padding: 3,
    borderRadius: 50,
    position: 'absolute',
    top: 50,
    left: '38%'
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
  profileContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 30
  },
  headerContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center'
  },
  headerTextStyle: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2
  },
  textStyle: {
    color: Colors.text,
    fontSize: 12,
    marginBottom: 7
  },
  cityTextStyle: {
    color: Colors.premium
  },
  horizontalLineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginVertical: 7,
    width: '100%'
  },
  buttonTextStyle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
    marginRight: 20
  },
  highlightedText: {
    color: Colors.primary
  },
  bodyContainer: {
    paddingHorizontal: 20,
    paddingVertical: 7
  },
  descriptionText: {
    fontSize: 12,
    color: Colors.black,
    marginBottom: 8
  },
  sinceLabel: {
    fontSize: 12,
    color: Colors.text
  },
  sinceValue: {
    fontSize: 12,
    color: Colors.black
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingTop: 7
  },
  footerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  footerText: {
    fontSize: 13,
    color: Colors.text,
    marginLeft: 10
  }
});
