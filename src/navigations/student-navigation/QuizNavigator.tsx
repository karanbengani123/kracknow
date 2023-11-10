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
import QuizDoneResultScreen from '../../screens/student/QuizDoneResultScreen';
import QuizDoneResultScreen2 from '../../screens/student/QuizDoneResultScreen2';
import QuizStartScreen from '../../screens/student/QuizStartScreen';
import QuizQuestion from '../../screens/student/QuizQuestion';
import QuizResultScreen from '../../screens/student/QuizResultScreen';
import QuizResultTimeoutScreen from '../../screens/student/QuizResultTimeoutScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParams = {
  Quiz: any;
  Notification: any;
  QuizDetails: any;
  QuizStart: any;
  QuizQuestion: any;
  QuizResult: any;
  QuizResultTimeout: any;
  QuizDoneResult: any;
  QuizDoneResult2: any

}

const QuizNavigator = () => {
  const NativeStack: any = createNativeStackNavigator<RootStackParams>();
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false

      }}>
      <NativeStack.Screen name="Quiz" component={QuizScreen} />
      <NativeStack.Screen name="Notification" component={Notifications} />
      <NativeStack.Screen name="QuizDetails" component={QuizDetailsScreen} />
      <NativeStack.Screen name="QuizStart" component={QuizStartScreen} />
      <NativeStack.Screen name="QuizQuestion" component={QuizQuestion} />
      <NativeStack.Screen name="QuizResult" component={QuizResultScreen} />
      <NativeStack.Screen name="QuizResultTimeout" component={QuizResultTimeoutScreen} />
      <NativeStack.Screen name="QuizDoneResult" component={QuizDoneResultScreen} />
      <NativeStack.Screen name="QuizDoneResult2" component={QuizDoneResultScreen2} />


    </NativeStack.Navigator>

  )
}

export default QuizNavigator;
