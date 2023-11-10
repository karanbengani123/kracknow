import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import Colors from '../../constants/Colors';

interface Props {
  dataSource: any;
  displayColor?: boolean;
  isMultiSelect: boolean;
  modalVisible: boolean;
  onUpdateModalStatus: (status) => void;
  selectedItems: any[];
  onSelectedItemChange: (items) => void;
}

interface State {
  selected: boolean;
}

export default class NormalList extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.selectedItems.length > 0
        ? this.props.selectedItems.findIndex((item) => item.uuid === this.props.dataSource.uuid) !== -1
        : false
    };
  }

  _updateHandler(): void {
    if (this.props.isMultiSelect) {
      this.setState({
        selected: !this.state.selected
      }, () => {
        if (this.state.selected) {
          this.props.selectedItems.push(this.props.dataSource);
        } else {
          const index = this.props.selectedItems.findIndex((item) => item.uuid === this.props.dataSource.uuid);
          this.props.selectedItems.splice(index, 1);
        }

        this.props.onSelectedItemChange(this.props.selectedItems);
        this.props.onUpdateModalStatus(true);
      });
    } else {
      this.setState({
        selected: !this.state.selected
      }, () => {
        if (this.state.selected) {
          this.props.selectedItems.splice(0, this.props.selectedItems.length);
          this.props.selectedItems.push(this.props.dataSource);
          this.props.onUpdateModalStatus(false);
        } else {
          const index = this.props.selectedItems.findIndex((item) => item.uuid === this.props.dataSource.uuid);
          this.props.selectedItems.splice(index, 1);
          this.props.onUpdateModalStatus(true);
        }

        this.props.onSelectedItemChange(this.props.selectedItems);
      });
    }
  }

  _isSelected(): boolean {
    return this.state.selected &&
      this.props.selectedItems.findIndex((item) => item.uuid === this.props.dataSource.uuid) !== -1;
  }

  render(): React.ReactNode {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.listContainer}
        onPress={() => this._updateHandler()}
      >
        {
          this._isSelected() &&
          <Feather
            name={'check'}
            size={16}
            color={Colors.primary}
            style={{paddingRight: 7}}
          />
        }
        {
          this.props.displayColor &&
          <View style={[
            styles.colorBox,
            {backgroundColor: this.props.dataSource?.code}
          ]}/>
        }
        <Text style={styles.label}>{this.props.dataSource.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 4
  },
  label: {
    color: Colors.text,
    fontSize: 14
  },
  colorBox: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 7
  }
});
