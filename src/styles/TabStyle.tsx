import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

export const TabStyle = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 10
  },
  activeTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary
  },
  tabText: {
    fontSize: 12,
    color: Colors.black
  },
  activeTabText: {
    color: Colors.white,
    fontWeight: '700'
  }
});

export const TabUnderlineStyle = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  },
  tab: {
    alignSelf: 'flex-start',
    minWidth: '50%',
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
    paddingBottom: 10
  },
  tabActive: {
    borderBottomColor: Colors.primary
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center'
  },
  tabLabelActive: {
    color: Colors.black
  }
});
