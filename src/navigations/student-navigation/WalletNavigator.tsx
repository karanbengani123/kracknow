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
import WalletMainScreen from '../../screens/student/WalletMainScreen';
import WalletScreen from '../../screens/student/WalletScreen';
import BankToWalletScreen from '../../screens/student/BankToWalletScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

interface Props {
  navigation: any
}

export type RootStackParams = {
  WalletMain: any;
  Wallet: any;
  BankToWallet: any;

}

const WalletNavigator = (navigation: any) => {
  const NativeStack: any = createNativeStackNavigator<RootStackParams>();
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <NativeStack.Screen name="WalletMain" component={WalletMainScreen}
      //   setOptions ={{
      //   title: 'Wallet',
      //   // headerLeft: () => NavigationBackHomeIcon(),
      // }}
      // options={{ title: 'My home', headerLeft:(navigation: any) => NavigationBackIcon (navigation) }}

      // options={(navigation: any) => ({
      //   title: 'Wallet',
      //   headerTitleStyle: {
      //     color: "black",
      //     fontSize: 18 
      //   },
      //   headerLeft: () => NavigationBackIcon(navigation)
      // })}

      />
      <NativeStack.Screen name="Wallet" component={WalletScreen} />
      <NativeStack.Screen name="BankToWallet" component={BankToWalletScreen} />

    </NativeStack.Navigator>

  )
}

export default WalletNavigator;

export const NavigationBackIcon = (navigation: any) => {
  return (
    <View style={HeaderNavigatorStyles.headerStyle}>
      <Ionicons
        name={'arrow-back'}
        size={20}
        color="black"
        style={HeaderNavigatorStyles.iconSpacing}
        onPress={() => navigation.navigate('WalletMain')}
      />
    </View>
  )
};
