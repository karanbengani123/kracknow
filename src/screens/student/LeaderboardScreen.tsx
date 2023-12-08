// import * as React from 'react';
// import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

// import Colors from '../../screens/constants/Colors';


// interface Props {
//     navigation: any;
// }

// interface State {
// }



// export default class LeaderboardScreen extends React.PureComponent<Props, State> {
//     render(): React.ReactNode {
//         return (
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 <View style={styles.root}>


//                     <Image
//                         source={require("../../../assets/images/leaderboard.png")}
//                         style={{ position: 'absolute', width: 500, }}


//                     />

//                     <Text style={{ fontWeight: '500', fontSize: 18, color: '#FFFFFF', paddingTop: 30 }}>Leaderboard</Text>
//                     <Text style={{
//                         color: '#FFFFFF',
//                         fontSize: 12,
//                         fontWeight: '500'
//                     }}>12th MIPA 2</Text>



//                     {/* <Text style={styles.heading3}>require("../../../assets/images/leaderboard.png")</Text> */}


//                     <View style={{ paddingTop: 65, }}>
//                         <View style={styles.item1}>
//                             <View style={styles.action}>
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 14,
//                                         marginLeft: 5,
//                                         paddingTop: 10,
//                                         fontWeight: '500'
//                                     }}>01</Text>
//                                 <Image style={{ marginLeft: 7 }} source={require("../../../assets/images/Group54.png")} />
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 13,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>Student 1</Text>
//                                 <Text
//                                     style={{
//                                         color: '#686A7B',
//                                         position: 'absolute',
//                                         left: 69,
//                                         top: 19,
//                                         fontSize: 12,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>100 points</Text>

//                                 <Image style={{ left: 190, marginTop: 5 }} source={require("../../../assets/images/1st.png")} />
//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ paddingTop: 20, }}>
//                         <View style={styles.item1}>
//                             <View style={styles.action}>
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 14,
//                                         marginLeft: 5,
//                                         paddingTop: 10,
//                                         fontWeight: '500'
//                                     }}>02</Text>
//                                 <Image style={{ marginLeft: 7 }} source={require("../../../assets/images/Group54.png")} />
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 13,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>Student 2</Text>
//                                 <Text
//                                     style={{
//                                         color: '#686A7B',
//                                         position: 'absolute',
//                                         left: 69,
//                                         top: 19,
//                                         fontSize: 12,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>99 points</Text>

//                                 <Image style={{ left: 190, marginTop: 5 }} source={require("../../../assets/images/2nd.png")} />
//                             </View>
//                         </View>
//                     </View>
//                     <View style={{ paddingTop: 20, }}>
//                         <View style={styles.item1}>
//                             <View style={styles.action}>
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 14,
//                                         marginLeft: 5,
//                                         paddingTop: 10,
//                                         fontWeight: '500'
//                                     }}>03</Text>
//                                 <Image style={{ marginLeft: 7 }} source={require("../../../assets/images/Group54.png")} />
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 13,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>Student 3</Text>
//                                 <Text
//                                     style={{
//                                         color: '#686A7B',
//                                         position: 'absolute',
//                                         left: 69,
//                                         top: 19,
//                                         fontSize: 12,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>98 points</Text>

//                                 <Image style={{ left: 190, marginTop: 5 }} source={require("../../../assets/images/3rd.png")} />
//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ paddingTop: 20, }}>
//                         <View style={styles.item1}>
//                             <View style={styles.action}>
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 14,
//                                         marginLeft: 5,
//                                         paddingTop: 10,
//                                         fontWeight: '500'
//                                     }}>04</Text>
//                                 <Image style={{ marginLeft: 7 }} source={require("../../../assets/images/Group54.png")} />
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 13,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>Student 4</Text>
//                                 <Text
//                                     style={{
//                                         color: '#686A7B',
//                                         position: 'absolute',
//                                         left: 69,
//                                         top: 19,
//                                         fontSize: 12,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>95 points</Text>

//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ paddingTop: 20, }}>
//                         <View style={styles.item1}>
//                             <View style={styles.action}>
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 14,
//                                         marginLeft: 5,
//                                         paddingTop: 10,
//                                         fontWeight: '500'
//                                     }}>05</Text>
//                                 <Image style={{ marginLeft: 7 }} source={require("../../../assets/images/Group54.png")} />
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 13,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>Student 5</Text>
//                                 <Text
//                                     style={{
//                                         color: '#686A7B',
//                                         position: 'absolute',
//                                         left: 69,
//                                         top: 19,
//                                         fontSize: 12,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>90 points</Text>

//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ paddingTop: 20, }}>
//                         <View style={styles.item1}>
//                             <View style={styles.action}>
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 14,
//                                         marginLeft: 5,
//                                         paddingTop: 10,
//                                         fontWeight: '500'
//                                     }}>06</Text>
//                                 <Image style={{ marginLeft: 7 }} source={require("../../../assets/images/Group54.png")} />
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 13,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>Student 6</Text>
//                                 <Text
//                                     style={{
//                                         color: '#686A7B',
//                                         position: 'absolute',
//                                         left: 69,
//                                         top: 19,
//                                         fontSize: 12,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>85 points</Text>

//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ paddingTop: 20, }}>
//                         <View style={styles.item1}>
//                             <View style={styles.action}>
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 14,
//                                         marginLeft: 5,
//                                         paddingTop: 10,
//                                         fontWeight: '500'
//                                     }}>07</Text>
//                                 <Image style={{ marginLeft: 7 }} source={require("../../../assets/images/Group54.png")} />
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 13,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>Student 7</Text>
//                                 <Text
//                                     style={{
//                                         color: '#686A7B',
//                                         position: 'absolute',
//                                         left: 69,
//                                         top: 19,
//                                         fontSize: 12,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>82 points</Text>

//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ paddingTop: 20, }}>
//                         <View style={styles.item1}>
//                             <View style={styles.action}>
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 14,
//                                         marginLeft: 5,
//                                         paddingTop: 10,
//                                         fontWeight: '500'
//                                     }}>08</Text>
//                                 <Image style={{ marginLeft: 7 }} source={require("../../../assets/images/Group54.png")} />
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 13,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>Student 8</Text>
//                                 <Text
//                                     style={{
//                                         color: '#686A7B',
//                                         position: 'absolute',
//                                         left: 69,
//                                         top: 19,
//                                         fontSize: 12,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>80 points</Text>

//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ paddingTop: 20, }}>
//                         <View style={styles.item1}>
//                             <View style={styles.action}>
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 14,
//                                         marginLeft: 5,
//                                         paddingTop: 10,
//                                         fontWeight: '500'
//                                     }}>09</Text>
//                                 <Image style={{ marginLeft: 7 }} source={require("../../../assets/images/Group54.png")} />
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 13,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>Student 9</Text>
//                                 <Text
//                                     style={{
//                                         color: '#686A7B',
//                                         position: 'absolute',
//                                         left: 69,
//                                         top: 19,
//                                         fontSize: 12,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>79 points</Text>

//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ paddingTop: 20, }}>
//                         <View style={styles.item1}>
//                             <View style={styles.action}>
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 14,
//                                         marginLeft: 5,
//                                         paddingTop: 10,
//                                         fontWeight: '500'
//                                     }}>10</Text>
//                                 <Image style={{ marginLeft: 7 }} source={require("../../../assets/images/Group54.png")} />
//                                 <Text
//                                     style={{
//                                         color: '#0A1042',
//                                         fontSize: 13,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>Student 10</Text>
//                                 <Text
//                                     style={{
//                                         color: '#686A7B',
//                                         position: 'absolute',
//                                         left: 69,
//                                         top: 19,
//                                         fontSize: 12,
//                                         marginLeft: 5,
//                                         fontWeight: '500'
//                                     }}>75 points</Text>

//                             </View>
//                         </View>
//                     </View>



//                 </View>
//             </ScrollView >
//         );
//     }
// }

// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//         backgroundColor: Colors.white
//     },
//     root: {
//         // alignItems: 'center',
//         padding: 20,
//     },
//     searchSection: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//         borderWidth: 1
//     },
//     searchIcon: {
//         padding: 10,
//     },
//     input: {
//         flex: 1,
//         paddingTop: 10,
//         paddingRight: 10,
//         paddingBottom: 10,
//         paddingLeft: 10,
//         backgroundColor: '#fff',
//         color: '#424242',
//     },
//     heading: {
//         fontSize: 18,
//         paddingTop: 5,
//         color: '#0A1042',
//         fontWeight: '500'
//     },
//     heading1: {
//         color: '#686A7B',
//         fontSize: 12,
//         fontWeight: '500'

//     },
//     heading3: {
//         fontSize: 18,
//         paddingTop: 30,
//         color: '#0A1042',
//         fontWeight: '500'

//     },
//     badge: {
//         width: 56,
//         height: 56,
//         backgroundColor: '#9D9D9D',
//         borderRadius: 20,
//     },
//     box: {
//         backgroundColor: '#3785E010',
//         borderRadius: 14,
//         width: 320,
//         height: 93,
//         marginTop: 30,
//         justifyContent: 'center',
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     boxtext: {
//         fontWeight: '600',
//         fontSize: 18,
//         color: '#3F9AE0',
//         paddingRight: 30,
//     },
//     action: {
//         display: 'flex',
//         flexDirection: 'row',
//     },
//     action_box: {
//         width: 150,
//         height: 93,
//         borderRadius: 14,
//         margin: 10,
//         marginTop: 25,
//         paddingLeft: 20,
//         paddingTop: 20
//     },
//     action_box_text: {
//         fontWeight: 'bold',
//         fontSize: 24,
//         color: '#FFFFFF',
//     },
//     action_box_smalltext: {
//         fontWeight: '500',
//         fontSize: 14,
//         color: 'rgba(255, 255, 255, 0.6)'
//     },
//     item3: {
//         backgroundColor: '#1E276F',
//         padding: 20,
//         paddingTop: 10,
//         // marginVertical: 10,
//         width: 370,
//         borderRadius: 14,
//     },
//     item: {
//         backgroundColor: '#FFFFFF',
//         // padding: 20,
//         // paddingTop: 10,
//         // marginVertical: 10,
//         width: 200,
//         borderRadius: 14,
//         marginHorizontal: 10
//     },


//     item1: {
//         backgroundColor: '#FFFFFF',
//         padding: 10,
//         paddingTop: 10,
//         // marginVertical: 10,
//         width: 370,
//         borderRadius: 14,
//     },
//     profile: {
//         flexDirection: 'row',
//         alignSelf: 'flex-end',

//     },
//     bellicon: {
//         marginBottom: 2,
//         marginRight: 15,
//         alignSelf: 'flex-end',

//     },
//     adminlogo: {
//         alignSelf: 'flex-end',

//     },
// });





import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';

import ExamDetails from './ExamDetailsScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import { TabStyle, TabUnderlineStyle } from '../styles/TabStyle';

import ExamLeaderboard from './ExamLeaderboard';
import QuizLeaderboard from './QuizLeaderboard';
// import TournamentLeaderboard from './TournamentLeaderboard';
import { DrawerActions } from 'react-navigation-drawer';
import Footer from './Footer'
import Header from './Header';
import TournamentLeadernboardScreen from './TournamentLeadernboardScreen';
import MockLeaderboard from './MockLeaderboard';





interface Props {
    navigation: any;
    route:any
}

interface State {
    selectedTab2: string;
    selectedOrganizationTypeList: string[];
    selectedCityList: {
        uuid: string;
        name: string;
    }[];
    selectedCategoryList: {
        uuid: string;
        name: string;
    }[];
    tabList: string[];
    filterCount: number;
    search: string;
    currentTab: 'Received' | 'Sent';
    showFilterModal: boolean;
    organizationType: string;
}



export default class LeaderboardScreen extends React.PureComponent<Props, State> {
    private _tabListRef: any;

    constructor(props: Props) {
        super(props);

        this.state = {

            selectedTab2: this.props.route.params?.tab || 'Exams',
            selectedOrganizationTypeList: [],
            selectedCityList: [],
            selectedCategoryList: [],
            tabList: [
                'Exams',
                'Quizzes',
                'Mock-Tests',
                'Tournaments'
            ],
            filterCount: 0,
            search: '',
            currentTab: 'Received',
            showFilterModal: false,
            organizationType: ''

        };


    }

    componentDidMount(): void {

    }

    componentWillUnmount(): void {

    }

    _toggleTabHandler(tabName: string): void {
        this.setState({
            selectedTab2: tabName,

        });
    }

    _renderItems = ({ item }: { item: any }) => (
        <TouchableOpacity
            activeOpacity={1}
            style={[TabStyle.tab2, item === this.state.selectedTab2 && TabStyle.activeTab2]}
            onPress={() => this._toggleTabHandler(item)}
        >
            <Text style={[
                TabStyle.tabText2,
                item === this.state.selectedTab2 && TabStyle.activeTabText2
            ]}>{item}</Text>
        </TouchableOpacity>
    );

    render(): React.ReactNode {
        return (
            <>
                <SafeAreaView style={{ flex: 1, }}>
                    <Header navigation={this.props.navigation} />

                    {/* <View style={{ padding: 10, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', }}>
            <Ionicons
                name={'menu'}
                size={25}
                color={Colors.black}
                style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 2 }}
                onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
            />

            <Text style={{
                marginLeft: 180, fontSize: 14,
                fontWeight: '700', marginTop: 3, color: 'black'
            }}>My Wallet: </Text>
            <Text style={{
                fontSize: 14,
                fontWeight: '700', marginTop: 3, color: 'red'
            }}>{'\u20B9'}1000</Text>

            <Ionicons
                name={'notifications-outline'}
                size={25}
                color={Colors.black}
                style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 2, marginLeft: 20 }}
            // onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
            />
        </View>
    </View> */}
                    <View style={styles.screen}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.root}>

                                {/* <View style={{ backgroundColor: '#1E276F', padding: 20 }}>



        <Text style={{ fontWeight: '500', fontSize: 18, color: '#FFFFFF', paddingTop: 30, paddingBottom: 30 }}>All Leaderboard</Text>

    </View> */}

                                <View>

                                    <View style={TabStyle.tabContainer2}>
                                        <FlatList
                                            ref={(ref) => this._tabListRef = ref}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={{ flexDirection: 'row' }}
                                            data={this.state.tabList}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={this._renderItems} />
                                    </View>
                                </View>




                                <ScrollView>
                                    {this.state.selectedTab2 === 'Exams' &&
                                        <ExamLeaderboard


                                            navigation={this.props.navigation} />}
                                    {this.state.selectedTab2 === 'Quizzes' &&
                                        <QuizLeaderboard


                                            navigation={this.props.navigation} />}

                                    {this.state.selectedTab2 === 'Mock-Tests' &&
                                        <MockLeaderboard


                                            navigation={this.props.navigation} />}

                                    {this.state.selectedTab2 === 'Tournaments' &&
                                        <TournamentLeadernboardScreen


                                            navigation={this.props.navigation} />}



                                </ScrollView>



                            </View>
                        </ScrollView>

                        <Footer
                            tab='Leaderboard'
                            navigation={this.props.navigation} />
                    </View>
                </SafeAreaView></>


        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // backgroundColor: Colors.white
        backgroundColor: '#E5E5E5'
    },
    loginBtn: {
        width: "30%",
        borderRadius: 25,
        height: 30,
        marginLeft: 100,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 70,
        backgroundColor: "white",
    },
    rupee: {
        // marginTop: 10,
        color: '#FAC140',
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 5
    },
    footerContainer: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#1E276F'
    },
    footerText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 5
    },
    root: {
        // alignItems: 'center',
        // padding: 20,
        backgroundColor: '#E5E5E5'
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1
    },
    searchIcon: {
        padding: 10,
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


