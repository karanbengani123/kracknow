import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { GeneralStyle } from '../styles/GeneralStyles';

import Colors from '../constants/Colors';

interface Props {
  fieldLabel?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  autoCompleteType?: 'email';
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
  isMandatory?: boolean;
  placeholder?: string;
  value?: string;
  editable?: boolean;
  multiline?: boolean;
  onChangeText?: (text) => void;
  onEndEditing?: () => void;
  onFocus?: () => void;
  ref?: (ref) => void;
  style?: any;
  errorText?: string;
}

interface State {
}

export default class RNTextInput extends React.PureComponent<Props, State> {
  render(): React.ReactNode {
    return (
      <View style={styles.fieldContainer}>
        {
          this.props?.fieldLabel &&
          <Text style={styles.fieldLabel}>
            {this.props.fieldLabel}
            {
              this.props.isMandatory &&
              <Text style={styles.mandatoryText}> *</Text>
            }
          </Text>
        }
        <TextInput
          ref={(ref) => this.props.ref ? this.props.ref(ref) : null}
          secureTextEntry={this.props?.secureTextEntry || false}
          autoCapitalize={this.props.autoCapitalize || 'none'}
          autoCompleteType={this.props.autoCompleteType || 'off'}
          keyboardType={this.props.keyboardType || 'default'}
          placeholder={this.props.placeholder}
          editable={this.props.editable}
          multiline={this.props.multiline ? this.props.multiline : false}
          onChangeText={(text) => this.props.onChangeText ? this.props.onChangeText(text) : null}
          onEndEditing={() => this.props.onEndEditing ? this.props.onEndEditing() : null}
          onFocus={() => this.props.onFocus ? this.props.onFocus() : null}
          value={this.props.value}
          style={[
            styles.textInput,
            {...this.props.style}
          ]}
          placeholderTextColor={Colors.placeholder}
        />
        {
          this.props.hasOwnProperty('errorText') && this.props?.errorText !== ''
            ? <Text style={GeneralStyle.fieldError}>{this.props?.errorText}</Text>
            : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginVertical: 7
  },
  fieldLabel: {
    fontSize: 14,
    color: Colors.inputLabel
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.text,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 5,
    fontSize: 16,
    color: Colors.black
  },
  mandatoryText: {
    color: Colors.orange
  }
});
