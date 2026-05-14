import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type Props = {
  title?: string;
  quote?: string;
  author?: string;
};

export default function QuoteCard({
  title = '오늘의 문장 1',
  quote = '모든 위대한 책은 두 번 읽어야 한다.',
  author = 'MARCEL PROUST',
}: Props) {
  return (
    <View style={styles.card}>
      {/* 상단 */}
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.profileImage}
          />

          <Text style={styles.title}>
            {title}
          </Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.menu}>
            ⋯
          </Text>
        </TouchableOpacity>
      </View>

      {/* 책 이미지 */}
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.bookImage}
          resizeMode="cover"
        />

        {/* 문장 */}
        <Text style={styles.quote}>
          "{quote}"
        </Text>

        {/* 작가 */}
        <Text style={styles.author}>
          {author}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F7F8FC',
    marginBottom: 24,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 20,
    marginBottom: 12,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,

    marginRight: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },

  menu: {
    fontSize: 24,
    color: '#111827',
  },

  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
  },

  bookImage: {
    width: '90%',
    height: 420,

    borderRadius: 20,
  },

  quote: {
    position: 'absolute',

    top: '42%',
    left: 40,
    right: 40,

    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',

    textAlign: 'center',
    lineHeight: 36,
  },

  author: {
    position: 'absolute',

    right: 36,
    bottom: 28,

    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
});