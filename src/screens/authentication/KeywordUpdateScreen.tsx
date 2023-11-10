import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, ActivityIndicator, FlatList, ToastAndroid, SafeAreaView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetKeywordListAPI, KeywordUpdateAPI } from '../../api-services/User.api';
import Colors from '../constants/Colors';
import { IUpdateKeyword } from '../models/Auth.models';



interface Props {
    navigation: any;
}

interface State {
    isPressed: boolean;
    keywordList: {
        keyword: string;
        id: number;
        isChecked: boolean;
    }[],
    checkedKeywords: any[];
    isLoading: boolean


}



export default class KeywordUpdateScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isPressed: false,
            keywordList: [],
            checkedKeywords: [],
            isLoading: true,


        };
    }

    componentDidMount(): void {
        this._getKeywordListHandler();

    }

    componentWillUnmount(): void {

    }


    _getKeywordListHandler(): void {
        // debugger;
        GetKeywordListAPI()
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
                        lists: any;
                        map(arg0: (cities: any) => { label: any; }): any[];
                        cities: any[];
                        response: any[],
                    }
                    message: string
                }
            }) => {
                // debugger;
                if (res.statusCode === 200) {
                    const _inputs = [...this.state.keywordList];
                    const payload = res.data.payload.lists.rows;
                    console.log("payload", payload)
                    payload.map((data: any, index: number) =>
                        _inputs.push({
                            keyword: data.attribute,
                            id: index,
                            isChecked: false,
                        }),
                    );
                    this.setState({
                        keywordList: _inputs,
                    });
                    console.log("state", _inputs[0].keyword)
                }
                this.setState({ isLoading: false });

                // this.setState({
                //     keywordList: res.data.payload.lists.rows
                //         .map((rows: any) => {
                //             return {
                //                 attribute: rows.attribute,

                //             };   
                //         })
                // });
            });

    }


    KeywordUpdateHandler(): void {

        let selectedKeywords = this.state.keywordList?.filter(
            product => product.isChecked,
        ).map((data) => data.keyword);

        const payload: IUpdateKeyword = {
            keyword: selectedKeywords
        }
        //   debugger
        KeywordUpdateAPI(payload)
            .then((response) => {
                const statusCode = response.status;
                const data = response.json();

                return Promise.all([statusCode, data]).then((res) => ({
                    statusCode: res[0],
                    data: res[1],
                }));
            })
            .then(
                (res: {
                    statusCode: number;
                    data: { payload: any; message: string };
                }) => {
                    if (res.statusCode === 200) {

                        this.props.navigation.replace("Student");

                    } else if (res.statusCode === 500) {
                        ToastAndroid.show("Internal server error", ToastAndroid.SHORT);

                    } else {

                    }
                    // console.log('::::::::', this.state.isPressed)
                    //   debugger;
                }
            );

    }



    _handleChange = (id: any) => {
        let temp = this.state.keywordList.map(product => {
            if (id === product.id) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        this.setState({ keywordList: temp });
    };


    renderItem = ({ item }: any) => (
        <Checkbox.Item
            label={item.keyword}
            status={item.isChecked ? 'checked' : 'unchecked'}
            onPress={() => {
                this._handleChange(item.id);
            }}
            mode={'android'}
            // position={'leading'}
            // uncheckedColor={Colors.unchecked}
            color={Colors.primary}
            style={{ width: '80%' }}
        //labelStyle={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
        />

    );



    render(): React.ReactNode {
        if (this.state.isLoading) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 10
                    // height: Dimensions.get('window').height / 2
                }}
                >
                    <ActivityIndicator
                        size={'large'}
                        color={Colors.primary}
                    />
                </View>
            );
        }
        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#1E276F', marginBottom: 10 }}>
                        <Text style={{ fontWeight: '500', fontSize: 18, color: 'white' }}>Select Keywords</Text>
                    </View>

                    <View style={{ padding: 20, alignItems: 'center', marginBottom: 50 }}>


                        <FlatList
                            // horizontal
                            //pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            // legacyImplementation={false}
                            data={this.state.keywordList}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        // onEndReachedThreshold={0.2}
                        />



                        <TouchableOpacity
                            style={styles.loginBtn}
                            // onPress={() => this.props.navigation.navigate('Student')}
                            onPress={() => this.KeywordUpdateHandler()}
                        >
                            {/* <Text style={{ color: "white" }}>LOGIN</Text> */}


                            <Text style={{ color: "white" }}>
                                {
                                    !this.state.isPressed ? 'Save & Go to Dashboard' : ''
                                }
                            </Text>
                            {
                                !this.state.isPressed
                                    ? <Text></Text>
                                    : <ActivityIndicator
                                        size={'small'}
                                        color={Colors.white}
                                    />
                            }
                        </TouchableOpacity>
                    </View >

                </ScrollView >
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
        marginTop: 40,
        backgroundColor: "#1E276F",
        flexDirection: 'row'
    },
    root: {
        // alignItems: 'center',
        // padding: 20,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: '#424242',
    },
    heading: {
        fontSize: 18,
        paddingTop: 5,
        color: '#0A1042',
        fontWeight: '500'
    },
    heading1: {
        color: '#686A7B',
        fontSize: 12,
        fontWeight: '500'

    },
    heading3: {
        fontSize: 18,
        paddingTop: 30,
        color: '#0A1042',
        fontWeight: '500'

    },
    badge: {
        width: 56,
        height: 56,
        backgroundColor: '#9D9D9D',
        borderRadius: 20,
    },
    box: {
        backgroundColor: '#3785E010',
        borderRadius: 14,
        width: 320,
        height: 93,
        marginTop: 30,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    boxtext: {
        fontWeight: '600',
        fontSize: 18,
        color: '#3F9AE0',
        paddingRight: 30,
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
    },
    action_box: {
        width: 150,
        height: 93,
        borderRadius: 14,
        margin: 10,
        marginTop: 25,
        paddingLeft: 20,
        paddingTop: 20
    },
    action_box_text: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#FFFFFF',
    },
    action_box_smalltext: {
        fontWeight: '500',
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.6)'
    },
    item3: {
        backgroundColor: '#1E276F',
        padding: 20,
        paddingTop: 10,
        // marginVertical: 10,
        width: 370,
        borderRadius: 14,
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
        // marginVertical: 10,
        width: 370,
        borderRadius: 14,
    },
    profile: {
        flexDirection: 'row',
        alignSelf: 'flex-end',

    },
    bellicon: {
        marginBottom: 2,
        marginRight: 15,
        alignSelf: 'flex-end',

    },
    adminlogo: {
        alignSelf: 'flex-end',

    },
});

