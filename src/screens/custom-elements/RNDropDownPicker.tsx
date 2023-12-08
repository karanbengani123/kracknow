import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import Colors from '../constants/Colors';

interface Props {
  fieldLabel?: string;
  isMultiSelect: boolean;
  placeholder: string;
  isMandatory?: boolean;
  items: IDropDownPickerItems[];
  open: boolean;
  setOpen: (status) => void;
  value: string | string[];
  setValue: any;
}

interface State {
  value: string | string[];
  items: IDropDownPickerItems[];
}

export interface IDropDownPickerItems {
  label: string,
  value: string
}

export default class RNDropDownPicker extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      items: []
    };

    this.setValue = this.setValue.bind(this);
  }

  setValue(callback) {
    this.setState((state: any) => ({
      value: callback(state.value)
    }), () => {
      this.props.setValue(this.state.value);
    });
  }

  setItems(callback) {
    this.setState((state: any) => ({
      items: callback(state.items)
    }));
  }

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
        <DropDownPicker
          multiple={this.props.isMultiSelect}
          placeholder={this.props.placeholder}
          style={styles.inputContainerStyle}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          open={this.props.open}
          setOpen={() => {
            this.props.setOpen(!this.props.open)
          }}
          value={this.props.value}
          setValue={this.setValue}
          items={this.props.items}
          setItems={this.setItems}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 7
  },
  fieldLabel: {
    fontSize: 14,
    color: Colors.inputLabel
  },
  inputContainerStyle: {
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.text,
    height: 40.3,
    marginRight: 5,
    paddingLeft: 0,
    zIndex: 10
  },
  dropDownContainerStyle: {
    borderColor: Colors.text
  },
  mandatoryText: {
    color: Colors.orange
  }
});
