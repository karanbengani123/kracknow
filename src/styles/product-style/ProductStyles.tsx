import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

export const ProductStyle = StyleSheet.create({
  headerText: {
    color: Colors.orange,
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 5
  },
  horizontalLine: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.border,
    marginVertical: 10
  },
  fieldLabel: {
    fontSize: 14,
    color: Colors.inputLabel,
    marginVertical: 5
  },
  mandatoryText: {
    color: Colors.orange
  }
});
