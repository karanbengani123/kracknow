import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  navigation: any;
}

interface State {
}

export default class FeedScreen extends React.Component<Props, State> {
  render(): React.ReactNode {
    return (
      <View
        style={styles.container}
      >
        <Text>Feed Screen works !!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
