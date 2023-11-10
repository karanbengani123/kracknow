import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

export const FormStyle = StyleSheet.create({
  textInputContainer: {
    marginBottom: 15
  },
  inputLabel: {
    fontSize: 13,
    color: Colors.inputLabel
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 5,
    fontSize: 16
  },
  pickerInputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 15
  },
  pickerInput: {
    fontSize: 16,
    marginBottom: -7,
    marginLeft: -15,
    marginRight: -15
  },
  disabledTextInput: {
    borderBottomWidth: 0,
    color: Colors.text
  },
  enabledTextInput: {
    color: Colors.black
  },
  otpTextInput: {
    paddingBottom: 0,
    width: '20%'
  },
  errorBorder: {
    borderBottomColor: Colors.danger
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginTop: 5
  },
  textInputRightIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 10,
    zIndex: 10
  },
  searchContainer: {
    position: 'relative',
    paddingBottom: 15
  },
  searchIcon: {
    position: 'absolute',
    top: 5,
    right: 0
  }
});

export const ButtonStyle = StyleSheet.create({
  buttonContainer: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 7
  },
  buttonWithIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonDisabled: {
    opacity: 0.4
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center'
  },
  buttonInvertContainer: {
    borderWidth: 2
  }
});

export const LabelStyle = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.chipBorder,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 5,
    marginVertical: 4
  },
  labelText: {
    fontSize: 14,
    color: Colors.inputLabel
  }
});

export const LabelSmallStyle = StyleSheet.create({
  labelContainer: {
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderColor: Colors.chipBorder,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 4
  },
  labelText: {
    fontSize: 8,
    color: Colors.text
  }
});

export const FooterSectionStyle = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fullButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderColor: Colors.border,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  halfButtonContainer: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderColor: Colors.border,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomWidth: 0
  },
  leftButtonContainer: {
    borderLeftWidth: 1,
    borderTopLeftRadius: 15
  },
  rightButtonContainer: {
    borderTopRightRadius: 15
  },
  textStyle: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 10
  }
});
