import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colors from '../constants/Colors';

interface Props {
  fieldLabel?: string;
  isMultiSelect: boolean;
  isMandatory?: boolean;
  placeholder: string;
  searchPlaceholder: string;
  expandDropDowns?: boolean;
  items: ISectionedDropDownPickerItems[];
  onSelectedItemsChange: (items) => void;
  selectedItems: string[];
}

interface State {
}

export interface ISectionedDropDownPickerItems {
  id: string;
  name: string;
  children: {
    id: string;
    name: string;
  }[];
}

const Icons = {
  search: {
    name: 'search',
    size: 24
  },
  arrowUp: {
    name: 'keyboard-arrow-up',
    size: 22
  },
  arrowDown: {
    name: 'keyboard-arrow-down',
    size: 22
  },
  selectArrowDown: {
    name: 'keyboard-arrow-down',
    size: 24
  },
  close: {
    name: 'close',
    size: 16
  },
  check: {
    name: 'check',
    size: 16
  },
  cancel: {
    name: 'cancel',
    size: 18
  }
};

export default class RNSectionedDropDownPicker extends React.PureComponent<Props, State> {
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
        <SectionedMultiSelect
          single={!this.props.isMultiSelect}
          icons={Icons}
          IconRenderer={MaterialIcons}
          items={this.props.items}
          uniqueKey={'id'}
          subKey={'children'}
          selectText={this.props.placeholder}
          showDropDowns={true}
          expandDropDowns={this.props.expandDropDowns}
          readOnlyHeadings={true}
          searchPlaceholderText={this.props.searchPlaceholder}
          onSelectedItemsChange={(items) => this.props.onSelectedItemsChange(items)}
          selectedItems={this.props.selectedItems}
          selectedIconOnLeft={true}
          hideConfirm={!this.props.isMultiSelect}
          chipRemoveIconComponent={() => (
            <Ionicons
              name={'close'}
              size={14}
              color={Colors.text}
              style={{marginHorizontal: 6}}
            />
          )}
          colors={{
            primary: Colors.primary
          }}
          styles={{
            selectToggle: styles.inputContainerStyle,
            selectToggleText: this.props.selectedItems.length === 0 ? {color: Colors.placeholder} : styles.textInput,
            chipContainer: {
              borderColor: Colors.chipBorder
            },
            chipText: {
              fontSize: 12,
              color: Colors.text
            }
          }}
        />
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
    color: Colors.black
  },
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.text,
    paddingVertical: 6,
    marginTop: -4
  },
  textInput: {
    fontSize: 16,
    color: Colors.black
  },
  mandatoryText: {
    color: Colors.orange
  }
});
