import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

export const ConnectionStyles = StyleSheet.create({
  screen: {
    marginBottom: 30,
    paddingHorizontal: 20
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  countLabel: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '700'
  },
  searchContainer: {
    position: 'relative',
    paddingVertical: 15
  },
  searchIcon: {
    position: 'absolute',
    top: 20,
    right: 20
  }
});
