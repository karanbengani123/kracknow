import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import Colors from '../constants/Colors';

interface Props {
  item: {
    name: string;
    value: string;
  };
  color: string;
  status: boolean;
  disabled?: boolean;
  onPress: (status: any) => void;
  style?: any;
}

interface State {
}

export default class RNRadioBox extends React.PureComponent<Props, State> {
  render(): React.ReactNode {
    return (
      <View style={[
        styles.fieldContainer,
        this.props.style
      ]}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.container,
            {borderColor: this.props.color, opacity: this.props.disabled ? 0.5 : 1}
          ]}
          disabled={this.props.disabled}
          onPress={() => this.props.onPress(this.props.item.value)}
        >
          <View style={styles.radioBox}/>
          {
            this.props.status &&
            <Octicons
              name={'primitive-dot'}
              size={18}
              color={this.props.color}
              style={styles.radioBoxActive}
            />
          }
          <Text>{this.props.item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginVertical: 2
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioBox: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 10,
    height: 20,
    width: 20,
    marginRight: 10,
    marginVertical: 5,
    position: 'relative'
  },
  radioBoxActive: {
    position: 'absolute',
    top: 6,
    left: 5
  },
  radioBoxLabel: {
    color: Colors.black,
    fontSize: 16
  }
});
