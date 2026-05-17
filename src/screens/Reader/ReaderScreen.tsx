import {
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { mockReadingPages } from '../../constants/mockReading';
import { BlurView } from 'expo-blur';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function ReaderScreen() {
  const navigation = useNavigation<any>();
  const [page, setPage] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [pageTimes, setPageTimes] =
  useState<Record<number, number>>({});

  const [pageOrder, setPageOrder] =
  useState<number[]>([1]);
  const [
  movedBackPages,
  setMovedBackPages,
] = useState<number[]>([]);

  const [
  sentenceMenuVisible,
  setSentenceMenuVisible,
] = useState(false);

  const [
    topMenuVisible,
    setTopMenuVisible,
  ] = useState(false);
  const [highlightedSentences,
  setHighlightedSentences] =
  useState<
    {
      page: number;
      sentenceIndex: number;
    }[]
  >([]);
  const [selectedSentence, setSelectedSentence] =
  useState<{
    page: number;
    sentenceIndex: number;
  } | null>(null);

  const totalPages = 4;
  const readingData =
  mockReadingPages.map(
    (item, index) => ({

      page: index + 1,

      textLength:
        item.sentences
          .join(' ')
          .length,

    })
  );

  const isLastPage = page === totalPages;
  const [paused, setPaused] =
  useState(false);

  useEffect(() => {
    if(paused) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);

      setPageTimes((prev) => ({
        ...prev,
        [page]: (prev[page] || 0) + 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [page, paused]);
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

          <TouchableOpacity
            onPress={() =>
              setTopMenuVisible(true)
            }
          >
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
          {
            paused && (

              <BlurView
                intensity={85}
                style={styles.pauseOverlay}
              >

                <Text style={styles.pauseText}>
                  타이머 정지 중
                </Text>

              </BlurView>

            )
          }
          
            {
              mockReadingPages[page - 1]
                ?.sentences.map(
                  (sentence, index) => (
                    <View
                      key={index}
                      style={styles.sentenceWrapper}>
                      <TouchableOpacity
                        
                        activeOpacity={1}
                        onLongPress={() => {
                          setSelectedSentence({
                            page,
                            sentenceIndex: index,
                          });
                          setSentenceMenuVisible(true);
                        }}
                      >
                        <Text style={[
                          styles.content,
                        
                          highlightedSentences.some(
                            (item) =>
                              item.page === page &&
                              item.sentenceIndex === index
                            ) && styles.highlightedText,
                          ]}
                        >
                          {sentence}
                          
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                )
              }
          
        </View>

        {/* 페이지 바 */}
        <View style={styles.bottomBar}>
          <View style={styles.pageRow}>
            <TouchableOpacity
              onPress={() => {
                if (page > 1) {
                  const prevPage = page - 1;

                  setPage(prevPage);

                  setMovedBackPages((prev) => [
                    ...prev,
                    prevPage,
                  ]);

                  setPageOrder((prev) => [
                    ...prev,
                    prevPage,
                  ]);
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
                  const nextPage = page + 1;
                  setPage(nextPage);

                  setPageOrder((prev) => [
                    ...prev,
                    nextPage,
                  ]);
                } else {
                  const payload = {
                    totalReadingTime:
                      seconds,
                    pageTimes,
                    pageOrder,
                    movedBackPages,
                    highlights:
                      highlightedSentences,

                    readingData,

                  };
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
      <Modal
        transparent
        visible={sentenceMenuVisible}
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() =>
            setSentenceMenuVisible(false)
          }
        >
          <View style={styles.menuBox}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setSentenceMenuVisible(false);

                navigation.push(
                  'SaveSentence',
                  {
                    selectedSentence,
                  }
                );
              }}
            >
              <Text style={styles.menuText}>
                문장 저장하기
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                if (selectedSentence) {
                  setHighlightedSentences(
                    (prev) => [
                      ...prev,
                      selectedSentence,
                    ]
                  );
                }

                setSentenceMenuVisible(false);
              }}
            >
              <Text style={styles.menuText}>
                형광펜 칠하기
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        transparent
        visible={topMenuVisible}
        animationType="fade"
      >

        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() =>
            setTopMenuVisible(false)
          }
        >

          <View style={styles.menuBox}>

            <TouchableOpacity
              style={styles.menuItem}

              onPress={() => {

                setPaused(!paused);

                setTopMenuVisible(false);

              }}
            >

              <Text style={styles.menuText}>

                {
                  paused
                    ? '타이머 다시 시작'
                    : '타이머 정지'
                }

            </Text>

          </TouchableOpacity>

        </View>

      </TouchableOpacity>

      </Modal>
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
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.1)',

  justifyContent: 'center',
  alignItems: 'center',
},

menuBox: {
  width: 220,

  backgroundColor: '#FFFFFF',

  borderRadius: 16,

  paddingVertical: 10,
},

menuItem: {
  paddingVertical: 16,
  paddingHorizontal: 20,
},

menuText: {
  fontSize: 16,
  color: '#111827',
},
highlightedText: {
  backgroundColor:
    'rgba(37, 99, 235, 0.1)',

  borderRadius: 6,
},
sentenceWrapper: {
  marginBottom: 28,
},
pauseOverlay: {
  position: 'absolute',
  backgroundColor: 'rgba(255,255,255,0.15)',

  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  justifyContent: 'center',
  alignItems: 'center',

  zIndex: 10,
},

pauseText: {
  fontSize: 22,

  fontWeight: '700',

  color: '#111827',
},
});
