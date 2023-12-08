import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

export const BadgeStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.orange,
    borderRadius: 50,
    paddingVertical: 1,
    paddingHorizontal: 5
  },
  text: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700'
  }
});

export const OnlineBadgeStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.success,
    height: 10,
    width: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.white
  }
});

export const StatusBadgeStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4
  },
  label: {
    fontSize: 12,
  },
  completedContainer: {
    backgroundColor: 'rgba(0,187,108,0.12)'
  },
  completedLabel: {
    color: Colors.success
  },
  pendingContainer: {
    backgroundColor: 'rgba(232,97,0,0.12)'
  },
  pendingLabel: {
    color: Colors.pending,
    textTransform: 'uppercase'
  },
  acceptedContainer: {
    backgroundColor: 'rgba(25,118,210,0.12)'
  },
  acceptedLabel: {
    color: Colors.secondary
  },
  rejectedContainer: {
    backgroundColor: 'rgba(220,3,3,0.12)'
  },
  rejectedLabel: {
    color: Colors.danger
  }
});
