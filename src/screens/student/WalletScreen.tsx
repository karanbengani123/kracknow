// import * as React from 'react'
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Button,
//   TouchableOpacity,
//   useWindowDimensions,
//   ScrollView,
//   FlatList,
//   TextInput,
//   Alert,
//   Modal,
//   Pressable,
//   ActivityIndicator
// } from 'react-native'
// import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk'
// import { PayPaymentApi, WalletBalanceApi } from '../../api-services/User.api'
// import Environment from '../../screens/constants/Environment'
// import Colors from '../constants/Colors'
// import { FormStyle } from '../styles/Styles'
// import HeaderBack from './HeaderBack'

// interface Props {
//   navigation: any
// }

// interface State {
//   orderAmount: string;
//   blankError: string;
//   isPressed: boolean;
//   balance: number;


// }

// export default class WalletScreen extends React.Component<Props, State> {
//   private focusListener: any;

//   constructor(props: Props) {
//     super(props)
//     this.state = {
//       orderAmount: '',
//       blankError: '',
//       isPressed: false,
//       balance: 0
//     }
//   }

//   componentDidMount(): void {
//     this._getWalletBalanceHandler();
//     this.focusListener = this.props.navigation.addListener('didFocus', () => {
//       this._getWalletBalanceHandler();
//     })
//   }

//   componentWillUnmount(): void {
//     this.setState = () => {
//       return;
//     };
//     // this.focusListener.remove();
//   }

//   paymentInitiate() {

//     this.setState({ isPressed: true });

//     // debugger;
//     if (this.state.orderAmount === "") {
//       this.setState({
//         blankError: 'Please enter amount',
//         isPressed: false

//       })
//     }
//     if (Number(this.state.orderAmount) < 11) {
//       this.setState({
//         blankError: 'Amount must be greater than 10',
//         isPressed: false
//       })
//     }

//     const amount: number = parseInt(this.state.orderAmount)
//     PayPaymentApi(amount)
//       .then((response) => response.json())
//       .then((data) => {
//         const web = {
//           ...data.payload,
//           orderNote: '',
//           notifyUrl: 'https://api.kracknow.com/webhook/cashfree'
//         }
//         // web.appId="CF106068CCI74BERTSATTOE5CQO0"
//         console.log(',,,,,,,,,', data.payload)
//         web.orderAmount = String(web.orderAmount)
//         RNPgReactNativeSDK.startPaymentWEB(
//           web,
//           Environment.CASHFREE_ENVIRONMENT,
//           (response: any) => {
//             const result = JSON.parse(response)
//             console.log('result', result.orderAmount)
//             // const mixObject = {};
//             // Object.assign(mixObject, { transactionType: 'INBOUND' });
//             let payloadObj = {
//               orderId: result.orderId,
//             }
//             this.setState({
//               isPressed: false,
//               orderAmount: ''
//             });
//             console.log("payloadObj", payloadObj)
//             // debugger   

//           })

//       })
//     // debugger;
//     // this.setState({
//     //   isPressed: false,
//     //   orderAmount: ''
//     // });

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

//   render(): React.ReactNode {
//     return (
//       // onChangeText={(text) => this.setState({ orderAmount: text })}
//       // onPress={this.paymentInitiate.bind(this)}
//       <ScrollView showsVerticalScrollIndicator={false}>
//           <HeaderBack navigation={this.props.navigation} name="" />

//         <View style={{ backgroundColor: '#1E276F', alignItems: 'center' }}>
//           <View style={{ alignItems: "center", borderStyle: "solid", borderRadius: 15, borderColor: "white", borderWidth: 2, padding: 30, margin: 40, display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
//             <View style={{ alignItems: "center", justifyContent: 'center' }}>
//               <Text style={{ color: 'white' }}>Available Balance</Text>
//               <Text style={{
//                 fontSize: 14,
//                 fontWeight: '700', marginTop: 3, color: 'white'
//               }}>{'\u20B9'}{this.state.balance}</Text>
//             </View>
//           </View> 
//         </View>


//         <View style={{justifyContent:'center', flexDirection:'row', alignItems:'center' }}>
//           <Text style={{ fontSize: 20, }}>+ {'\u20B9'}</Text>
//           <TextInput
//             onChangeText={(text) => this.setState({ orderAmount: text, blankError: "" })}
//             keyboardType='numeric'
//             style={{ borderStyle: "solid", borderBottomColor: '#1E276F', borderBottomWidth: 1, color: 'black', width:'20%' }}
//             value={this.state.orderAmount}
//           >
//           </TextInput>
//         </View>

//         <View style={{ alignSelf: 'center' }}>
//           {
//             this.state.blankError !== "" &&
//             <Text style={FormStyle.errorText}>{this.state.blankError}</Text>
//           }
//         </View>

//         {/* <View>
//           <Text
//             style={{ fontSize: 20, position: 'absolute', bottom: 10, left: 80 }}
//           >
//             + {'\u20B9'}
//           </Text>
//           <TextInput
//             onChangeText={(text) => this.setState({ orderAmount: text })}
//             keyboardType="numeric"
//             style={{
//               borderStyle: 'solid',
//               borderBottomColor: '#1E276F',
//               borderBottomWidth: 1,
//               color: 'black',
//               marginRight: 120,
//               marginLeft: 120,
//               position: 'relative'
//             }}
//           ></TextInput>
//         </View> */}

//         <View style={{ padding: 10, marginLeft: 60, marginRight: 60, marginTop: 120 }}>
//           <Text>
//             You will be redirect to payment getway to pay via various option they provide
//           </Text>
//         </View>

//         <View style={{ alignItems: 'center', marginTop: 120 }}>
//           <TouchableOpacity onPress={this.paymentInitiate.bind(this)} style={styles.loginBtn} >
//             {/* <Text style={{ color: "white", fontWeight: "700" }}>Add now</Text> */}
//             <Text style={{ color: "white", marginTop: 15 }}>
//               {
//                 !this.state.isPressed ? 'Add now' : ''
//               }
//             </Text>
//             {
//               !this.state.isPressed
//                 ? <Text></Text>
//                 :
//                 <View style={{ marginBottom: 20 }}>
//                   <ActivityIndicator
//                     size={'small'}
//                     color={Colors.white}
//                   />
//                 </View>
//             }
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   root: {
//     // alignItems: 'center',
//     // padding: 20,
//   },
//   //
//   profile: {
//     height: 80,
//     backgroundColor: '#1E276F',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center'
//   },
//   TextInput: {
//     height: 50,
//     flex: 1,
//     padding: 10,
//     marginLeft: 1,
//   },
//   loginBtn: {
//     width: '80%',
//     borderRadius: 10,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//     backgroundColor: '#1E276F'
//   }
// })



import * as React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  FlatList,
  TextInput,
  Alert,
  Modal,
  Pressable,
  ActivityIndicator
} from 'react-native'
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk'
import { PayPaymentApi, WalletBalanceApi, getToken, postaddAmount } from '../../api-services/User.api'
import Environment from '../../screens/constants/Environment'
import Colors from '../constants/Colors'
import { FormStyle } from '../styles/Styles'
import HeaderBack from './HeaderBack'
import DocumentPicker from 'react-native-document-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Props {
  navigation: any
}

interface State {
  orderAmount: string;
  blankError: string;
  isPressed: boolean;
  balance: number;


}

export default class WalletScreen extends React.Component<Props, State> {
  private focusListener: any;

  constructor(props: Props) {
    super(props)
    this.state = {
      orderAmount: '',
      blankError: '',
      isPressed: false,
      sendResponceerr: '',
      balance: 0,
      selectedFile: null,
      transactionid: "",
      filename: "",
      amount: '',
      tokenerror: "",
    }
  }

  componentDidMount(): void {
    this._getWalletBalanceHandler();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this._getWalletBalanceHandler();
    })
  }

  componentWillUnmount(): void {
    this.setState = () => {
      return;
    };
  }

  paymentInitiate() {

    this.setState({ isPressed: true });

    // debugger;
    if (this.state.amount === "") {
      this.setState({
        blankErroramt: 'Please enter amount',
        isPressed: false

      })
    } else {
      if (Number(this.state.amount) < 11) {
        this.setState({
          blankError: 'Amount must be greater than 10',
          isPressed: false
        })
      }
    }
    if (this.state.selectedFile === null && this.state.transactionId === "") {
      this.setState({
        blankErrorid: 'Please enter TransactionId or Imgae',
        isPressed: false
      })
    }


    let data = { transactionImage: this.state.selectedFile, transactionId: this.state.transactionid, amount: this.state.amount }
    let formData = new FormData();
    formData.append("transactionid", this.state.transactionid);
    formData.append("transactionimg", this.state.selectedFile);
    formData.append("amount", this.state.amount);
    console.log(data)
    postaddAmount(formData)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.setState({ transactionid: '', selectedFile: '', amount: '', filename: '' })
      }).catch((err) => {
        // this.setState({ sendResponceerr: err })
      })

    // debugger;
    // this.setState({
    //   isPressed: false,
    //   orderAmount: ''
    // });

  }

  _getWalletBalanceHandler(): void {
    // <ActivityIndicator size="small" color="#0000ff" />
    WalletBalanceApi()
      .then(response => {
        const statusCode = response.status;
        const data = statusCode === 200 ? response.json() : [];
        console.log('****************', response.json())
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


  pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(result[0].name);
      this.setState({ selectedFile: result });
      this.setState({ filename: result[0].name })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        console.log(err)
        Alert.alert('Error', 'Could not pick a file.');
      }
    }
  };

  render(): React.ReactNode {
    console.log(this.state.selectedFile);

    return (
      // onChangeText={(text) => this.setState({ orderAmount: text })}
      // onPress={this.paymentInitiate.bind(this)}
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBack navigation={this.props.navigation} name="" />

        <View style={{ backgroundColor: '#1E276F', alignItems: 'center' }}>
          <View style={{ alignItems: "center", borderStyle: "solid", borderRadius: 15, borderColor: "white", borderWidth: 2, padding: 30, margin: 40, display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
            <View style={{ alignItems: "center", justifyContent: 'center' }}>
              <Text style={{ color: 'white' }}>Available Balance</Text>nb
              <Text style={{
                fontSize: 14,
                fontWeight: '700', marginTop: 3, color: 'white'
              }}>{'\u20B9'}{this.state.balance}</Text>
            </View>\
          </View>
        </View>


        {/* <View style={{justifyContent:'center', flexDirection:'row', alignItems:'center' }}>
          <Text style={{ fontSize: 20, }}>+ {'\u20B9'}</Text>
          <TextInput
            onChangeText={(text) => this.setState({ orderAmount: text, blankError: "" })}
            keyboardType='numeric'
            style={{ borderStyle: "solid", borderBottomColor: '#1E276F', borderBottomWidth: 1, color: 'black', width:'20%' }}
            value={this.state.orderAmount}
          >
          </TextInput>
        </View> */}
        <View style={styles.container1}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Amount"
              placeholderTextColor="black"
              onChangeText={(text) => this.setState({ amount: text, blankErroramt: "" })}
              value={this.state.amount}
            />
          </View>
          <View style={{ alignSelf: 'center' }}>
            {
              this.state.blankErroramt !== "" &&
              <Text style={FormStyle.errorText}>{this.state.blankErroramt}</Text>
            }
            {
              this.state.blankError !== "" &&
              <Text style={FormStyle.errorText}>{this.state.blankError}</Text>
            }
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Transaction ID"
              placeholderTextColor="black"
              onChangeText={(text) => this.setState({ transactionid: text, transactionid: '' })}
              value={this.state.transactionid}
            />
          </View>
          {
            this.state.blankErrorid !== "" &&
            <Text style={FormStyle.errorText}>{this.state.blankErrorid}</Text>
          }
          {/* <TextInput
              style={styles.TextInput}
              placeholder="Enter First Name"
              placeholderTextColor="black"
              onChangeText={(text) => this.setState({ transactionimg: text })}
              value={this.state.transactionimg}
            /> */}
          {/* <View style={styles.inputView}>


            <TouchableOpacity onPress={this.pickDocument} >
              <div style={{ display: "flex", justifyContent: "start" }}>

                <Text style={{ textAlign: 'center' }}>{this.state.filename ? this.state.filename : 'Pick a Files'}</Text>
              </div>
            </TouchableOpacity>
          </View> */}
          <View style={styles.inputView}>
            {/* <TouchableOpacity onPress={this.pickDocument} style={styles.pickFileButton}>
              <Text style={styles.pickFileButtonText}>
                {this.state.filename ? this.state.filename : 'Pick a File'}
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.button} onPress={this.pickDocument} >
              <Text>{this.state.filename ? this.state.filename : 'Pick a File'}</Text>
            </TouchableOpacity>
          </View>
          {/* {
            this.state.sendResponceerr !== "" &&
            <Text style={FormStyle.errorText}>{this.state.sendResponceerr}</Text>
          } */}
        </View>





        <View style={{ alignItems: 'center', marginTop: 120 }}>
          <TouchableOpacity onPress={this.paymentInitiate.bind(this)} style={styles.loginBtn} >
            {<Text style={{ color: "white", fontWeight: "700", marginTop: 15 }}>Add now</Text>}
            {/* <Text style={{ color: "white", marginTop: 15 }}>
              {
                !this.state.isPressed ? 'Add now' : ''
              }
            </Text> */}
            {
              !this.state.isPressed
                ? <Text></Text>
                :
                <View style={{ marginBottom: 20 }}>
                  <ActivityIndicator
                    size={'small'}
                    color={Colors.white}
                  />
                </View>
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    // alignItems: 'center',
    // padding: 20,
  },
  //
  profile: {
    height: 80,
    backgroundColor: '#1E276F',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 1,
  },
  button: {
    display: "flex",
    // alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: '#DDDDDD',
    padding: 10,
  },
  container1: {
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },


  pickFileButton: {
    display: "flex",
    justifyContent: "start",
  },

  pickFileButtonText: {
    textAlign: 'center',
  },
  inputView: {
    backgroundColor: "#e4e8e5",
    borderRadius: 10,
    width: "80%",
    height: 45,
    marginBottom: 10,
    color: "red",
    marginTop: 10,
    backgroundColor: "#fff",
    // alignItems: "center",
  },
  loginBtn: {
    width: '80%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#1E276F'
  }
})
