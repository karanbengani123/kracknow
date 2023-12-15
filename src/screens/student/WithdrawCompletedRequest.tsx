import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, FlatList, ImageSourcePropType } from 'react-native';

import Colors from '../constants/Colors';

import ExamDetails from './ExamDetailsScreen'
import { GetCompletedExamListAPI, GetScheduleListAPI, GetWithdrawListAPI } from '../../api-services/User.api';
import moment from 'moment';




interface Props {
    navigation: any;
}

interface State {
    withdrawList: any



}



export default class WithdrawCompletedRequest extends React.Component<Props, State> {
    private focusListener: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            withdrawList: {},
            fetcherr: '',
        };


    }

    componentDidMount(): void {
        this._getWithdrawListHandler();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this._getWithdrawListHandler();
        });
    }

    // componentWillUnmount(): void {
    //     if (this.focusListener) {
    //         this.focusListener.remove();
    //     }
    // }




    _getWithdrawListHandler(): void {

        GetWithdrawListAPI()
            .then(response => {
                const successRecords = response.payload.Wallettransactionslist.rows.filter(record => record.status === "SUCCESS");
                if (Array.isArray(successRecords)) {
                    this.setState({
                        withdrawList: successRecords
                            .map((rows: {
                                paymentDate: any;
                                status: any;
                                amount: any;
                                type: any;
                                message: any
                            }) => {
                                return {
                                    paymentDate: rows.createdAt,
                                    status: rows.status,
                                    amount: rows.amount,
                                    type: rows.type,
                                    message: rows.statusMsg
                                }
                            })

                    });
                }


            })

            .catch(error => {
                this.setState({ fetcherr: error });
            });

    }


    renderItem = ({ item }: any) => (
        <>
            <View style={styles.item1}>

                <Text
                    style={{
                        fontSize: 12, fontWeight: '500', color: '#0E242C', fontStyle: 'normal', marginLeft: 5, marginTop: 5
                    }}
                >Amount: {item.amount}</Text>
                <Text style={{
                    fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 10, marginLeft: 5
                }}>Date: {moment(new Date(item.paymentDate)).utcOffset('').format("ddd, DD-MMM-YYYY, hh:mm a")}
                </Text>
                <Text style={{
                    fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 10, marginLeft: 5
                }}>Transfer Mode: {item.type}
                </Text>
                <Text style={{
                    fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 10, marginLeft: 5
                }}>Status: {item.status}
                </Text>
                <Text style={{
                    fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 10, marginLeft: 5
                }}>Message: {item.message}
                </Text>

                {/* <View style={{alignSelf:'center', marginLeft:70}}>

        <Image style={{  }} source={require("../../../assets/images/Checklist.png")} />
    </View> */}
            </View>
        </>
    );

    render(): React.ReactNode {

        return (<>
            {
                this.state.fetcherr !== "" &&
                <Text style={styles.errorText}>{this.state.fetcherr}</Text>
            }

            {this.state.withdrawList.length > 0 &&
                <ScrollView showsVerticalScrollIndicator={false}>
                    <FlatList
                        // horizontal
                        pagingEnabled={true}
                        // showsHorizontalScrollIndicator={false}
                        data={this.state.withdrawList}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={
                            <View style={{ height: 500 }}></View>
                        }
                    />
                </ScrollView>
            }
        </>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white
    },
    root: {
        // alignItems: 'center',
        padding: 20,
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
    },
    item: {
        backgroundColor: '#FFFFFF',
        // padding: 20,
        // paddingTop: 10,
        // marginVertical: 10,
        width: 200,
        borderRadius: 14,
        marginHorizontal: 10
    },
    item1: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        paddingTop: 10,
        marginVertical: 10,
        width: '100%',
        borderRadius: 14,
        // paddingBottom:10,
        // marginBottom:10
    },
});

