
import * as React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';



interface Props {
    navigation: any;
    
}

interface State {
}

const DATA = [
    {
        id: '1',
        title: 'Tournament',
        title1: '45 Minutes',

    },
    {
        id: '2',
        title: 'Biology daily quiz',
        title1: '45 Minutes',


    },
    {
        id: '3',
        title: 'Chemistry exam',
        title1: '45 Minutes',


    },
    {
        id: '4',
        title: 'Physics exam',
        title1: '45 Minutes',


    },
    {
        id: '5',
        title: 'Maths exam',
        title1: '45 Minutes',


    },
    {
        id: '6',
        title: 'English exam',
        title1: '45 Minutes',


    },
];

const Item = ({ title, title1 }: any) => (
    <View style={styles.item}>
        <Image style={{ width: 280, height: 130, borderRadius: 20 }} source={require("../../../assets/images/tour1.png")}></Image>
        <Image style={{ position: 'absolute', left: 156, top: 22 }} source={require("../../../assets/images/Rectangle1.png")}></Image>
        <Text style={{ position: 'absolute', left: 162, top: 35, color: '#FFFFFF' }}>{title}</Text>
        <View style={{ backgroundColor: 'red', position: 'absolute' }}>

            <Text style={{ position: 'absolute', left: 162, top: 55, color: '#FFFFFF' }}>{title1}</Text>
        </View>

    </View>
);



export default class UpcomingTournaments extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {

        };


    }

    componentDidMount(): void {

    }

    componentWillUnmount(): void {

    }
    renderItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('TournamentDetails')}>
        <Item title={item.title} title1={item.title1} />
    </TouchableOpacity>
    
    );

    render(): React.ReactNode {
        return (
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.root}>
                    
                    <View style={{ paddingTop: 15 }}>

                        {/* <FlatList
                            horizontal
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            data={DATA}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                        /> */}
                    </View>

                </View>
            </ScrollView>
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
        padding: 1,
    },
    item: {
        backgroundColor: '#FFFFFF',
        // padding: 20,
        // paddingTop: 10,
        // marginVertical: 10,
        width: 280,
        borderRadius: 14,
        marginHorizontal: 10
    },
});
