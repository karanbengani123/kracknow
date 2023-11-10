import React from 'react';
// import { createDrawerNavigator } from 'react-navigation-drawer';

import SidebarMenu from './SidebarMenu';
import SearchScreen from '../../screens/student/SearchScreen';
import InterestScreen from '../../screens/student/InterestScreen';
import FeedbackScreen from '../../screens/student/FeedbackScreen';
import DashboardScreen from '../../screens/student/DashboardScreen';
import ExamScreen from '../../screens/student/ExamScreen';
import LeaderboardScreen from '../../screens/student/LeaderboardScreen';
import QuizScreen from '../../screens/student/QuizScreen';
import TournamentScreen from '../../screens/student/TournamentScreen';
import WalletScreen from '../../screens/student/WalletScreen';
import { createStackNavigator } from 'react-navigation-stack';
import  ExamNavigator  from './ExamNavigator';
import  QuizNavigator  from './QuizNavigator';
import  TournamentNavigator  from './TournamentNavigator';
import  LeaderboardNavigator  from './LeaderboardNavigator';
import DashboardNavigator from './DashboardNavigator';
import Notifications from '../../screens/student/Notifications';
import  MockNavigator  from './MockNavigator';
import WalletMainScreen from '../../screens/student/WalletMainScreen';
import  WalletNavigator  from './WalletNavigator';
import TermsScreen from '../../screens/student/TermsScreen';
import PrivacyScreen from '../../screens/student/PrivacyScreen';
// import { AuthNavigator } from '../auth-navigation/AuthNavigation';


import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


const Drawer: any = createDrawerNavigator();

const MainDrawer = () => {

  return (
    <Drawer.Navigator screenOptions={{
      headerShown: false
    }} drawerContent={(props: any) => <SidebarMenu {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardNavigator} />
      <Drawer.Screen name="Exam" component={ExamNavigator} />
      <Drawer.Screen name="Mock" component={MockNavigator} />
      <Drawer.Screen name="Quiz" component={QuizNavigator} />
      <Drawer.Screen name="Tournament" component={TournamentNavigator} />
      <Drawer.Screen name="Leaderboard" component={LeaderboardNavigator} />
      <Drawer.Screen name="Notification" component={Notifications} />
      <Drawer.Screen name="Search" component={SearchScreen} />
      <Drawer.Screen name="Interest" component={InterestScreen} />
      <Drawer.Screen name="Feedback" component={FeedbackScreen} />
      <Drawer.Screen name="Privacy" component={PrivacyScreen} />
      <Drawer.Screen name="Terms" component={TermsScreen} />
      <Drawer.Screen name="WalletNavigator" component={WalletNavigator} />


    </Drawer.Navigator>
  )
}

export default MainDrawer;

// export const MainDrawer = createDrawerNavigator({
//   Dashboard: DashboardNavigator,
//   Exam: ExamNavigator,
//   Mock: MockNavigator,
//   Quiz: QuizNavigator,
//   Tournament: TournamentNavigator,
//   Leaderboard: LeaderboardNavigator,
//   Notification: Notifications,
//   Search: SearchScreen,
//   Interest: InterestScreen,
//   Feedback: FeedbackScreen,
//   Privacy: PrivacyScreen,
//   Terms: TermsScreen,
//   // WalletMain: WalletMainScreen,
//   // Wallet: WalletScreen,
//   WalletNavigator: WalletNavigator
// }, {
//   contentComponent: (props) => {
//     return (
//       <SidebarMenu {...props} />
//     )
//   }
// });
