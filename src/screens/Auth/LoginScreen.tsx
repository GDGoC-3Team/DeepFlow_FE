import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Deepflow
        </Text>
      </View>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleText}>
          Continue with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
  },

  topSection: {
    alignItems: 'center',
    marginTop: 60,
  },

  logo: {
    width: 180,
    height: 180,
  },

  title: {
    marginTop: 10,
    fontSize: 38,
    fontWeight: '700',
    color: '#004AC6',
    
  },

  googleButton: {
    width: '85%',
    height: 62,

    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 3,
  },

  googleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
});