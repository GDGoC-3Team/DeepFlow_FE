import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function QuoteCard() {
  return (
    <View style={styles.card}>
      {/* 카드 상단 */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.profileImage}
          />

          <Text style={styles.title}>
            오늘의 문장 1
          </Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.menu}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* 책 이미지 */}
      <Image
        source={require('../../assets/logo.png')}
        style={styles.bookImage}
        resizeMode="cover"
      />

      {/* 문장 */}
      <Text style={styles.quote}>
        "모든 위대한 책은 두 번 읽어야 한다."
      </Text>

      {/* 작가 */}
      <Text style={styles.author}>
        MARCEL PROUST
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 12,
  },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 28,
    height: 28,
    borderRadius: 14,

    marginRight: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
  },

  menu: {
    fontSize: 22,
  },

  bookImage: {
    width: '100%',
    height: 320,

    borderRadius: 12,

    marginBottom: 16,
  },

  quote: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',

    position: 'absolute',
    left: 30,
    right: 30,
    top: 220,

    textAlign: 'center',
  },

  author: {
    position: 'absolute',
    right: 24,
    bottom: 28,

    color: '#FFFFFF',
    fontSize: 12,
  },
});