import { StyleSheet } from 'react-native';
import Colors from '../screens/constants/Colors';

export const HeaderNavigatorStyles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    padding:10,
    // alignItems:'flex-end'
  },
  iconSpacing: {
    paddingVertical: 2,
    paddingHorizontal: 10
  }
});

export const NoHeaderStyle = {
  headerStyle: {
    backgroundColor: Colors.white,
    elevation: 0,
    shadowOpacity: 0
  }
};
