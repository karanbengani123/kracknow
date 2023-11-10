import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Colors from '../constants/Colors';

interface Props {
  color: string;
  status: 'checked' | 'unchecked';
  onPress?: any;
}

interface State {
}

export default class Checkbox extends React.PureComponent<Props, State> {
  render(): React.ReactNode {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.container,
          {borderColor: this.props.color}
        ]}
        onPress={this.props.onPress}
      >
        {
          this.props.status === 'checked' &&
          <AntDesign
            name={'check'}
            size={14}
            color={this.props.color}
          />
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderRadius: 4,
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginVertical: 5
  }
});
