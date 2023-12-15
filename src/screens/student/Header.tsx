import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import { DrawerActions } from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetNotificationAPI, WalletBalanceApi } from '../../api-services/User.api';
import { HeaderNavigatorStyles } from '../../styles/HeaderNavigatorStyles';




interface Props {
  navigation: any;
}

interface State {
  balance: number;
  notificationList: any

}



export default class Header extends React.Component<Props, State> {
  private focusListener: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      balance: 0,
      notificationList: {}

    };


  }



  componentDidMount(): void {
    this._getWalletBalanceHandler();
    this._getNotificationListHandler();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this._getWalletBalanceHandler();
      this._getNotificationListHandler();
    })
  }

  componentWillUnmount(): void {
    this.setState = () => {
      return;
    };
    // this.focusListener.remove();
  }


  _getWalletBalanceHandler(): void {
    WalletBalanceApi()
      .then(response => {
        const statusCode = response.status;
        const data = statusCode === 200 ? response.json() : [];
        return Promise.all([statusCode, data]).then(res => ({
          statusCode: res[0],
          data: res[1]
        }));
      })
      .then((res: {
        statusCode: number,
        data: {
          payload: {
            balance: any;
            response: any[],
          }
          message: string
        }
      }) => {
        // debugger;
        if (res.statusCode === 200) {
          this.setState({
            balance: res.data.payload.balance.toFixed(2)
          });
        }
      });
  }

  _getNotificationListHandler(): void {
    // debugger;
    GetNotificationAPI()
      .then(response => {
        const statusCode = response.status;
        const payload = statusCode === 200 ? response.json() : [];

        return Promise.all([statusCode, payload]).then(res => ({
          statusCode: res[0],
          payload: res[1]
        }));
      })
      .then((res: {
        payload: any;
        statusCode: number,

      }) => {
        // debugger;
        this.setState({
          notificationList: res.payload.payload.rows
        });

      });

  }

  render(): React.ReactNode {
    return (

      <View style={{ flexDirection: 'row', backgroundColor: 'white', paddingHorizontal: 10, padding: 10, }}>
        <Ionicons
          name={'menu'}
          size={25}
          color={Colors.black}
          style={{ paddingLeft: 5, paddingRight: 0, }}
          onPress={() => this.props.navigation.openDrawer()}
        />


        <View style={{ position: 'absolute', right: 0, bottom: 8, flexDirection: 'row' }}>
          <Text onPress={() => this.props.navigation.navigate("WalletNavigator")} style={{
            fontSize: 14,
            fontWeight: '700', marginTop: 3, color: 'black',
          }}>My Wallet: </Text>
          <Text onPress={() => this.props.navigation.navigate("WalletNavigator")} style={{
            fontSize: 14,
            fontWeight: '700', marginTop: 3, color: 'red',
          }}>{'\u20B9'}{this.state.balance}</Text>

          <Ionicons
            name={'notifications-outline'}
            size={25}
            color="black"
            style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 2, marginLeft: 15, marginRight: 15 }}
            onPress={() => this.props.navigation.navigate('Notification')}
          />
        </View>



      </View>


    );
  }
}

const styles = StyleSheet.create({



});


