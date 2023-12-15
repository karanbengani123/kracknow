
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  FlatList,
} from "react-native";
import {
  GetCityListAPI,
  GetStudentDetailsAPI,
  UpdateStudentAPI,
  WalletBalanceApi,
  WalletHistoryApi,
} from "../../api-services/User.api";
import moment from "moment";
import HeaderBack from "./HeaderBack";



interface Props {
  navigation: any;
  isMultiSelect: boolean;
  route: any
}

interface State {
  history: any[];
  balance: number;

}

export default class WalletMainScreen extends React.Component<Props, State> {
  private focusListener: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      history: [],
      balance: 0,
      fetcherr: ''

    };
  }

  componentDidMount(): void {


    this.focusListener = this.props.navigation.addListener('focus', () => {
          this._getWalletHistoryHandler();
      this._getWalletBalanceHandler();
    });
   
  }

  componentWillUnmount(): void {
    if (this.focusListener)
      this.focusListener();
  }


  _getWalletHistoryHandler(): void {
    WalletHistoryApi()
      .then(response => {
        this.setState({
          history: response.payload.Wallettransactionslist.rows
            .map((rows: {
              paymentMode: any;
              updatedAt: any;
              paymentDate: any;
              status: any;
              orderId: any;
              amount: any;
              type: any;
              examType: any;
              examTitle: any
            }) => {
              return {
                paymentMode: rows.paymentMode,
                updatedAt: rows.updatedAt,
                paymentDate: rows.createdAt,
                status: rows.status,
                orderId: rows.orderId,
                amount: rows.amount,
                type: rows.type,
                examType: rows.examType,
                examTitle: rows.examTitle,
              }
            })
        })
      }).catch(error => {
        this.setState({ fetcherr: error })
      })

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

  renderItem = ({ item }: any) => (

    <View style={styles.item1}>
      <View style={{}}>
        <Text
          style={{
            fontSize: 12, fontWeight: '500', color: '#0E242C', fontStyle: 'normal', marginLeft: 5, marginTop: 5
          }}
          // numberOfLines={2}
          ellipsizeMode='tail'>Amount: {item.amount}</Text>
        <Text style={{
          fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 5, marginLeft: 5
        }}>Mode: {item.type}
        </Text>
        <Text style={{
          fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 5, marginLeft: 5
        }}>Type: {item.examType}
        </Text>
        <Text style={{
          fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 5, marginLeft: 5
        }}>Name: {item.examTitle}
        </Text>
        <Text style={{
          fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 5, marginLeft: 5
        }}>Date: {moment(new Date(item.updatedAt)).utcOffset('').format("ddd, DD-MMM-YYYY, hh:mm a")}
        </Text>
        <Text style={{
          fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 5, marginLeft: 5
        }}>Payment Type: {item.paymentMode}
        </Text>
        <Text style={{
          fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 5, marginLeft: 5
        }}>Status: {item.status}
        </Text>



      </View>
    </View>

  );

  render(): React.ReactNode {
    // debugger;
    return (
      <SafeAreaView>
        <HeaderBack navigation={this.props.navigation} name="Wallet" />
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
        {/* {additionalContent} */}


        <View style={{ alignItems: 'center' }}>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => this.props.navigation.navigate('Wallet')}
          // activeOpacity={disabled ? 1 : 0.7} onPress={!disabled && onPress}
          >
            <Text style={{ color: "white" }}>Add Money</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.bankBtn}
            onPress={() => this.props.navigation.navigate('BankToWallet')}
          >
            <Text style={{ color: "#1E276F" }}>Wallet to bank transfer</Text>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 14,
              paddingTop: 15,
              color: "#0A1042",
              fontWeight: "500",
              paddingBottom: 10,
              alignSelf: 'center'
            }}
          >
            Wallet history
          </Text>
          {
            this.state.fetcherr !== "" &&
            <Text style={styles.errorText}>{this.state.fetcherr}</Text>
          }
        </View>



        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            // horizontal
            pagingEnabled={true}
            // showsHorizontalScrollIndicator={false}
            data={this.state.history}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
              <View style={{ height: 500 }}></View>
            }
          />
        </ScrollView>


      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  loginBtn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#1E276F",
  },

  errorText: {
    color: 'red',
  },
  bankBtn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "white",
    borderColor: '#1E276F',
    borderWidth: 2
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
  },
  item1: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    paddingTop: 10,
    marginVertical: 10,
    // width: '100%',
    borderRadius: 14,
    marginLeft: 20,
    marginRight: 20,
  },
});
