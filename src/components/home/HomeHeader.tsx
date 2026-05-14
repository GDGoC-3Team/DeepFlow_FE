import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function HomeHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.leftDummy} />

      <Text style={styles.logo}>
        Deepflow
      </Text>

      <TouchableOpacity>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#111827"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 92,

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    paddingBottom: 14,

    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  leftDummy: {
    width: 24,
  },

  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#004AC6',
  },
});