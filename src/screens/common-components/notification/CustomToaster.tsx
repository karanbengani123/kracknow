import * as React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import NavigationService from '../../navigations/NavigationSevice';

import Colors from '../../constants/Colors';

interface Props {
  notificationText: string;
  onClose: () => void;
}

interface State {
}

export default class CustomToaster extends React.PureComponent<Props, State> {
  readonly _animatedValue: any;

  constructor(props: Props) {
    super(props);

    this._animatedValue = new Animated.Value(-70);
    this._callToastHandler();
  }

  _callToastHandler() {
    setTimeout(() => {
      Animated.timing(
        this._animatedValue,
        {
          toValue: 0,
          duration: 350,
          useNativeDriver: true
        }).start()
    }, 2000);
  }

  _closeToastHandler() {
    Animated.timing(
      this._animatedValue,
      {
        toValue: -150,
        duration: 350,
        useNativeDriver: true
      }).start(this.props.onClose);
  }


  render(): React.ReactNode {
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: this._animatedValue }] }
        ]}
      >
        <Ionicons
          name={'information-circle-outline'}
          size={20}
          color="blue"
        // style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 2, marginLeft: 15, marginRight:15 }}
        />

        <View style={{ width: '85%', marginLeft: 10 }}>
          <Text style={styles.toasterText}>
            {this.props.notificationText}
          </Text>
          <Text
            style={styles.viewText}
            onPress={() => {
              this._closeToastHandler();
              // NavigationService.navigate('Notifications');
            }}
          ></Text>
        </View>

        <Ionicons
          name={'close'}
          size={18}
          color={Colors.white}
          style={{ padding: 5 }}
          onPress={() => this._closeToastHandler()}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 52,
    backgroundColor: '#000000',
    position: 'absolute',
    left: 0,
    top: 70,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9999,
    // paddingVertical: 5,
    paddingHorizontal: 12
  },
  toasterText: {
    color: Colors.white,
    fontSize: 12,
    paddingTop: 17
  },
  viewText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
    padding: 2
  }
});
