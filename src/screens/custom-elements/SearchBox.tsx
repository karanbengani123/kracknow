import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';

import RNTextInput from './RNTextInput';

interface Props {
  searchText?: string;
  onChangeText: (text: string) => void;
  style?: any;
}

interface State {
}

export default class SearchBox extends React.PureComponent<Props, State> {
  render(): React.ReactNode {
    return (
      <View style={[styles.searchContainer, this.props.style]}>
        <RNTextInput
          autoCapitalize={'none'}
          placeholder={'Search'}
          onChangeText={(text) => this.props.onChangeText(text)}
          style={{borderBottomColor: Colors.border}}
          value={this.props.searchText}
        />
        <Ionicons
          name={'search'}
          size={16}
          color={Colors.black}
          style={styles.searchIcon}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    position: 'relative',
    paddingHorizontal: 20,
    marginVertical: 7
  },
  searchIcon: {
    position: 'absolute',
    top: 15,
    right: 20
  }
});
