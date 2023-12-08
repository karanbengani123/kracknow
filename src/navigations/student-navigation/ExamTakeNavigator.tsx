import * as React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import ExamDetailsScreen from '../../screens/student/ExamDetailsScreen';
import QuizScreen from '../../screens/student/QuizScreen';

// import Colors from '../../screens/constants/Colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from 'react-navigation-drawer';
import { HeaderNavigatorStyles, NoHeaderStyle } from '../../styles/HeaderNavigatorStyles';
import QuizDetailsScreen from '../../screens/student/QuizDetailsScreen';
import ExamQuestion from '../../screens/student/ExamQuestion';
import ExamResultScreen from '../../screens/student/ExamResultScreen';
import ExamReviewScreen from '../../screens/student/ExamReviewScreen';
import ExamReviewScreen2 from '../../screens/student/ExamReviewScreen2';



export const QuizNavigator = createStackNavigator({
  
    ExamQuestion:{
        screen: ExamQuestion,
        navigationOptions: ({navigation}) => ({
          headerTitle: '',
          headerShown: false
          // headerLeft: () => NavigationBackIcon(navigation),
          // headerRight: () => HeaderRightContainer(navigation)
    
        })
      },
    
      ExamResult:{
        screen: ExamResultScreen,
        navigationOptions: ({navigation}) => ({
          headerTitle: '',
          headerShown: false
          // headerLeft: () => NavigationBackIcon(navigation),
          // headerRight: () => HeaderRightContainer(navigation)
    
        })
      },
    
      ExamReview:{
        screen: ExamReviewScreen,
        navigationOptions: ({navigation}) => ({
          headerTitle: 'Review Answers',
          // headerShown: false,
          headerLeft: () => NavigationBackIcon(navigation),
          // headerRight: () => HeaderRightContainer(navigation)
    
        })
      },
    
      ExamReview2:{
        screen: ExamReviewScreen2,
        navigationOptions: ({navigation}) => ({
          headerTitle: '',
          // headerShown: false,
          headerLeft: () => NavigationBackIcon(navigation),
          // headerRight: () => HeaderRightContainer(navigation)
    
        })
      },

  

},
{
  defaultNavigationOptions: {
    headerTitleAlign: 'left',
    headerTitleStyle: {
      color: "black",
      fontSize: 18
    }
  }
});

const HeaderRightContainer = (navigation: any) => {
  return (
    <View style={HeaderNavigatorStyles.headerStyle}>
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
              color="black"
              style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 2, marginLeft: 20 }}
            // onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
            />
    </View>
  )
};

const NavigationBackIcon = (navigation: any) => {
  return (
    <View style={HeaderNavigatorStyles.headerStyle}>
      <Ionicons
        name={'arrow-back'}
        size={20}
        color="black"
        style={HeaderNavigatorStyles.iconSpacing}
        onPress={() => navigation.goBack()}
      />
    </View>
  )
};
