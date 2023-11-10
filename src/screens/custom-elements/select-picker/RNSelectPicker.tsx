import * as React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../constants/Colors';

import RNTextInput from '../RNTextInput';
import SectionedList from './SectionedList';
import NormalList from './NormalList';

interface Props {
  fieldLabel?: string;
  isMandatory?: boolean;
  placeholder?: string;
  displayColor?: boolean;
  isMultiSelect: boolean;
  sectioned?: boolean;
  subKey?: string;
  items: any[];
  onSelectedItemsChange: (items) => void;
  selectedItems: any[];
  showChips?: boolean;
  updateItems?: (items) => void;
}

interface State {
  modalVisible: boolean;
  search: string;
  selectedItems: any[];
}

export default class RNSelectPicker extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      search: '',
      selectedItems: []
    };
  }

  _filterItems(search: string) {
    /*const subKey = this.props.subKey ? this.props.subKey : '';
    const newFilteredItems = this.props.items
      .filter((item) => !!item[subKey]
        .find((subItem) => subItem.name.toLocaleLowerCase().match(search.toLocaleLowerCase())));

    return newFilteredItems.map((item) => {
      item[subKey] = item[subKey]
        .filter((subItem) => subItem.name.toLocaleLowerCase().match(search.toLocaleLowerCase()));
      return item;
    });*/
    return this.props.items
      .filter((item) => item.name.toLocaleLowerCase().match(search.toLocaleLowerCase()));
  }

  _closeModalHandler(): void {
    this.setState({modalVisible: false});
  }

  _updateItems(index: number): void {
    this.state.selectedItems.splice(index, 1);
    this.setState({
      selectedItems: this.state.selectedItems
    }, () => {
      this.props.onSelectedItemsChange(this.state.selectedItems);
    });
  }

  render(): React.ReactNode {
    const renderItems = this.state.search
      ? this._filterItems(this.state.search.trim())
      : this.props.items;

    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.setState({modalVisible: true})}
          style={styles.selectPickerContainer}
        >
          <RNTextInput
            fieldLabel={this.props.fieldLabel}
            isMandatory={this.props.isMandatory}
            placeholder={this.props.placeholder}
            editable={false}
            multiline={true}
            onChangeText={() => {
            }}
            value={
              this.props.isMultiSelect
                ?
                (
                  this.props.selectedItems.length !== 0
                    ? `${this.props.fieldLabel || this.props.placeholder} (${this.props.selectedItems.length} selected)`
                    : ''
                )
                :
                this.props.selectedItems.length !== 0 ? this.props.selectedItems[0].name : ''
            }
          />
          <MaterialIcons
            name={'keyboard-arrow-down'}
            size={24}
            color={Colors.black}
            style={styles.expandableIcon}
          />
        </TouchableOpacity>

        {
          this.props.showChips && this.props.selectedItems.length !== 0 &&
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {
              this.props.selectedItems.map((item, index) => (
                <View
                  key={index.toString()}
                  style={styles.labelContainer}
                >
                  <Text
                    style={styles.labelText}
                  >
                    {item.name}
                  </Text>
                  <Ionicons
                    name={'close'}
                    size={14}
                    color={Colors.text}
                    onPress={() => this._updateItems(index)}
                  />
                </View>
              ))
            }
          </View>
        }

        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this._closeModalHandler()}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <View style={styles.modalHeader}>
                <MaterialIcons
                  name={'search'}
                  size={24}
                  color={Colors.black}
                  style={{paddingRight: 10}}
                />
                <TextInput
                  autoCapitalize={'none'}
                  keyboardType={'default'}
                  placeholder={'Search...'}
                  placeholderTextColor={Colors.placeholder}
                  onChangeText={(text) => this.setState({search: text})}
                  value={this.state.search}
                  style={styles.searchTextInput}
                />
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'always'}
                removeClippedSubviews
                style={styles.modalBody}
              >
                {
                  renderItems.length === 0
                    ?
                    <Text style={styles.noDataText}>No data found</Text>
                    :
                    <View>
                      {
                        this.props.sectioned
                          ?
                          renderItems.map((item, index) => (
                            <SectionedList
                              key={index.toString()}
                              dataSource={item}
                              subKey={this.props.subKey ? this.props.subKey : ''}
                              isMultiSelect={this.props.isMultiSelect}
                              modalVisible={this.state.modalVisible}
                              onUpdateModalStatus={(status) => this.setState({modalVisible: status})}
                              selectedItems={this.props.selectedItems}
                              onSelectedItemChange={(items) => this.props.onSelectedItemsChange(items)}
                            />
                          ))
                          :
                          renderItems.map((item, index) => (
                            <NormalList
                              key={index.toString()}
                              dataSource={item}
                              selectedItems={this.props.selectedItems}
                              displayColor={this.props.displayColor}
                              isMultiSelect={this.props.isMultiSelect}
                              modalVisible={this.state.modalVisible}
                              onUpdateModalStatus={(status) => this.setState({modalVisible: status})}
                              onSelectedItemChange={(items) => this.props.onSelectedItemsChange(items)}
                            />
                          ))
                      }
                    </View>
                }
              </ScrollView>

              {
                this.props.isMultiSelect &&
                <TouchableOpacity
                  activeOpacity={0.4}
                  style={styles.modalFooter}
                  onPress={() => {
                    this.props.onSelectedItemsChange(this.props.selectedItems);
                    this.setState({modalVisible: false, search: ''});
                  }}
                >
                  <Text style={styles.footerText}>Confirm</Text>
                </TouchableOpacity>
              }

            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectPickerContainer: {
    position: 'relative'
  },
  expandableIcon: {
    position: 'absolute',
    right: 0,
    bottom: 15
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    flex: 1,
    backgroundColor: Colors.white,
    alignSelf: 'stretch',
    marginHorizontal: 18,
    marginVertical: 26,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden'
  },
  modalHeader: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 3
  },
  searchTextInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: 18,
    width: '100%'
  },
  modalBody: {
    paddingHorizontal: 10,
    marginVertical: 10
  },
  modalFooter: {
    backgroundColor: Colors.primary,
    paddingVertical: 10
  },
  footerText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  },
  noDataText: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center'
  },
  labelContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.chipBorder,
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 7,
    marginRight: 5,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelText: {
    fontSize: 12,
    color: Colors.text,
    marginRight: 5
  }
});
