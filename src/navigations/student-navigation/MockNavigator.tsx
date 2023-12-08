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
import Notifications from '../../screens/student/Notifications';
import MockScreen from '../../screens/student/MockScreen';
import MockDetailsScreen from '../../screens/student/MockDetailsScreen';
import MockStartScreen from '../../screens/student/MockStartScreen';
import MockQuestion from '../../screens/student/MockQuestion';
import MockResultScreen from '../../screens/student/MockResultScreen';
import MockResultTimeoutScreen from '../../screens/student/MockResultTimeoutScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParams = {
  Mock: any;
  Notification: any;
  MockDetails: any;
  MockStart: any;
  MockQuestion: any;
  MockResult: any;
  MockResultTimeout: any;
  

}

const MockNavigator = () => {
  const NativeStack: any = createNativeStackNavigator<RootStackParams>();
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false

      }}>
      <NativeStack.Screen name="Mock" component={MockScreen} />
      <NativeStack.Screen name="Notification" component={Notifications} />
      <NativeStack.Screen name="MockDetails" component={MockDetailsScreen} />
      <NativeStack.Screen name="MockStart" component={MockStartScreen} />
      <NativeStack.Screen name="MockQuestion" component={MockQuestion} />
      <NativeStack.Screen name="MockResult" component={MockResultScreen} />
      <NativeStack.Screen name="MockResultTimeout" component={MockResultTimeoutScreen} />

    </NativeStack.Navigator>

  )
}

export default MockNavigator;
