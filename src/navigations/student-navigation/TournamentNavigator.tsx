import * as React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import TournamentDetails from '../../screens/student/TournamentDetails';
import TournamentScreen from '../../screens/student/TournamentScreen';

// import Colors from '../../screens/constants/Colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from 'react-navigation-drawer';
import { HeaderNavigatorStyles, NoHeaderStyle } from '../../styles/HeaderNavigatorStyles';
import Notifications from '../../screens/student/Notifications';
import TournamentDetailsScreen from '../../screens/student/TournamentDetailsScreen';
import TournamentQuestion from '../../screens/student/TournamentQuestion';
import TournamentResultScreen from '../../screens/student/TournamentResultScreen';
import TournamentDoneExamList from '../../screens/student/TournamentDoneExamList';
import TournamentDoneExamScore from '../../screens/student/TournamentDoneExamScrore';
import TournamentReviewScreen from '../../screens/student/TournamentReviewScreen';
import TournamentLeaderboardScoreScreen from '../../screens/student/TournamentLeaderboardScoreScreen';
import TournamentReviewQuestionScreen from '../../screens/student/TournamentReviewQuestionScreen';
import TournamentResultTimeoutScreen from '../../screens/student/TournamentResultTimeoutScreen';
import TournamentStartScreen from '../../screens/student/TournamentStartScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParams = {
  Tournament: any;
  Notification: any;
  TournamentDetails: any;
  TournamentStart: any;
  TournamentExamStart: any;
  TournamentResult: any;
  TournamentResultTimeout: any;
  TournamentDoneExamList: any;
  TournamentDoneExamScore: any;
  TournamentReviewScreen: any;
  TournamentReviewQuestionScreen: any;
  TournamentLeaderboardScoreScreen: any
  

}

const TournamentNavigator = () => {
  const NativeStack: any = createNativeStackNavigator<RootStackParams>();
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false

      }}>
      <NativeStack.Screen name="Tournament" component={TournamentScreen} />
      <NativeStack.Screen name="Notification" component={Notifications} />
      <NativeStack.Screen name="TournamentDetails" component={TournamentDetailsScreen} />
      <NativeStack.Screen name="TournamentStart" component={TournamentStartScreen} />
      <NativeStack.Screen name="TournamentExamStart" component={TournamentQuestion} />
      <NativeStack.Screen name="TournamentResult" component={TournamentResultScreen} />
      <NativeStack.Screen name="TournamentResultTimeout" component={TournamentResultTimeoutScreen} />
      <NativeStack.Screen name="TournamentDoneExamList" component={TournamentDoneExamList} />
      <NativeStack.Screen name="TournamentDoneExamScore" component={TournamentDoneExamScore} />
      <NativeStack.Screen name="TournamentReviewScreen" component={TournamentReviewScreen} />
      <NativeStack.Screen name="TournamentReviewQuestionScreen" component={TournamentReviewQuestionScreen} />
      {/* <NativeStack.Screen name="TournamentLeaderboardScoreScreen" component={TournamentLeaderboardScoreScreen} /> */}

 
    </NativeStack.Navigator>

  )
}

export default TournamentNavigator;
