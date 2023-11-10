import { StyleSheet } from 'react-native';

// import Colors from '../constants/Colors';

export const TabStyle = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: 1,
    paddingVertical: 10,
    // backgroundColor:'blue',
    // borderBottomWidth: 1,
    // borderTopWidth:1,
    marginTop:5
    // borderBottomColor: Colors.border
  },
  tabContainer2: {
    justifyContent:'space-evenly',
    display:'flex',
    alignItems:'center',
    // alignSelf:'center',
    paddingHorizontal: 1,
    paddingVertical: 10,
    backgroundColor:'#1E276F',
    // borderBottomWidth: 1,
    // borderTopWidth:1,
    // marginTop:5
    // borderBottomColor: Colors.border
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'white',
    // backgroundColor: Colors.white,
    // borderColor: Colors.black,
    // borderWidth: 1,
    // borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 8
  },
  activeTab: {
    // backgroundColor:'white',
    // backgroundColor: Colors.primary,
    // borderColor: Colors.primary
    borderBottomWidth:2,
    borderBottomColor:"#1E276F",
  },
  tabText: {
    fontSize: 12,
    color: '#686A7B',
    fontWeight: '500'
  },
  activeTabText: {
    color: '#1E276F',
    fontWeight: '500'
  },
  tab2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'white',
    // backgroundColor: Colors.white,
    // borderColor: Colors.black,
    // borderWidth: 1,
    // borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    // marginRight: 8
  },
  activeTab2: {
    // backgroundColor:'white',
    // borderWidth:1,
    // borderColor:"white",
    // backgroundColor: Colors.primary,
    // borderColor: Colors.primary
    borderBottomWidth:2,
    borderBottomColor:"white",
  },
  tabText2: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500'
  },
  activeTabText2: {
    color: 'white',
    fontWeight: '500'
  },
  transfertabContainer: {
    paddingHorizontal: 1,
    paddingVertical: 7,
    backgroundColor:'white',
    alignItems:'center',
    // justifyContent:'space-evenly',
    // alignItems:'stretch',
    // borderRadius:10,
    // borderBottomWidth: 1,
    // borderTopWidth:1,
    marginTop:1
    // borderBottomColor: Colors.border
  },
  transfertab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:175,
    // backgroundColor:'white',
    // backgroundColor: Colors.white,
    // borderColor: Colors.black,
    // borderWidth: 1,
    // borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    // marginRight: 20
  },
  transferactiveTab: {
    backgroundColor:'#1E276F',
    // backgroundColor: 'linear-gradient(255.87deg, #FFFFFF, 77.65%),',
    borderRadius:10
    // borderColor: Colors.primary
    // borderBottomWidth:2,
    // borderBottomColor:"#3F9AE0",
  },
  transfertabText: {
    fontSize: 16,
    color: '#1E276F',
    fontWeight: '500'
  },
  transferactiveTabText: {
    color: 'white',
    fontWeight: '500'
  },
});

export const TabUnderlineStyle = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  },
  tab: {
    alignSelf: 'flex-start',
    minWidth: '50%',
    borderBottomWidth: 2,
    // borderBottomColor: Colors.border,
    paddingBottom: 10
  },
  tabActive: {
    // borderBottomColor: Colors.primary
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '700',
    // color: Colors.text,
    textAlign: 'center'
  },
  tabLabelActive: {
    // color: Colors.black
  },
  
});
