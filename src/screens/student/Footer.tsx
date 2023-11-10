import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  tab: string;
  navigation: any;
}

interface State {
  selectedTab: string;
}

export default class Footer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedTab: 'Home'
    };
  }

  render(): React.ReactNode {
    return (
      <View style={{ padding: 10, backgroundColor: 'white', }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 0 }}>


          <TouchableOpacity
            activeOpacity={0.7}
            style={{ alignItems: 'center' }}
            onPress={() => this.props.navigation.navigate('Dashboard')}
          >
            <Ionicons
              name={'home'}
              size={25}
              color={this.props.tab === 'Home' ? Colors.figma : Colors.ash}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            />
            <Text style={{ fontSize: 10, }}>Dashboard</Text>
          </TouchableOpacity>




          <TouchableOpacity
            activeOpacity={0.7}
            style={{ alignItems: 'center', marginLeft:5 }}
            onPress={() => {
              this.props.navigation.navigate(
                'Exam', {
                screen: 'Exam',
              },
            );
            }}
          >
            <Ionicons
              name={'newspaper'}
              size={25}
              color={this.props.tab === 'Exam' ? Colors.figma : Colors.ash}
              style={{ paddingLeft: 0, paddingRight: 0, }}
            />
            <Text style={{ fontSize: 10 }}>Exam</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{ alignItems: 'center', marginLeft:5  }}
            onPress={() => {
              this.props.navigation.navigate(
                'Mock', {
                screen: 'Mock',
              },
            );
            }}
          >
            <Ionicons
              name={'library'}
              size={25}
              color={this.props.tab === 'Mock' ? Colors.figma : Colors.ash}
              style={{ paddingLeft: 0, paddingRight: 0, }}
            />
            <Text style={{ fontSize: 10, }} 
            >Mock-Test</Text>
          </TouchableOpacity>



          <TouchableOpacity
            activeOpacity={0.7}
            style={{ alignItems: 'center', }}
            onPress={() => {
              this.props.navigation.navigate(
                'Quiz', {
                screen: 'Quiz',
              },
            );
            }}
          >
            <Ionicons
              name={'alarm'}
              size={25}
              color={this.props.tab === 'Quiz' ? Colors.figma : Colors.ash}
              style={{ paddingLeft: 0, paddingRight: 0, }}
            />
            <Text style={{ fontSize: 10 }}>Quiz</Text>
          </TouchableOpacity>




          <TouchableOpacity
            activeOpacity={0.7}
            style={{ alignItems: 'center', }}
            onPress={() => {
              this.props.navigation.navigate(
                'Tournament', {
                screen: 'Tournament',
              },
            );
            }}
          >
            <Ionicons
              name={'trophy'}
              size={25}
              color={this.props.tab === 'Tournament' ? Colors.figma : Colors.ash}
              style={{ paddingLeft: 0, paddingRight: 0, }}
            />
            <Text style={{ fontSize: 10 }}>Tournament</Text>
          </TouchableOpacity>




          <TouchableOpacity
            activeOpacity={0.7}
            style={{ alignItems: 'center' }}
            onPress={() =>this.props.navigation.navigate('Leaderboard')}
          >
            <Ionicons
              name={'cellular'}
              size={25}
              color={this.props.tab === 'Leaderboard' ? Colors.figma : Colors.ash}
              style={{ paddingLeft: 0, paddingRight: 0, }}
            />
            <Text style={{ fontSize: 10 }} 
            >Leaderboard</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // screen: {
  //     flex: 1,
  //     // backgroundColor: Colors.white
  // },


});


