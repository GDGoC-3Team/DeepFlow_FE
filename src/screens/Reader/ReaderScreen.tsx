// import {
//   API_CONFIG
// } from '../../config/apiConfig';

// import {
//   useNavigation,
// } from '@react-navigation/native';

// import {
//   useState,
//   useEffect,
// } from 'react';

// import {
//   BlurView
// } from 'expo-blur';

// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Modal,
//   ActivityIndicator,
// } from 'react-native';

// import {
//   useReadingStore,
// } from '../../store/readingStore';

// import {
//   Ionicons
// } from '@expo/vector-icons';

// import {
//   readingService,
//   TodayReading,
// } from '../../services/readingService';

// //  [해결 1] 마이페이지에서 세팅한 글자 크기 및 글꼴 조율 데이터를 수급하기 위해 서비스 임포트!
// import { settingService } from '../../services/settingService';
// type SentenceItem = {
//     text: string;
//     startOffset: number;
//     endOffset: number;
//   };

//   type PageItem = {
//     sentences: SentenceItem[];
//     startOffset: number;
//     endOffset: number;
//   };

// export default function ReaderScreen() {

//   const navigation = useNavigation<any>();

//   //  사용자 글로벌 글자 설정을 실시간 주입받을 동적 상태 제어기
//   const [viewerFontSize, setViewerFontSize] = useState<number>(18); 
//   const [viewerFontFamily, setViewerFontFamily] = useState<string>('NANUM_MYEONGJO');

//   // 글자 크기에 맞춰서 한 페이지당 적정 글자 수를 유동적으로 반환하는 스마트 스케일링 함수
//   const getDynamicMaxChars = (size: number) => {
//     if (size <= 14) return 240;
//     if (size <= 16) return 200;
//     if (size <= 18) return 180; 
//     return 130; 
//   };

//   const [page, setPage] = useState(1);
//   const [seconds, setSeconds] = useState(0);
//   const [sessionId, setSessionId] = useState<number>(1);
//   const [loading, setLoading] = useState(true);
//   const [todayReading, setTodayReading] = useState<TodayReading | null>(null);
//  // const [pages, setPages] = useState<{ sentences: string[]; }[]>([]);
  

//   const [pages, setPages] =
//     useState<PageItem[]>([]);
//   const [pageTimes, setPageTimes] = useState<Record<number, number>>({});

//   const completeToday = useReadingStore((state) => state.completeToday);
//   const today = new Date().toISOString().split('T')[0];
  
//   const [pageOrder, setPageOrder] = useState<number[]>([1]);
//   const [movedBackPages, setMovedBackPages] = useState<number[]>([]);
//   const [sentenceMenuVisible, setSentenceMenuVisible] = useState(false);
//   const [topMenuVisible, setTopMenuVisible] = useState(false);
//   const [paused, setPaused] = useState(false);

//   const [highlightedSentences, setHighlightedSentences] = useState<
//     { id?: number; page: number; sentenceIndex: number; text?: string; startOffset: number; endOffset: number; }[]
//   >([]);

//   const [selectedSentence, setSelectedSentence] = useState<{
//     id?: number; text: string; page: number; sentenceIndex: number; startOffset: number; endOffset: number;
//   } | null>(null);

//   const handleSavePageTime = async (
//   pageNumber: number,
//   elapsedSeconds: number
// ) => {

//   try {

//     const currentPageData =
//       pages[pageNumber - 1];

//     if (!currentPageData) return;

//     console.log({
//       pageNumber,
//       startOffset:
//         currentPageData.startOffset,
//       endOffset:
//         currentPageData.endOffset,
//     });

//     await readingService.savePageTime(
//       sessionId,
//       1,
//       currentPageData.startOffset,
//       currentPageData.endOffset,
//       elapsedSeconds
//     );

//   } catch (e) {

//     console.error(
//       '페이지 시간 기록 실패:',
//       e
//     );
//   }
// };

//   const splitIntoPages = (
//   text: string,
//   maxChars: number = 180
// ): PageItem[] => {

//   const rawSentences = text
//     .split(/\n+/)
//     .flatMap(
//       (line) =>
//         line.match(/[^.!?]+[.!?]?/g) || []
//     )
//     .filter(
//       (sentence) =>
//         sentence.trim().length > 0
//     );

//   const pages: PageItem[] = [];

//   let currentPage: SentenceItem[] = [];
//   let currentLength = 0;

//   let currentOffset = 0;
//   let pageStartOffset = 0;

//   rawSentences.forEach((sentence) => {

//     const trimmed = sentence.trim();

//     const sentenceStartOffset =
//       currentOffset;

//     const sentenceEndOffset =
//       currentOffset + trimmed.length;

//     const sentenceItem: SentenceItem = {
//       text: trimmed,
//       startOffset: sentenceStartOffset,
//       endOffset: sentenceEndOffset,
//     };

//     if (
//       currentLength + trimmed.length <= maxChars
//     ) {

//       currentPage.push(sentenceItem);

//       currentLength += trimmed.length;

//     } else {

//       pages.push({
//         sentences: currentPage,
//         startOffset: pageStartOffset,
//         endOffset:
//           currentPage[
//             currentPage.length - 1
//           ]?.endOffset || pageStartOffset,
//       });

//       currentPage = [sentenceItem];

//       currentLength = trimmed.length;

//       pageStartOffset =
//         sentenceStartOffset;
//     }

//     currentOffset =
//       sentenceEndOffset + 1;
//   });

//   if (currentPage.length > 0) {

//     pages.push({
//       sentences: currentPage,
//       startOffset: pageStartOffset,
//       endOffset:
//         currentPage[
//           currentPage.length - 1
//         ]?.endOffset || pageStartOffset,
//     });
//   }

//   return pages;
// };

//   const totalPages = pages.length;
//   const isLastPage = page === totalPages;

//   // readingData 수정
//   const readingData = pages.map((item, index) => ({
//     page: index + 1,
//     textLength:
//       item.sentences
//         .map((s) => s.text)
//         .join(' ')
//         .length,
//   }));

 
//   useEffect(() => {
//     const startReadingSessionAndSettings = async () => {
//       try {
//         setLoading(true);
//         console.log(' USE_MOCK MODE 상태:', API_CONFIG.USE_MOCK);

        
//         try {
//           const globalSettings = await settingService.getSettings();
//           if (globalSettings && globalSettings.success) {
//             setViewerFontSize(globalSettings.data.fontSize || 18);
//             setViewerFontFamily(globalSettings.data.fontFamily || 'NANUM_MYEONGJO');
//             console.log(`📡 [설정 동기화] 크기: ${globalSettings.data.fontSize}px, 글꼴: ${globalSettings.data.fontFamily}`);
//           }
//         } catch (settingError) {
//           console.log(' 글로벌 설정을 불러오지 못해 기본 레이아웃으로 구동합니다.');
//         }

//         // MOCK 모드 분기 방어막
//         if (API_CONFIG.USE_MOCK) {
//           const mockData: TodayReading = {
//             bookId: 999,
//             title: "사색의 공간",
//             author: "안다현",
//             content: "현대 사회에서 침묵은 존재의 상태라기보다 일종의 사치품이 되어버렸습니다. 우리는 디지털 알림의 리드미컬한 소음 속에 끊임없이 매여 있으며, 한때 사색이 머물던 빈 공간은 끈질긴 정전기 같은 소음들로 채워지고 있습니다.\n우리 마음의 구조는 결코 이러한 끊임없는 유입을 견디도록 설계되지 않았습니다. 끝!",
//             coverImageUrl: "https://example.com/mock-cover.png",
//             characterCount: 168,
//           };

//           setTodayReading(mockData);
//           const dynamicMaxChars = getDynamicMaxChars(viewerFontSize);
//           const generatedPages = splitIntoPages(mockData.content, dynamicMaxChars);
//           setPages(generatedPages);
//           setSessionId(777); 
//           return; 
//         }

//         //  실서버 모드 (`USE_MOCK: false`) 백엔드 통신
//         console.log('1. today api 호출 시작');
//         const todayData = await readingService.getTodayReading();
//         setTodayReading(todayData);

//         const dynamicMaxChars = getDynamicMaxChars(viewerFontSize);
//         const generatedPages = splitIntoPages(todayData.content, dynamicMaxChars);
//         setPages(generatedPages);

//         const session = await readingService.startReading(todayData.bookId);
//         setSessionId(session.id);

//         try {
//           const existingHighlights = await readingService.getHighlights(session.id);
//           if (existingHighlights && existingHighlights.length > 0) {
//             console.log('기존 형광펜 연동 확인 완료');
//           }
//         } catch (e) {
//           console.log('이전 형광펜 이력 없음');
//         }

//       } catch (error: any) {
//         console.error('❌ 독서 세션 실패:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     startReadingSessionAndSettings();
//   }, [viewerFontSize]);

//   // 타이머 가동 로직
//   useEffect(() => {
//     if (paused) return;
//     const timer = setInterval(() => {
//       setSeconds((prev) => prev + 1);
//       setPageTimes((prev) => ({
//         ...prev,
//         [page]: (prev[page] || 0) + 1,
//       }));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [page, paused]);

//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const secs = seconds % 60;

//   const formatTime = (time: number) => {
//     return time.toString().padStart(2, '0');
//   };



//   if (loading) {
//     return (
//       <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
//         <ActivityIndicator size="large" color="#2563EB" />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>

//       {/* 리더 카드 */}
//       <View style={styles.readerCard}>

//         {/* 헤더 구역 */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//             <Ionicons name="arrow-back" size={24} color="#111827" />
//           </TouchableOpacity>

//           <Text style={styles.headerTitle}>
//             오늘의 읽기
//           </Text>

//           <TouchableOpacity onPress={() => setTopMenuVisible(true)}>
//             <Ionicons name="ellipsis-vertical" size={22} color="#111827" />
//           </TouchableOpacity>
//         </View>

//         {/* 책 정보 */}
//         {page === 1 && (
//           <View style={styles.bookInfo}>
//             <Text style={styles.bookTitle}>{todayReading?.title}</Text>
//             <Text style={styles.bookAuthor}>{todayReading?.author}</Text>
//           </View>
//         )}

//         {/* 본문 */}
//         <View style={styles.contentContainer}>
//           {paused && (
//             <BlurView intensity={85} style={styles.pauseOverlay}>
//               <Text style={styles.pauseText}>타이머 정지 중</Text>
//             </BlurView>
//           )}

//           <View>
//             {pages[page - 1]?.sentences.map(
//               (
//                 sentence: SentenceItem,
//                 index: number
//               ) => {

//                 const existingHighlight =
//                   highlightedSentences.find(
//                     (h) =>
//                       h.startOffset ===
//                         sentence.startOffset &&
//                       h.endOffset ===
//                         sentence.endOffset
//                   );

//                 return (
//                   <TouchableOpacity
//                     key={index}
//                     activeOpacity={1}
//                     onLongPress={() => {

//                       setSelectedSentence({
//                         id: existingHighlight?.id,

//                         text: sentence.text,

//                         startOffset:
//                           sentence.startOffset,

//                         endOffset:
//                           sentence.endOffset,

//                         page,

//                         sentenceIndex: index,
//                       });

//                       setSentenceMenuVisible(true);
//                     }}
//                   >
//                     <Text
//                       style={[
//                         styles.content,
//                         {
//                           fontSize:
//                             viewerFontSize,

//                           fontFamily:
//                             viewerFontFamily ===
//                             'NOTO_SANS'
//                               ? undefined
//                               : 'Kopub',

//                           lineHeight:
//                             viewerFontSize * 1.7,
//                         },

//                       existingHighlight &&
//                         styles.highlightedText,
//                     ]}
//                   >
//                     {sentence.text}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             }
//           )}
//         </View>
//         </View>

//         {/* 하단 페이지 바 / 계기판 */}
//         <View style={styles.bottomBar}>
//           <View style={styles.pageRow}>
            
//             <TouchableOpacity
//               onPress={async () => {
//                 if (page > 1) {
//                   const prevPage = page - 1;
//                   try {
//                     console.log(` [이전] 세션ID=${sessionId}, 서버전송페이지=${page }, 머문시간=${pageTimes[page] || 0}초`);
//                     await handleSavePageTime( page, pageTimes[page] || 0 );
//                   } catch (e) {
//                     console.error('페이지 시간 기록 실패:', e);
//                   }
//                   setPage(prevPage);
//                   setMovedBackPages((prev) => [...prev, prevPage]);
//                   setPageOrder((prev) => [...prev, prevPage]);
//                 }
//               }}
//               disabled={page === 1} 
//               style={{ opacity: page === 1 ? 0.3 : 1 }}
//             >
//               <Text style={styles.pageButton}>〈 이전</Text>
//             </TouchableOpacity>

            
//             <View style={styles.centerTimerBlock}>
//               <Text style={styles.pageText}>{page} / {totalPages}</Text>
              
//               <View style={styles.timerRow}>
//                 <Text style={styles.timerText}>
//                   {formatTime(hours)}:{formatTime(minutes)}:{formatTime(secs)}
//                 </Text>
//               </View>
//             </View>

//             <TouchableOpacity
//               onPress={async () => {
//                 if (!isLastPage) {
//                   const nextPage = page + 1;
//                   try {
//                     console.log(` [다음/완료] 세션ID=${sessionId}, 서버전송페이지=${page}, 머문시간=${pageTimes[page] || 0}초`);
//                     await handleSavePageTime( page, pageTimes[page] || 0 );
//                   } catch (e) {
//                     console.error('페이지 시간 기록 실패:', e);
//                   }
//                   setPage(nextPage);
//                   setPageOrder((prev) => [...prev, nextPage]);
//                 } else {
//                   try {
//                     console.log(` [완료] 세션ID=${sessionId}, 서버전송페이지=${page}, 머문시간=${pageTimes[page] || 0}초`);
//                     await handleSavePageTime( page, pageTimes[page] || 0 );
//                   } catch (e) {
//                     console.error('마지막 페이지 기록 실패:', e);
//                   }
//                   const payload = {
//                     totalReadingTime: seconds,
//                     pageTimes,
//                     pageOrder,
//                     movedBackPages,
//                     highlights: highlightedSentences,
//                     readingData,
//                   };
//                   navigation.replace('Result', payload);
//                 }
//               }}
//             >
//               <Text style={styles.pageButton}>{isLastPage ? '완료' : '다음 〉'}</Text>
//             </TouchableOpacity>

//           </View>
//         </View>

//       </View>
      
//       const selectedHighlight =
//         highlightedSentences.find(
//           (item) =>
//             item.startOffset ===
//               selectedSentence?.startOffset &&
//             item.endOffset ===
//               selectedSentence?.endOffset
//         );

//       {/* 문장 메뉴 모달 */}
//       <Modal transparent visible={sentenceMenuVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPress={() => setSentenceMenuVisible(false)}
//         >
//           <View style={styles.menuBox}>
//             <TouchableOpacity
//               style={styles.menuItem}
//               onPress={() => {
//                 setSentenceMenuVisible(false);

//                 const payload={
//                   ...selectedSentence,
//                   sessionId: sessionId,
//                   suthor: todayReading?.author,
//                   bookTitle: todayReading?.title
//                 };
//                 navigation.push('SaveSentence', { selectedSentence });
//               }}
//             >
//               <Text style={styles.menuText}>문장 저장하기</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.menuItem}
//               onPress={async () => {
//                 if (selectedSentence) {
//                   try {
//                     if (matched)) {
//                       await readingService.deleteHighlight(sessionId, matched!.id!);
//                       setHighlightedSentences((prev) =>
//                         prev.filter((item) => !(item.page === page && item.sentenceIndex === selectedSentence.sentenceIndex))
//                       );
//                     } else {
//                       const resData = await readingService.createHighlight(sessionId, selectedSentence.text, selectedSentence.startOffset, selectedSentence.endOffset);
//                       setHighlightedSentences((prev) => [
//                         ...prev,
//                         {
//                           id: resData?.id || Date.now(),
//                           page: selectedSentence.page,
//                           sentenceIndex: selectedSentence.sentenceIndex,
//                           text: selectedSentence.text,
//                           startOffset: selectedSentence.startOffset,
//                           endOffset: selectedSentence.endOffset,
//                         },
//                       ]);
//                     }
//                   } catch (error) {
//                     console.error('형광펜 인터랙션 처리 실패:', error);
//                   }
//                 }
//                 setSentenceMenuVisible(false);
//               }}
//             >
//               <Text style={[styles.menuText, existingHighlight && { color: '#DC2626', fontWeight: '600' }]}>
//                 {existingHighlight ? '형광펜 취소하기' : '형광펜 칠하기'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       {/* 상단 메뉴 모달 */}
//       <Modal transparent visible={topMenuVisible} animationType="fade">
//         <TouchableOpacity style={styles.modalOverlay} onPress={() => setTopMenuVisible(false)}>
//           <View style={styles.menuBox}>
//             <TouchableOpacity
//               style={styles.menuItem}
//               onPress={() => {
//                 setPaused(!paused);
//                 setTopMenuVisible(false);
//               }}
//             >
//               <Text style={styles.menuText}>
//                 {paused ? '타이머 다시 시작' : '타이머 정지'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F8FC', 
//     paddingHorizontal: 16,
//     paddingTop: 12,
//   },
//   readerCard: {
//     flex: 1,
//     backgroundColor: '#FFFFFF', 
//     borderRadius: 28, 
//     overflow: 'hidden',
//   },
//   header: {
//     height: 56,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//     textAlign: 'center',
//   },
//   bookInfo: {
//     alignItems: 'center',
//     marginTop: 24,
//     marginBottom: 24,
//   },
//   bookTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#111827',
//   },
//   bookAuthor: {
//     marginTop: 6,
//     fontSize: 14,
//     color: '#9CA3AF',
//   },
//   contentContainer: {
//     flex: 1,
//     paddingTop: 16,
//     paddingHorizontal: 24,
//   },
//   content: {
//     color: '#374151',
//     marginBottom: 16,
//   },
//   bottomBar: {
//     marginHorizontal: 16,
//     marginBottom: 24,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     paddingVertical: 14,
//     paddingHorizontal: 20,
//   },
//   pageRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   pageButton: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#4B5563',
//   },
//   centerTimerBlock: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   pageText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#4B5563',
//     fontFamily: 'monospace',
//   },
//   timerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 2,
//   },
//   timerText: {
//     fontSize: 11,
//     color: '#9CA3AF',
//     fontFamily: 'monospace',
//     letterSpacing: 0.5,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   menuBox: {
//     width: 220,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     paddingVertical: 10,
//   },
//   menuItem: {
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//   },
//   menuText: {
//     fontSize: 16,
//     color: '#111827',
//   },
//   highlightedText: {
//     backgroundColor: 'rgba(37, 99, 235, 0.12)',
//     borderRadius: 4,
//   },
//   pauseOverlay: {
//     position: 'absolute',
//     backgroundColor: 'rgba(255,255,255,0.4)',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   pauseText: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2563EB',
//     backgroundColor: '#FFFFFF',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 14,
//   },
// });

import {
  API_CONFIG
} from '../../config/apiConfig';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  useState,
  useEffect,
} from 'react';

import {
  BlurView
} from 'expo-blur';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from 'react-native';

import {
  useReadingStore,
} from '../../store/readingStore';

import {
  Ionicons
} from '@expo/vector-icons';

import {
  readingService,
  TodayReading,
} from '../../services/readingService';

import { settingService } from '../../services/settingService';

type SentenceItem = {
  text: string;
  startOffset: number;
  endOffset: number;
};

type PageItem = {
  sentences: SentenceItem[];
  startOffset: number;
  endOffset: number;
};

export default function ReaderScreen() {

  const navigation = useNavigation<any>();

  const [viewerFontSize, setViewerFontSize] = useState<number>(18);
  const [viewerFontFamily, setViewerFontFamily] = useState<string>('NANUM_MYEONGJO');

  const getDynamicMaxChars = (size: number) => {
    if (size <= 14) return 240;
    if (size <= 16) return 200;
    if (size <= 18) return 180;
    return 130;
  };

  const [page, setPage] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [sessionId, setSessionId] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [todayReading, setTodayReading] = useState<TodayReading | null>(null);

  const [pages, setPages] =
    useState<PageItem[]>([]);

  const [pageTimes, setPageTimes] =
    useState<Record<number, number>>({});

  const completeToday =
    useReadingStore((state) => state.completeToday);

  const today =
    new Date().toISOString().split('T')[0];

  const [pageOrder, setPageOrder] =
    useState<number[]>([1]);

  const [movedBackPages, setMovedBackPages] =
    useState<number[]>([]);

  const [sentenceMenuVisible, setSentenceMenuVisible] =
    useState(false);

  const [topMenuVisible, setTopMenuVisible] =
    useState(false);

  const [paused, setPaused] =
    useState(false);

  const [highlightedSentences, setHighlightedSentences] =
    useState<
      {
        id?: number;
        page: number;
        sentenceIndex: number;
        text?: string;
        startOffset: number;
        endOffset: number;
      }[]
    >([]);

  const [selectedSentence, setSelectedSentence] =
    useState<{
      id?: number;
      text: string;
      page: number;
      sentenceIndex: number;
      startOffset: number;
      endOffset: number;
    } | null>(null);

  const selectedHighlight =
    highlightedSentences.find(
      (item) =>
        item.startOffset ===
          selectedSentence?.startOffset &&
        item.endOffset ===
          selectedSentence?.endOffset
    );

  const handleSavePageTime = async (
    pageNumber: number,
    elapsedSeconds: number
  ) => {

    try {

      const currentPageData =
        pages[pageNumber - 1];

      if (!currentPageData) return;

      console.log({
        pageNumber,
        startOffset:
          currentPageData.startOffset,
        endOffset:
          currentPageData.endOffset,
      });

      await readingService.savePageTime(
        sessionId,
        1,
        currentPageData.startOffset,
        currentPageData.endOffset,
        elapsedSeconds
      );

    } catch (e) {

      console.error(
        '페이지 시간 기록 실패:',
        e
      );
    }
  };

  const splitIntoPages = (
    text: string,
    maxChars: number = 180
  ): PageItem[] => {

    const rawSentences = text
      .split(/\n+/)
      .flatMap(
        (line) =>
          line.match(/[^.!?]+[.!?]?/g) || []
      )
      .filter(
        (sentence) =>
          sentence.trim().length > 0
      );

    const pages: PageItem[] = [];

    let currentPage: SentenceItem[] = [];
    let currentLength = 0;

    let currentOffset = 0;
    let pageStartOffset = 0;

    rawSentences.forEach((sentence) => {

      const trimmed = sentence.trim();

      const sentenceStartOffset =
        currentOffset;

      const sentenceEndOffset =
        currentOffset + trimmed.length;

      const sentenceItem: SentenceItem = {
        text: trimmed,
        startOffset: sentenceStartOffset,
        endOffset: sentenceEndOffset,
      };

      if (
        currentLength + trimmed.length <= maxChars
      ) {

        currentPage.push(sentenceItem);

        currentLength += trimmed.length;

      } else {

        pages.push({
          sentences: currentPage,
          startOffset: pageStartOffset,
          endOffset:
            currentPage[
              currentPage.length - 1
            ]?.endOffset || pageStartOffset,
        });

        currentPage = [sentenceItem];

        currentLength = trimmed.length;

        pageStartOffset =
          sentenceStartOffset;
      }

      currentOffset =
        sentenceEndOffset + 1;
    });

    if (currentPage.length > 0) {

      pages.push({
        sentences: currentPage,
        startOffset: pageStartOffset,
        endOffset:
          currentPage[
            currentPage.length - 1
          ]?.endOffset || pageStartOffset,
      });
    }

    return pages;
  };

  const totalPages = pages.length;
  const isLastPage = page === totalPages;

  const readingData = pages.map((item, index) => ({
    page: index + 1,
    textLength:
      item.sentences
        .map((s) => s.text)
        .join(' ')
        .length
  }));

  useEffect(() => {

    const startReadingSessionAndSettings =
      async () => {

        try {

          setLoading(true);

          console.log(
            ' USE_MOCK MODE 상태:',
            API_CONFIG.USE_MOCK
          );

          try {

            const globalSettings =
              await settingService.getSettings();

            if (
              globalSettings &&
              globalSettings.success
            ) {

              setViewerFontSize(
                globalSettings.data.fontSize || 18
              );

              setViewerFontFamily(
                globalSettings.data.fontFamily ||
                'NANUM_MYEONGJO'
              );

              console.log(
                `📡 [설정 동기화] 크기: ${globalSettings.data.fontSize}px, 글꼴: ${globalSettings.data.fontFamily}`
              );
            }

          } catch (settingError) {

            console.log(
              ' 글로벌 설정을 불러오지 못해 기본 레이아웃으로 구동합니다.'
            );
          }

          if (API_CONFIG.USE_MOCK) {

            const mockData: TodayReading = {
              bookId: 999,
              title: "사색의 공간",
              author: "안다현",
              content:
                "현대 사회에서 침묵은 존재의 상태라기보다 일종의 사치품이 되어버렸습니다. 우리는 디지털 알림의 리드미컬한 소음 속에 끊임없이 매여 있으며, 한때 사색이 머물던 빈 공간은 끈질긴 정전기 같은 소음들로 채워지고 있습니다.\n우리 마음의 구조는 결코 이러한 끊임없는 유입을 견디도록 설계되지 않았습니다. 끝!",
              coverImageUrl:
                "https://example.com/mock-cover.png",
              characterCount: 168,
            };

            setTodayReading(mockData);

            const dynamicMaxChars =
              getDynamicMaxChars(
                viewerFontSize
              );

            const generatedPages =
              splitIntoPages(
                mockData.content,
                dynamicMaxChars
              );

            setPages(generatedPages);

            setSessionId(777);

            return;
          }

          const todayData =
            await readingService.getTodayReading();

          setTodayReading(todayData);

          const dynamicMaxChars =
            getDynamicMaxChars(
              viewerFontSize
            );

          const generatedPages =
            splitIntoPages(
              todayData.content,
              dynamicMaxChars
            );

          setPages(generatedPages);

          const session =
            await readingService.startReading(
              todayData.bookId
            );

          setSessionId(session.id);

          try {

            const existingHighlights =
              await readingService.getHighlights(
                session.id
              );

            if (
              existingHighlights &&
              existingHighlights.length > 0
            ) {
              setHighlightedSentences(
                existingHighlights.map(
                  (item: any) => ({
                    id: item.id,
                    text: item.highlightedText,
                    startOffset: item.startOffset,
                    endOffset: item.endOffset,
                    page: 0,
                    sentenceIndex: 0,
                  })
                )
              );

              console.log(
                '기존 형광펜 연동 확인 완료'
              );
            }

          } catch (e) {

            console.log(
              '이전 형광펜 이력 없음'
            );
          }

        } catch (error: any) {

          console.error(
            '❌ 독서 세션 실패:',
            error.message
          );

        } finally {

          setLoading(false);
        }
      };

    startReadingSessionAndSettings();

  }, [viewerFontSize]);

  useEffect(() => {

    if (paused) return;

    const timer = setInterval(() => {

      setSeconds((prev) => prev + 1);

      setPageTimes((prev) => ({
        ...prev,
        [page]: (prev[page] || 0) + 1,
      }));

    }, 1000);

    return () => clearInterval(timer);

  }, [page, paused]);

  const hours =
    Math.floor(seconds / 3600);

  const minutes =
    Math.floor((seconds % 3600) / 60);

  const secs =
    seconds % 60;

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  if (loading) {

    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
      >
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.readerCard}>

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Home')
            }
          >
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
              size={22}
              color="#111827"
            />
          </TouchableOpacity>

        </View>

        {page === 1 && (
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>
              {todayReading?.title}
            </Text>

            <Text style={styles.bookAuthor}>
              {todayReading?.author}
            </Text>
          </View>
        )}

        <View style={styles.contentContainer}>

          {paused && (
            <BlurView
              intensity={85}
              style={styles.pauseOverlay}
            >
              <Text style={styles.pauseText}>
                타이머 정지 중
              </Text>
            </BlurView>
          )}

          <View>

            {pages[page - 1]?.sentences.map(
              (
                sentence: SentenceItem,
                index: number
              ) => {

                const existingHighlight =
                  highlightedSentences.find(
                    (h) =>
                      h.startOffset ===
                        sentence.startOffset &&
                      h.endOffset ===
                        sentence.endOffset
                  );

                return (

                  <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    onLongPress={() => {

                      setSelectedSentence({
                        id:
                          existingHighlight?.id,

                        text:
                          sentence.text,

                        startOffset:
                          sentence.startOffset,

                        endOffset:
                          sentence.endOffset,

                        page,

                        sentenceIndex: index,
                      });

                      setSentenceMenuVisible(true);
                    }}
                  >
                    <Text
                      style={[
                        styles.content,
                        {
                          fontSize:
                            viewerFontSize,

                          fontFamily:
                            viewerFontFamily ===
                            'NOTO_SANS'
                              ? undefined
                              : 'Kopub',

                          lineHeight:
                            viewerFontSize * 1.7,
                        },

                        existingHighlight &&
                          styles.highlightedText,
                      ]}
                    >
                      {sentence.text}
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}

          </View>

        </View>

        <View style={styles.bottomBar}>

          <View style={styles.pageRow}>

            <TouchableOpacity
              onPress={async () => {

                if (page > 1) {

                  const prevPage =
                    page - 1;

                  try {

                    await handleSavePageTime(
                      page,
                      pageTimes[page] || 0
                    );

                  } catch (e) {

                    console.error(
                      '페이지 시간 기록 실패:',
                      e
                    );
                  }

                  setPage(prevPage);

                  setMovedBackPages(
                    (prev) => [
                      ...prev,
                      prevPage
                    ]
                  );

                  setPageOrder(
                    (prev) => [
                      ...prev,
                      prevPage
                    ]
                  );
                }
              }}
              disabled={page === 1}
              style={{
                opacity:
                  page === 1 ? 0.3 : 1
              }}
            >
              <Text style={styles.pageButton}>
                〈 이전
              </Text>
            </TouchableOpacity>

            <View style={styles.centerTimerBlock}>

              <Text style={styles.pageText}>
                {page} / {totalPages}
              </Text>

              <View style={styles.timerRow}>
                <Text style={styles.timerText}>
                  {formatTime(hours)}:
                  {formatTime(minutes)}:
                  {formatTime(secs)}
                </Text>
              </View>

            </View>

            <TouchableOpacity
              onPress={async () => {

                if (!isLastPage) {

                  const nextPage =
                    page + 1;

                  try {

                    await handleSavePageTime(
                      page,
                      pageTimes[page] || 0
                    );

                  } catch (e) {

                    console.error(
                      '페이지 시간 기록 실패:',
                      e
                    );
                  }

                  setPage(nextPage);

                  setPageOrder(
                    (prev) => [
                      ...prev,
                      nextPage
                    ]
                  );

                } else {

                  try {

                    await handleSavePageTime(
                      page,
                      pageTimes[page] || 0
                    );

                  } catch (e) {

                    console.error(
                      '마지막 페이지 기록 실패:',
                      e
                    );
                  }

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

                  navigation.replace(
                    'Result',
                    payload
                  );
                }
              }}
            >
              <Text style={styles.pageButton}>
                {isLastPage
                  ? '완료'
                  : '다음 〉'}
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
              onPress={async () => {

                if (selectedSentence) {

                  try {

                    if (selectedHighlight) {

                      await readingService.deleteHighlight(
                        sessionId,
                        selectedHighlight.id!
                      );

                      setHighlightedSentences(
                        (prev) =>
                          prev.filter(
                            (item) =>
                              !(
                                item.startOffset ===
                                  selectedSentence.startOffset &&
                                item.endOffset ===
                                  selectedSentence.endOffset
                              )
                          )
                      );

                    } else {

                      const resData =
                        await readingService.createHighlight(
                          sessionId,
                          selectedSentence.text,
                          selectedSentence.startOffset,
                          selectedSentence.endOffset
                        );
                        console.log(resData);

                      setHighlightedSentences(
                        (prev) => [
                          ...prev,
                          {
                            id:
                              resData?.data?.id ||
                              resData?.id ||
                              Date.now(),

                            page:
                              selectedSentence.page,

                            sentenceIndex:
                              selectedSentence.sentenceIndex,

                            text:
                              selectedSentence.text,

                            startOffset:
                              selectedSentence.startOffset,

                            endOffset:
                              selectedSentence.endOffset,
                          },
                        ]
                      );
                    }

                  } catch (error) {

                    console.error(
                      '형광펜 인터랙션 처리 실패:',
                      error
                    );
                  }
                }

                setSentenceMenuVisible(false);
              }}
            >
              <Text
                style={[
                  styles.menuText,

                  selectedHighlight && {
                    color: '#DC2626',
                    fontWeight: '600',
                  },
                ]}
              >
                {selectedHighlight
                  ? '형광펜 취소하기'
                  : '형광펜 칠하기'}
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
                {paused
                  ? '타이머 다시 시작'
                  : '타이머 정지'}
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
    backgroundColor: '#F7F8FC',
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  readerCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    overflow: 'hidden',
  },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },

  bookInfo: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },

  bookTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },

  bookAuthor: {
    marginTop: 6,
    fontSize: 14,
    color: '#9CA3AF',
  },

  contentContainer: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 120,
  },

  content: {
    color: '#374151',
    marginBottom: 16,
  },

  bottomBar: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },

  pageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pageButton: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },

  centerTimerBlock: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  pageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    fontFamily: 'monospace',
  },

  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },

  timerText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
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
      'rgba(37, 99, 235, 0.12)',
    borderRadius: 4,
  },

  pauseOverlay: {
    position: 'absolute',
    backgroundColor:
      'rgba(255,255,255,0.4)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  pauseText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
});