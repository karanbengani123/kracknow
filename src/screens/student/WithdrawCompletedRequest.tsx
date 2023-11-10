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
    // private focusListener: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            withdrawList: {}
        };
    }

    componentDidMount(): void {
        this._getWithdrawListHandler();
        // this.focusListener = this.props.navigation.addListener('didFocus', () => {
        //     this._getWithdrawListHandler();
        // })

    }

    componentWillUnmount(): void {
        // this.setState = () => {
        //     return;
        // };
        // this.focusListener.remove();
    }


    _getWithdrawListHandler(): void {
        // debugger;
        GetWithdrawListAPI()
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
                    // payload: {
                    //     respose: any;
                    //     response: any[],
                    // }
                    payload: { Wallettransactionslistreq: { rows: [] } }
                    message: string
                }
            }) => {
                // debugger;
                this.setState({
                    withdrawList: res.data.payload.Wallettransactionslistreq.rows
                });

            });

    }


    renderItem = ({ item }: any) => (
        <>
            {item.status === "COMPLETED" &&
                <View style={styles.item1}>
                    <Text
                        style={{
                            fontSize: 12, fontWeight: '500', color: '#0E242C', fontStyle: 'normal', marginLeft: 5, marginTop: 5
                        }}
                    >Amount: {item.amount}</Text>
                    <Text style={{
                        fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 10, marginLeft: 5
                    }}>Transfer Mode: {item.transferMode}
                    </Text>
                    <Text style={{
                        fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 10, marginLeft: 5
                    }}>Date: {moment(new Date(item.createdAt)).utcOffset('').format("ddd, DD-MMM-YYYY, hh:mm a")}
                    </Text>
                    <Text style={{
                        fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 10, marginLeft: 5
                    }}>Status: {item.status}
                    </Text>
                    <Text style={{
                        fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 10, marginLeft: 5
                    }}>Message: {item.statusMsg}
                    </Text>
                </View>
            }
        </>
    );

    render(): React.ReactNode {
        return (
            // <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <FlatList
                    // horizontal
                    pagingEnabled={true}
                    showsVerticalScrollIndicator={false}
                    data={this.state.withdrawList}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                // ListFooterComponent={
                //     <View style={{ height: 200 }}></View>
                // }
                />
            </View>
            // </ScrollView >
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

