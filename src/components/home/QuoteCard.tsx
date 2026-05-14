import { useState } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

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
  const [bookmarked, setBookmarked] =
    useState(false);

  const [menuVisible, setMenuVisible] =
    useState(false);

  return (
    <View style={styles.card}>
      {/* 상단 */}
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.logoWrapper}>
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.profileImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>
            {title}
          </Text>
        </View>

        {/* ... 버튼 */}
        <TouchableOpacity
          onPress={() =>
            setMenuVisible(true)
          }
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={22}
            color="#111827"
          />
        </TouchableOpacity>
      </View>

      {/* 이미지 */}
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.bookImage}
          resizeMode="cover"
        />

        {/* 북마크 */}
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() =>
            setBookmarked(!bookmarked)
          }
        >
          <Ionicons
            name={
              bookmarked
                ? 'bookmark'
                : 'bookmark-outline'
            }
            size={28}
            color="#2563EB"
          />
        </TouchableOpacity>

        {/* 문장 */}
        <Text style={styles.quote}>
          "{quote}"
        </Text>

        {/* 작가 */}
        <Text style={styles.author}>
          {author}
        </Text>
      </View>

      {/* 모달 */}
      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() =>
            setMenuVisible(false)
          }
        >
          <View style={styles.menuBox}>
            <TouchableOpacity
              style={styles.menuItem}
            >
              <Text style={styles.menuText}>
                문장 저장하기
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
            >
              <Text style={styles.menuText}>
                이미지 저장하기
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    paddingTop: 14,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 16,
    marginBottom: 12,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoWrapper: {
    width: 32,
    height: 32,

    borderRadius: 16,

    backgroundColor: '#EEF2FF',

    borderWidth: 1,
    borderColor: '#E5E7EB',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 10,
  },

  profileImage: {
    width: 16,
    height: 16,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },

  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
  },

  bookImage: {
    width: screenWidth,
    height: 520,
  },

  bookmarkButton: {
    position: 'absolute',
    top: 18,
    right: 20,
  },

  quote: {
    position: 'absolute',

    top: '42%',
    left: 34,
    right: 34,

    fontSize: 31,
    fontWeight: '700',
    color: '#FFFFFF',

    textAlign: 'center',
    lineHeight: 46,
  },

  author: {
    position: 'absolute',

    right: 22,
    bottom: 26,

    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },

  /* 모달 */
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.05)',

  justifyContent: 'flex-start',
  alignItems: 'flex-end',
},

menuBox: {
  width: 190,

  backgroundColor: '#FFFFFF',

  borderRadius: 14,

  paddingVertical: 6,

  marginTop: 120,
  marginRight: 18,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.08,
  shadowRadius: 10,

  elevation: 4,
},

  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  menuText: {
    fontSize: 16,
    color: '#111827',
  },
});