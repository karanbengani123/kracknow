import * as React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import ExamDetailsScreen from '../../screens/student/ExamDetailsScreen';
import ExamScreen from '../../screens/student/ExamScreen';

// import Colors from '../../screens/constants/Colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from 'react-navigation-drawer';
import { HeaderNavigatorStyles, NoHeaderStyle } from '../../styles/HeaderNavigatorStyles';
import ExamStartScreen from '../../screens/student/ExamStartScreen';
import ExamQuestion from '../../screens/student/ExamQuestion';
import ExamResultScreen from '../../screens/student/ExamResultScreen';
import ExamReviewScreen from '../../screens/student/ExamReviewScreen';
import ExamReviewScreen2 from '../../screens/student/ExamReviewScreen2';
import ExamDoneResultScreen from '../../screens/student/ExamDoneResultScreen';
import ExamDoneResultScreen2 from '../../screens/student/ExamDoneResultScreen2';
import Notifications from '../../screens/student/Notifications';
import ExamResultTimeoutScreen from '../../screens/student/ExamResultTimeoutScreen';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParams = {
  Exam: any;
  Notification: any;
  ExamDetails: any;
  ExamStart: any;
  ExamQuestion: any;
  ExamResult: any;
  ExamResultTimeout: any;
  ExamReview: any;
  ExamReview2: any;
  ExamDoneResult: any;
  ExamDoneResult2: any;

}

const ExamNavigator = () => {
  const NativeStack: any = createNativeStackNavigator<RootStackParams>();
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}>
      <NativeStack.Screen name="Exam" component={ExamScreen} />
      <NativeStack.Screen name="Notification" component={Notifications} />
      <NativeStack.Screen name="ExamDetails" component={ExamDetailsScreen} />
      <NativeStack.Screen name="ExamStart" component={ExamStartScreen} />
      <NativeStack.Screen name="ExamQuestion" component={ExamQuestion} />
      <NativeStack.Screen name="ExamResult" component={ExamResultScreen} />
      <NativeStack.Screen name="ExamResultTimeout" component={ExamResultTimeoutScreen} />
      <NativeStack.Screen name="ExamReview" component={ExamReviewScreen} />
      <NativeStack.Screen name="ExamReview2" component={ExamReviewScreen2} />
      <NativeStack.Screen name="ExamDoneResult" component={ExamDoneResultScreen} />
      <NativeStack.Screen name="ExamDoneResult2" component={ExamDoneResultScreen2} />

    </NativeStack.Navigator>

  ) 
}

export default ExamNavigator;
