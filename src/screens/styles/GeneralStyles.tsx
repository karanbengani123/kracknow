import { Dimensions, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

export const GeneralStyle = StyleSheet.create({
  contentCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height / 2
  },
  textPrimary: {
    color: Colors.primary
  },
  fabIcon: {
    position: 'absolute',
    right: 25,
    bottom: 60
  },
  fieldContainer: {
    marginVertical: 7
  },
  fieldLabel: {
    color: Colors.inputLabel,
    fontSize: 14
  },
  fieldError: {
    fontSize: 14,
    color: Colors.danger
  },
  fieldValue:{
    color: Colors.black,
    fontSize: 16
  }
});
