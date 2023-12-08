// import * as React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// interface Props {
//   navigation: any;
// }

// interface State {
// }

// export default class FeedScreen extends React.Component<Props, State> {
//   render(): React.ReactNode {
//     return (
//       <View
//         style={styles.container}
//       >
//         <Text>Feed Screen works !!!</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });


import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity } from 'react-native';

import ExamDetails from './ExamDetailsScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';



interface Props {
    navigation: any;
}

interface State {
}



export default class PrizesScreen extends React.PureComponent<Props, State> {
    render(): React.ReactNode {
        return (
            <View style={styles.screen}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.root}>
                        <View style={{ padding: 20 }}>
                            <Ionicons
                                name={'arrow-back'}
                                size={25}
                                color={Colors.white}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                onPress={() => this.props.navigation.goBack()}
                            />

                            <View style={{ borderRadius: 20, borderWidth: 1, borderColor: '#1E276F', flexDirection: 'row', padding: 20, marginTop: 10 }}>
                                <Ionicons
                                    name={'trophy'}
                                    size={25}
                                    color={Colors.warning}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                />
                                <Text style={{ marginLeft: 30, fontSize: 16, fontWeight: '500', color: 'black' }}>1st Prize Winner</Text>
                                <Text style={{ marginLeft: 30, color: '#FAC140', fontSize: 16, fontWeight: '500', }}>
                                    {'\u20B9'}
                                </Text>

                                <Text style={{ color: '#FAC140', fontSize: 16, fontWeight: '500' }}>50</Text>

                                <Ionicons
                                    name={'medal'}
                                    size={25}
                                    color={Colors.warning}
                                    style={{ marginLeft: 30 }}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView >
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // backgroundColor: Colors.white
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
    },
    
});

