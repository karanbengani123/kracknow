// // import * as React from 'react'
// // import {
// //   View,
// //   Text,
// //   Image,
// //   StyleSheet,
// //   Button,
// //   TouchableOpacity,
// //   useWindowDimensions,
// //   ScrollView,
// //   FlatList,
// //   TextInput,
// //   Alert,
// //   Modal,
// //   Pressable,
// //   ActivityIndicator
// // } from 'react-native'
// // import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk'
// // import { PayPaymentApi, WalletBalanceApi } from '../../api-services/User.api'
// // import Environment from '../../screens/constants/Environment'
// // import Colors from '../constants/Colors'
// // import { FormStyle } from '../styles/Styles'
// // import HeaderBack from './HeaderBack'

// // interface Props {
// //   navigation: any
// // }

// // interface State {
// //   orderAmount: string;
// //   blankError: string;
// //   isPressed: boolean;
// //   balance: number;


// // }

// // export default class WalletScreen extends React.Component<Props, State> {
// //   private focusListener: any;

// //   constructor(props: Props) {
// //     super(props)
// //     this.state = {
// //       orderAmount: '',
// //       blankError: '',
// //       isPressed: false,
// //       balance: 0
// //     }
// //   }

// //   componentDidMount(): void {
// //     this._getWalletBalanceHandler();
// //     this.focusListener = this.props.navigation.addListener('didFocus', () => {
// //       this._getWalletBalanceHandler();
// //     })
// //   }

// //   componentWillUnmount(): void {
// //     this.setState = () => {
// //       return;
// //     };
// //     // this.focusListener.remove();
// //   }

// //   paymentInitiate() {

// //     this.setState({ isPressed: true });

// //     // debugger;
// //     if (this.state.orderAmount === "") {
// //       this.setState({
// //         blankError: 'Please enter amount',
// //         isPressed: false

// //       })
// //     }
// //     if (Number(this.state.orderAmount) < 11) {
// //       this.setState({
// //         blankError: 'Amount must be greater than 10',
// //         isPressed: false
// //       })
// //     }

// //     const amount: number = parseInt(this.state.orderAmount)
// //     PayPaymentApi(amount)
// //       .then((response) => response.json())
// //       .then((data) => {
// //         const web = {
// //           ...data.payload,
// //           orderNote: '',
// //           notifyUrl: 'https://api.kracknow.com/webhook/cashfree'
// //         }
// //         // web.appId="CF106068CCI74BERTSATTOE5CQO0"
// //         console.log(',,,,,,,,,', data.payload)
// //         web.orderAmount = String(web.orderAmount)
// //         RNPgReactNativeSDK.startPaymentWEB(
// //           web,
// //           Environment.CASHFREE_ENVIRONMENT,
// //           (response: any) => {
// //             const result = JSON.parse(response)
// //             console.log('result', result.orderAmount)
// //             // const mixObject = {};
// //             // Object.assign(mixObject, { transactionType: 'INBOUND' });
// //             let payloadObj = {
// //               orderId: result.orderId,
// //             }
// //             this.setState({
// //               isPressed: false,
// //               orderAmount: ''
// //             });
// //             console.log("payloadObj", payloadObj)
// //             // debugger   

// //           })

// //       })
// //     // debugger;
// //     // this.setState({
// //     //   isPressed: false,
// //     //   orderAmount: ''
// //     // });

// //   }

// //   _getWalletBalanceHandler(): void {
// //     // <ActivityIndicator size="small" color="#0000ff" />
// //     WalletBalanceApi()
// //       .then(response => {
// //         const statusCode = response.status;
// //         const data = statusCode === 200 ? response.json() : [];
// //         console.log('****************', response.json())
// //         return Promise.all([statusCode, data]).then(res => ({
// //           statusCode: res[0],
// //           data: res[1]
// //         }));
// //       })
// //       .then((res: {
// //         statusCode: number,
// //         data: {
// //           payload: {
// //             balance: any;
// //             response: any[],
// //           }
// //           message: string
// //         }
// //       }) => {
// //         // debugger;
// //         if (res.statusCode === 200) {
// //           this.setState({
// //             balance: res.data.payload.balance.toFixed(2)
// //           });
// //         }
// //       });
// //   }

// //   render(): React.ReactNode {
// //     return (
// //       // onChangeText={(text) => this.setState({ orderAmount: text })}
// //       // onPress={this.paymentInitiate.bind(this)}
// //       <ScrollView showsVerticalScrollIndicator={false}>
// //           <HeaderBack navigation={this.props.navigation} name="" />

// //         <View style={{ backgroundColor: '#1E276F', alignItems: 'center' }}>
// //           <View style={{ alignItems: "center", borderStyle: "solid", borderRadius: 15, borderColor: "white", borderWidth: 2, padding: 30, margin: 40, display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
// //             <View style={{ alignItems: "center", justifyContent: 'center' }}>
// //               <Text style={{ color: 'white' }}>Available Balance</Text>
// //               <Text style={{
// //                 fontSize: 14,
// //                 fontWeight: '700', marginTop: 3, color: 'white'
// //               }}>{'\u20B9'}{this.state.balance}</Text>
// //             </View>
// //           </View> 
// //         </View>


// //         <View style={{justifyContent:'center', flexDirection:'row', alignItems:'center' }}>
// //           <Text style={{ fontSize: 20, }}>+ {'\u20B9'}</Text>
// //           <TextInput
// //             onChangeText={(text) => this.setState({ orderAmount: text, blankError: "" })}
// //             keyboardType='numeric'
// //             style={{ borderStyle: "solid", borderBottomColor: '#1E276F', borderBottomWidth: 1, color: 'black', width:'20%' }}
// //             value={this.state.orderAmount}
// //           >
// //           </TextInput>
// //         </View>

// //         <View style={{ alignSelf: 'center' }}>
// //           {
// //             this.state.blankError !== "" &&
// //             <Text style={FormStyle.errorText}>{this.state.blankError}</Text>
// //           }
// //         </View>

// //         {/* <View>
// //           <Text
// //             style={{ fontSize: 20, position: 'absolute', bottom: 10, left: 80 }}
// //           >
// //             + {'\u20B9'}
// //           </Text>
// //           <TextInput
// //             onChangeText={(text) => this.setState({ orderAmount: text })}
// //             keyboardType="numeric"
// //             style={{
// //               borderStyle: 'solid',
// //               borderBottomColor: '#1E276F',
// //               borderBottomWidth: 1,
// //               color: 'black',
// //               marginRight: 120,
// //               marginLeft: 120,
// //               position: 'relative'
// //             }}
// //           ></TextInput>
// //         </View> */}

// //         <View style={{ padding: 10, marginLeft: 60, marginRight: 60, marginTop: 120 }}>
// //           <Text>
// //             You will be redirect to payment getway to pay via various option they provide
// //           </Text>
// //         </View>

// //         <View style={{ alignItems: 'center', marginTop: 120 }}>
// //           <TouchableOpacity onPress={this.paymentInitiate.bind(this)} style={styles.loginBtn} >
// //             {/* <Text style={{ color: "white", fontWeight: "700" }}>Add now</Text> */}
// //             <Text style={{ color: "white", marginTop: 15 }}>
// //               {
// //                 !this.state.isPressed ? 'Add now' : ''
// //               }
// //             </Text>
// //             {
// //               !this.state.isPressed
// //                 ? <Text></Text>
// //                 :
// //                 <View style={{ marginBottom: 20 }}>
// //                   <ActivityIndicator
// //                     size={'small'}
// //                     color={Colors.white}
// //                   />
// //                 </View>
// //             }
// //           </TouchableOpacity>
// //         </View>
// //       </ScrollView>
// //     )
// //   }
// // }

// // const styles = StyleSheet.create({
// //   root: {
// //     // alignItems: 'center',
// //     // padding: 20,
// //   },
// //   //
// //   profile: {
// //     height: 80,
// //     backgroundColor: '#1E276F',
// //     display: 'flex',
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     alignItems: 'center'
// //   },
// //   TextInput: {
// //     height: 50,
// //     flex: 1,
// //     padding: 10,
// //     marginLeft: 1,
// //   },
// //   loginBtn: {
// //     width: '80%',
// //     borderRadius: 10,
// //     height: 50,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginTop: 20,
// //     backgroundColor: '#1E276F'
// //   }
// // })



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
import { BankdetailsApi, PayPaymentApi, WalletBalanceApi, getToken, postaddAmount } from '../../api-services/User.api'
import Environment from '../../screens/constants/Environment'
import Colors from '../constants/Colors'
import { FormStyle } from '../styles/Styles'
import HeaderBack from './HeaderBack'
import DocumentPicker from 'react-native-document-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as RNFS from 'react-native-fs';
import FlashMessage, { showMessage } from 'react-native-flash-message'
import Header from './Header'
import Ionicons from 'react-native-vector-icons/Ionicons';

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
      firstClick: false,
      banklist: [],
      selectedFile: null,
      transactionid: "",
      filename: "",
      amount: '',
      tokenerror: "",
      baseImg: "",
      sendMsgerr: ''
    }
  }

  componentDidMount(): void {
    this._getWalletBalanceHandler();
    this._getbankDetailshandler();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this._getWalletBalanceHandler();
      this._getbankDetailshandler();
    })
  }

  componentWillUnmount(): void {
    this.setState = () => {
      return;
    };
  }

  amountentered() {

    if (this.state.amount === "") {
      this.setState({
        blankErroramt: 'Please enter amount',
        isPressed: false

      })
    } else {
      this.setState({ firstClick: true })
    }
  }

  paymentInitiate() {
    // debugger;
    if (this.state.amount === "" || this.state.selectedFile === null && this.state.transactionid === "") {

      if (this.state.amount === "") {
        this.setState({
          blankErroramt: 'Please enter amount',
          isPressed: false

        })
      } else {
        this.setState({
          blankErroramt: '',
          isPressed: false
        })
      }

      if (this.state.selectedFile === null && this.state.transactionid === "") {
        this.setState({
          blankErrorid: 'Please enter TransactionId or Imgae',
          isPressed: false
        })
      }

      setTimeout(() => {
        this.setState({
          blankErrorid: '', blankErroramt: ''
        })
      }, 3000);
    } else {
      this.setState({ isPressed: true });

      // console.log('call--------------------', this.state.amount, this.state.transactionid, this.state.selectedFile, this.state.baseImg)
      let data = { transactionImage: this.state.selectedFile, transactionId: this.state.transactionid, amount: this.state.amount }
      postaddAmount(data)
        .then((data) => {
          this.setState({ isPressed: false });
          showMessage({
            message: "Successfully Applied",
            type: "success",
          });
          this.setState({ transactionid: '', selectedFile: '', amount: '', filename: '', blankErrorid: '', blankErroramt: '', firstClick: false });
        })
        .catch((err) => {
          showMessage({
            message: err,
            type: "danger",
          });
          this.setState({ sendMsgerr: err, isPressed: false })
          console.log('--------', err);
          // Handle error here
        });

    }


  }

  _getWalletBalanceHandler(): void {
    // <ActivityIndicator size="small" color="#0000ff" />
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

  _getbankDetailshandler(): void {
    // <ActivityIndicator size="small" color="#0000ff" />

    BankdetailsApi()
      .then((response) => {
        const statusCode = response.status;
        const data = statusCode === 200 ? response.json() : [];
        console.log("****************calllllllll", response.json());
        return Promise.all([statusCode, data]).then((res) => ({
          statusCode: res[0],
          data: res[1],
        }));
      })
      .then(
        (res: any) => {
          // debugger;
          if (res.statusCode === 200) {
            this.setState({
              banklist: res.data.payload[0],
            });
          }
        }
      ).catch((err: any) => {
        console.log(this.state)
      })
  }

  pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const addImage = result[0];
      // this.setState({ selectedFile: result });
      this.setState({ filename: result[0].name });

      if (result) {
        this.convertToBase64(result[0].uri); // Pass the file URI to the conversion function
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        console.log(err);
        // Handle other errors
      }
    }
  };

  convertToBase64 = async (fileUri) => {
    if (fileUri) {
      try {
        // const base64 = await fileToBase64(fileUri);
        const fileContent = await RNFS.readFile(fileUri, 'base64');
        this.setState({ selectedFile: `data:image/png;base64,${fileContent}` });
      } catch (error) {
        console.error('Error converting to base64:', error);
      }
    }
  };

  // fileToBase64 = async (uri) => {
  //   try {
  //     const fileContent = await RNFS.readFile(uri, 'base64');
  //     return fileContent;
  //   } catch (error) {
  //     throw error;
  //   }
  // };


  render(): React.ReactNode {
    return (
      // onChangeText={(text) => this.setState({ orderAmount: text })}
      // onPress={this.paymentInitiate.bind(this)}
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlashMessage position="top" />
        {/* <HeaderBack navigation={this.props.navigation} name="" /> */}
        {/* <Header navigation={this.props.navigation} /> */}
        <View style={{ padding: 20, flexDirection: "row" }}>
          <Ionicons
            name={"arrow-back"}
            size={25}
            color={Colors.black}
            onPress={() => this.props.navigation.goBack()}
          />

        </View>

        <View style={{ backgroundColor: '#1E276F', alignItems: 'center' }}>
          <View style={{ alignItems: "center", borderStyle: "solid", borderRadius: 15, borderColor: "white", borderWidth: 2, padding: 30, margin: 40, display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
            <View style={{ alignItems: "center", justifyContent: 'center' }}>
              <Text style={{ color: 'white' }}>Available Balance</Text>
              <Text style={{
                fontSize: 14,
                fontWeight: '700', marginTop: 3, color: 'white'
              }}>{'\u20B9'}{this.state.balance}</Text>
            </View>
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
          <Text style={{ fontWeight: 'bold', marginBottom: 15, width: "80%" }}>Please Send Money To The Provided Number only. After Sending The payment , insert the mandatory field</Text>
        </View>
        <View style={styles.container1}>

          <Image
            style={{ height: 200, width: 200 }}
            source={{
              uri: this.state.banklist.qrCodeImage,
            }}
          ></Image>
          <View style={{
            backgroundColor: "#e4e8e5",
            borderRadius: 10,
            width: "80%",
            height: 100,
            marginBottom: 10,
            color: "red",
            marginTop: 10,
            backgroundColor: "#fff",
          }}>

            <Text style={{ paddingLeft: 10 }}>Upi  :  <Text>{this.state.banklist.upi}</Text></Text>
            <Text style={{ paddingLeft: 10, paddingTop: 5 }}>Bank Name  :  <Text>{this.state.banklist.bankName}</Text></Text>
            <Text style={{ paddingLeft: 10, paddingTop: 5 }}>Account  :  <Text></Text>{this.state.banklist.account}</Text>
            <Text style={{ paddingLeft: 10, paddingTop: 5 }}>Ifsc  :  <Text></Text>{this.state.banklist.ifsc}</Text>
          </View>

          {this.state.firstClick ?
            <>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter Transaction ID"
                  placeholderTextColor="black"
                  onChangeText={(text) => this.setState({ transactionid: text, blankErroramt: "" })}
                  value={this.state.transactionid}
                />


              </View>


              <View style={styles.inputView}>

                <TouchableOpacity style={styles.button} onPress={this.pickDocument} >
                  <Text>{this.state.filename ? this.state.filename : 'Pick a File'}</Text>
                </TouchableOpacity>
              </View>
              {
                this.state.blankErrorid !== "" &&
                <Text style={styles.errorText}>{this.state.blankErrorid}</Text>
              }

            </>
            :
            <>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                  placeholderTextColor="black"
                  onChangeText={(text) => this.setState({ amount: text, blankErroramt: "" })}
                  value={this.state.amount.toString()} />
              </View>
              <View style={{ alignSelf: 'center' }}>
                {
                  this.state.blankErroramt !== "" &&
                  <Text style={styles.errorText}>{this.state.blankErroramt}</Text>
                }

              </View>
              <View style={{ position: 'relative', flexDirection: 'row' }}>

                <TouchableOpacity onPress={() => this.setState({ amount: 500, blankErroramt: "" })} style={styles.amountbtn}  >
                  {<Text style={styles.textamount} style={{ color: "white", fontWeight: "700" }}>500</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ amount: 1000, blankErroramt: "" })} style={styles.amountbtn} >
                  {<Text style={{ color: "white", fontWeight: "700" }}>1000</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ amount: 2000, blankErroramt: "" })} style={styles.amountbtn} >
                  {<Text style={{ color: "white", fontWeight: "700" }}>2000</Text>}
                </TouchableOpacity>
              </View>
              {/* <View style={{ display: 'flex', justifyContent: 'center' }}>
              </View> */}
            </>
          }
        </View>



        <View style={{ alignItems: 'center', marginTop: 10 }}>
          {
            this.state.sendMsgerr !== "" &&
            <Text style={styles.errorText}>{this.state.sendMsgerr}</Text>
          }
          {this.state.firstClick ?
            <TouchableOpacity onPress={this.paymentInitiate.bind(this)} style={styles.loginBtn} >
              {<Text style={{ color: "white", fontWeight: "700", marginTop: 15 }}>Submit</Text>}
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
            :
            <TouchableOpacity onPress={this.amountentered.bind(this)} style={styles.loginBtn} >
              {<Text style={{ color: "white", fontWeight: "700", marginTop: 15 }}>Submit</Text>}
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
          }

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
  container: {
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  pickFileButton: {
    display: "flex",
    justifyContent: "start",
  },
  errorText: {
    color: 'red',
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
  },
  amountbtn: {
    width: 60,
    borderRadius: 10,
    // padding: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20,
    marginLeft: 5,
    backgroundColor: '#1E276F'
  },
  // textamount: {
  //   padding: 50,
  // }
})