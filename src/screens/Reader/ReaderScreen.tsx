import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { mockReadingPages } from '../../constants/mockReading';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function ReaderScreen() {
  const navigation = useNavigation<any>();
  const [page, setPage] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [pageTimes, setPageTimes] =
  useState<Record<number, number>>({});

  const totalPages = 4;

  const isLastPage = page === totalPages;

  useEffect(() => {
  const timer = setInterval(() => {
    setSeconds((prev) => prev + 1);

    setPageTimes((prev) => ({
      ...prev,
      [page]: (prev[page] || 0) + 1,
    }));
  }, 1000);

  return () => clearInterval(timer);
}, [page]);
  const hours = Math.floor(seconds / 3600);

  const minutes = Math.floor(
    (seconds % 3600) / 60
   );
  const secs = seconds % 60;
  const formatTime = (time: number) => {
  return time.toString().padStart(2, '0');
};

  return (
    <SafeAreaView style={styles.container}>
      {/* 리더 카드 */}
      <View style={styles.readerCard}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#111827"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            오늘의 읽기
          </Text>

          <TouchableOpacity>
            <Ionicons
              name="ellipsis-vertical"
              size={20}
              color="#111827"
            />
          </TouchableOpacity>
        </View>
        {page === 1 && (
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>
              {
                mockReadingPages[0]
                  ?.title
              }
            </Text>

            <Text style={styles.bookAuthor}>
              {     
                mockReadingPages[0]
                  ?.author
              }
            </Text>
          </View>
        )}
        {/* 본문 */}
        <View style={styles.contentContainer}>
          <Text style={styles.content}>
            {
              mockReadingPages[page - 1]
                ?.content
            }
          </Text>
        </View>

        {/* 페이지 바 */}
        <View style={styles.bottomBar}>
          <View style={styles.pageRow}>
            <TouchableOpacity
              onPress={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              <Text style={styles.pageButton}>
                이전
              </Text>
            </TouchableOpacity>

            <View>
              <Text style={styles.pageText}>
                {page} / {totalPages}
              </Text>

              <Text style={styles.timer}>
                {formatTime(hours)}:
                {formatTime(minutes)}:
                {formatTime(secs)}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                if(!isLastPage) {
                  setPage(page + 1 );
                } else {
                  navigation.navigate('Result');
                }
              }}
              >
              <Text style={styles.pageButton}>
                {isLastPage ? '완료' : '다음'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECF3',

    paddingHorizontal: 16,
    paddingTop: 12,
  },

  readerCard: {
    flex: 1,

    backgroundColor: '#F7F8FC',

    borderRadius: 22,

    overflow: 'hidden',
  },

  header: {
    height: 56,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 16,

    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  headerTitle: {
    position: 'absolute',
    left: 54,

    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  bookInfo: {
  alignItems: 'center',

  marginTop: 32,
  marginBottom: 36,
},

bookTitle: {
  fontSize: 28,
  fontWeight: '700',

  color: '#111827',
},

bookAuthor: {
  marginTop: 10,

  fontSize: 15,
  fontWeight: '400',

  color: '#9CA3AF',
},

  contentContainer: {
    flex: 1,

    paddingTop: 28,
    paddingHorizontal: 28,
  },

  content: {
    fontSize: 18,
    lineHeight: 40,

    color: '#374151',
  },

  bottomBar: {
    marginHorizontal: 14,
    marginBottom: 22,

    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    borderWidth: 1,
    borderColor: '#D1D5DB',

    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  pageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pageButton: {
    fontSize: 15,
    fontWeight: '600',

    color: '#9CA3AF',
  },

  pageText: {
    textAlign: 'center',

    fontSize: 15,
    fontWeight: '600',

    color: '#6B7280',
  },

  timer: {
    marginTop: 2,

    textAlign: 'center',

    fontSize: 10,
    color: '#9CA3AF',
  },
});