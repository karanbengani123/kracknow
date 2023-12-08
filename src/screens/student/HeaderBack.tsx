// import * as React from 'react';
// import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, FlatList } from 'react-native';
// import Colors from '../constants/Colors';
// import { DrawerActions } from 'react-navigation-drawer';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { GetNotificationAPI, WalletBalanceApi } from '../../api-services/User.api';
// import { HeaderNavigatorStyles } from '../../styles/HeaderNavigatorStyles';




// interface Props {
//   navigation: any;
//   name: any
// }

// interface State {
//   balance: number;
//   notificationList: any

// }



// export default class HeaderBack extends React.Component<Props, State> {
//   private focusListener: any;

//   constructor(props: Props) {
//     super(props);

//     this.state = {
//       balance: 0,
//       notificationList: {}

//     };


//   }



//   componentDidMount(): void {
//     this._getWalletBalanceHandler();
//     this._getNotificationListHandler();
//     this.focusListener = this.props.navigation.addListener('didFocus', () => {
//       this._getWalletBalanceHandler();
//       this._getNotificationListHandler();
//     })
//   }

//   componentWillUnmount(): void {
//     // this.setState = () => {
//     //   return;
//     // };
//     this.focusListener.remove();
//   }

//   _getWalletBalanceHandler(): void {
//     // <ActivityIndicator size="small" color="#0000ff" />
//     WalletBalanceApi()
//       .then(response => {
//         const statusCode = response.status;
//         const data = statusCode === 200 ? response.json() : [];
//         console.log('****************', response.json())
//         return Promise.all([statusCode, data]).then(res => ({
//           statusCode: res[0],
//           data: res[1]
//         }));
//       })
//       .then((res: {
//         statusCode: number,
//         data: {
//           payload: {
//             balance: any;
//             response: any[],
//           }
//           message: string
//         }
//       }) => {
//         // debugger;
//         if (res.statusCode === 200) {
//           this.setState({
//             balance: res.data.payload.balance.toFixed(2)
//           });
//         }
//       });
//   }

//   _getNotificationListHandler(): void {
//     // debugger;
//     GetNotificationAPI()
//       .then(response => {
//         const statusCode = response.status;
//         const payload = statusCode === 200 ? response.json() : [];

//         return Promise.all([statusCode, payload]).then(res => ({
//           statusCode: res[0],
//           payload: res[1]
//         }));
//       })
//       .then((res: {
//         payload: any;
//         statusCode: number,

//       }) => {
//         // debugger;
//         this.setState({
//           notificationList: res.payload.payload.rows
//         });

//       });

//   }

//   render(): React.ReactNode {
//     // console.log('0000000000000000000000000000000000000000', this.state.balance)
//     // console.log('----********************************----', this.props.navigation)
//     return (

//       <View style={{ flexDirection: 'row', backgroundColor: 'white', paddingHorizontal: 10, padding: 15, }}>
//         <Ionicons
//           name={'arrow-back'}
//           size={20}
//           color={Colors.black}
//           style={{ paddingLeft: 5, paddingRight: 0, }}
//           onPress={() => this.props.navigation.goBack()}
//         />

//         <Text style={{
//           color: "black",
//           fontSize: 16, fontWeight: '700', marginLeft: 10
//         }}>{this.props.name}</Text>
//       </View>


//     );
//   }
// }

// const styles = StyleSheet.create({



// });



import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import { DrawerActions } from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetNotificationAPI, WalletBalanceApi } from '../../api-services/User.api';
import { HeaderNavigatorStyles } from '../../styles/HeaderNavigatorStyles';

interface Props {
  navigation: any;
  name: any
}

interface State {
  balance: number;
  notificationList: any

}



export default class HeaderBack extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    // console.log('0000000000000000000000000000000000000000', this.state.balance)
    // console.log('----********************************----', this.props.navigation)
    return (

      <View style={{ flexDirection: 'row', backgroundColor: 'white', paddingHorizontal: 10, padding: 15, }}>
        <Ionicons
          name={'arrow-back'}
          size={20}
          color={Colors.black}
          style={{ paddingLeft: 5, paddingRight: 0, }}
          onPress={() => this.props.navigation.goBack()}
        />

        <Text style={{
          color: "black",
          fontSize: 16, fontWeight: '700', marginLeft: 10
        }}>{this.props.name}</Text>
      </View>


    );
  }
}

const styles = StyleSheet.create({



});


