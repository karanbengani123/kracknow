import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

export const ModalStyle = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: Colors.white,
    overflow: 'hidden'
  },
  modalHeader: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 15
  },
  modalBody: {
    paddingHorizontal: 20
  },
  modalBodyText: {
    color: Colors.text,
    fontSize: 14
  }
});
