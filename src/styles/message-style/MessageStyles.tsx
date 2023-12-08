import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

export const ChatListStyle = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row'
  },
  profileImageContainer: {
    height: 36,
    width: 36,
    borderRadius: 18
  },
  middleContainer: {
    flex: 1,
    paddingHorizontal: 15
  },
  username: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2
  },
  message: {
    fontSize: 12,
    color: Colors.text
  },
  lastSeen: {
    color: Colors.text,
    fontSize: 12,
    marginBottom: 2
  },
  endContainer: {
    justifyContent: 'flex-start'
  }
});

export const ChatContainerStyle = StyleSheet.create({
  headerSection: {
    flexDirection: 'row'
  },
  headerCountText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black
  },
  profileImageContainer: {
    height: 36,
    width: 36,
    borderRadius: 18
  },
  middleContainer: {
    paddingHorizontal: 15
  },
  username: {
    fontSize: 16,
    fontWeight: '700'
  },
  userType: {
    fontSize: 12,
    color: Colors.text
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: Colors.white
  },
  inputBoxContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInput: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 2,
    fontSize: 16,
    width: '75%',
    marginHorizontal: 7
  },
  iconSpacing: {
    paddingHorizontal: 7
  },
  conversationContainer: {
    marginBottom: 60
  },
  chatContainer: {
    marginBottom: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: Colors.white
  },
  selectedChatContainer: {
    backgroundColor: Colors.border
  },
  chatBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 7
  },
  differentUserChatBox: {
    backgroundColor: Colors.background,
    borderBottomLeftRadius: 0,
    alignSelf: 'flex-start'
  },
  sameUserChatBox: {
    backgroundColor: Colors.white,
    borderBottomRightRadius: 0,
    alignSelf: 'flex-end'
  },
  messageText: {
    color: Colors.black,
    fontSize: 14
  },
  timelineText: {
    color: Colors.text,
    fontSize: 12,
    paddingRight: 5
  },
  sameUserTimelineText: {
    alignSelf: 'flex-end'
  }
});
