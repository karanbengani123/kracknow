import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export const HeaderNavigatorStyles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    paddingHorizontal: 10
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
