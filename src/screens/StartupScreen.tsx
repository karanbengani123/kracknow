import * as React from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { LogoutHandler, TokenDecoder } from '../helper-functions/Helper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Environment from "./constants/Environment";

interface Props {
  navigation: any;
}

interface State {
}



export default class StartupScreen extends React.PureComponent<Props, State> {
  componentDidMount(): void {
    this._autoLoginHandler().then(async isSessionValid => {
      if (!isSessionValid) {
        setTimeout(() => {
          this.props.navigation.replace('Authentication'); 
        }, 3000); 
      }
      else {
        setTimeout(() => {
          this.props.navigation.replace('Student');
        }, 3000);
      } 
    });


    // setTimeout(() => {
    //   this.props.navigation.navigate('SignIn');
    // }, 2000);
  }

  async _autoLoginHandler() {
    const token = await AsyncStorage.getItem(Environment.PROJECT + 'token');

    if (!token) {
      return false;
    }

    const tokenDecoder = TokenDecoder(token);
    const expirationTime = tokenDecoder.exp * 1000 - 60000;

    if (new Date().getTime() < expirationTime) {
      return true;
    } else {
      LogoutHandler(this.props.navigation).then();
      return false;
    }
  }

  render(): React.ReactNode {
    return (
      <View
        style={styles.container}
      >
        {/* <ActivityIndicator
          size={'large'}
          color={'blue'}
        />  */}
        <Image
          style={styles.image}
          source={require("../../assets/images/Krackow.png")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    // marginBottom: 40,
    // width: '100%',
    maxWidth: 160,
    maxHeight: 250,
  },
});
