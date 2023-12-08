import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, ImageSourcePropType, FlatList } from 'react-native';

import ExamDetails from './ExamDetailsScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import moment from 'moment';
import { GetNotificationAPI } from '../../api-services/User.api';
import HeaderBack from './HeaderBack';



interface Props {
    navigation: any;
}

interface State {
    notificationList: any
}



export default class Notifications extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            notificationList: {}

        };


    }

    componentDidMount(): void {
        // this._getScheduleListHandler();
        this._getNotificationListHandler()

    }

    componentWillUnmount(): void {

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
                //debugger;
                this.setState({
                    notificationList: res.payload.payload.rows
                });

            });

    }


    renderItem = ({ item }: any) => (
        <View style={styles.item1}>
            <View style={styles.action}>

                <Text
                    style={{
                        fontSize: 12, fontWeight: '500', color: '#0E242C', fontStyle: 'normal', marginLeft: 5, marginTop: 5
                    }}
                    numberOfLines={2}
                    ellipsizeMode='tail'>{item.message}</Text>

            </View>
        </View>

    );

    render(): React.ReactNode {
        return (
            <View style={styles.screen}>
                <HeaderBack navigation={this.props.navigation} name="Notifications" />
                <ScrollView showsVerticalScrollIndicator={false}>
                {
                        this.state.notificationList.length === 0 ?

                            <View style={{ flex: 1, alignItems: 'center', marginTop:100 }}>
                                <Text>No Notifications Found</Text>
                            </View>
                            :

                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View>
                                <FlatList
                                    // horizontal
                                    pagingEnabled={true}
                                    // showsHorizontalScrollIndicator={false}
                                    data={this.state.notificationList}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </ScrollView >

                    </View>
    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // backgroundColor: Colors.white
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
    },

    item1: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        paddingTop: 10,
        marginVertical: 8,
        width: '100%',
        borderRadius: 14,
    },
});


