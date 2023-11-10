import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors';

interface Props {
  size: 'small' | 'large';
  style?: any;
}

interface State {
}

export default class LoadingView extends React.PureComponent<Props, State> {
  render(): React.ReactNode {
    return (
      <View style={this.props.style ? {...this.props.style} : styles.container}>
        <ActivityIndicator size={this.props.size} color={Colors.primary}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
