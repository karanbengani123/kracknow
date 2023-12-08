
import * as React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TextInput, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";



interface Props {
    navigation: any;

}

interface State {
}

const countries = ["Payment", "Register Exam", "Withdraw Request"]



export default class FeedbackScreen extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);


        this.state = {

        };


    }

    componentDidMount(): void {

    }

    componentWillUnmount(): void {

    }

    render(): React.ReactNode {
        return (
            <SafeAreaView >
                <View style={styles.root}>

                <View style={{ padding: 20, flexDirection: "row" }}>
              <Ionicons
                name={"arrow-back"}
                size={25}
                color={Colors.black}
                onPress={() => this.props.navigation.goBack()}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 15,
                  fontWeight: "700",
                  color: "black",
                }}
              >
                Contact Us
              </Text>
            </View>

                    <View style={{ padding: 40 }}>
                        
                    <Text style={styles.heading}>E-mail-</Text>
                    <Text style={styles.content}>kracknow17@gmail.com</Text>

                    <Text style={styles.heading}>Address-</Text>
                    <Text style={styles.content}>C-105 Ashirwad Palace Bhatar Road, Surat- 395001</Text>



                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // backgroundColor: Colors.white
    },
    root: {
        // flex:1
        // alignItems: 'center',
        // padding: 10,
    },
    loginBtn: {
        width: "100%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 90,
        backgroundColor: "#1E276F",
    },
    heading: {
        fontWeight: '700',
        color: 'black',
        // paddingBottom: 10
    },
    content: {
        color: 'black',
        paddingBottom: 20,
        // paddingRight:10
    },
    hyperlinkStyle: {
        color: 'blue',
    },

});
