import * as React from 'react';
import { LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Colors from '../../constants/Colors';
import NormalList from './NormalList';

interface Props {
  dataSource: any;
  subKey: string;
  isMultiSelect: boolean;
  modalVisible: boolean;
  onUpdateModalStatus: (status) => void;
  selectedItems: any[];
  onSelectedItemChange: (items) => void;
}

interface State {
  expandable: boolean;
  modalVisible: boolean;
  selectedItems: any[];
}

export default class SectionedList extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      expandable: false,
      modalVisible: this.props.modalVisible,
      selectedItems: this.props.selectedItems
    };
  }

  render(): React.ReactNode {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.expandableContainer}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({expandable: !this.state.expandable});
          }}
        >
          <Text style={styles.label}>{this.props.dataSource.name}</Text>
          <FontAwesome
            name={this.state.expandable ? 'angle-up' : 'angle-down'}
            size={18}
            color={Colors.primary}
          />
        </TouchableOpacity>

        {
          this.state.expandable &&
          this.props.dataSource[this.props.subKey].map((subItem, index) => (
            <NormalList
              key={index.toString()}
              dataSource={subItem}
              isMultiSelect={this.props.isMultiSelect}
              modalVisible={this.props.modalVisible}
              onUpdateModalStatus={(status) => {
                this.setState({modalVisible: status}, () => {
                  this.props.onUpdateModalStatus(this.state.modalVisible);
                });
              }}
              selectedItems={this.props.selectedItems}
              onSelectedItemChange={(items) => {
                this.setState({selectedItems: items});
                this.props.onSelectedItemChange(this.state.selectedItems);
              }}
            />
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  expandableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  label: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '700'
  }
});
