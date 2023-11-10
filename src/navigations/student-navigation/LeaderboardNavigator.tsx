import * as React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import ExamDetailsScreen from '../../screens/student/ExamDetailsScreen';
import QuizScreen from '../../screens/student/QuizScreen';

// import Colors from '../../screens/constants/Colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from 'react-navigation-drawer';
import { HeaderNavigatorStyles, NoHeaderStyle } from '../../styles/HeaderNavigatorStyles';
import LeaderboardScreen from '../../screens/student/LeaderboardScreen';
import LeaderboardResult from '../../screens/student/LeaderboardResult';
import Notifications from '../../screens/student/Notifications';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TournamentLeaderboardScoreScreen from '../../screens/student/TournamentLeaderboardScoreScreen';

export type RootStackParams = {
  Leaderboard: any;
  Notification: any;
  Leaderboard1: any;

}

const LeaderboardNavigator = () => {
  const NativeStack: any = createNativeStackNavigator<RootStackParams>();
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <NativeStack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <NativeStack.Screen name="Notification" component={Notifications} />
      <NativeStack.Screen name="Leaderboard1" component={LeaderboardResult} />
      <NativeStack.Screen name="TournamentLeaderboardScoreScreen" component={TournamentLeaderboardScoreScreen} />

    </NativeStack.Navigator>

  )
}

export default LeaderboardNavigator;
