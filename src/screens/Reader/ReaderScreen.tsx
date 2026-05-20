// // import {
// //   API_CONFIG
// // } from '../../config/apiConfig';

// // import {
// //   useNavigation,
// // } from '@react-navigation/native';

// // import {
// //   useState,
// //   useEffect,
// // } from 'react';

// // import {
// //   BlurView
// // } from 'expo-blur';

// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   SafeAreaView,
// //   Modal,
// //   ActivityIndicator,
// // } from 'react-native';

// // import {
// //   useReadingStore,
// // } from '../../store/readingStore';

// // import {
// //   Ionicons
// // } from '@expo/vector-icons';

// // import {
// //   readingService,
// //   TodayReading,
// // } from '../../services/readingService';

// // export default function ReaderScreen() {

// //   const navigation =
// //     useNavigation<any>();

// //   const [page, setPage] =
// //     useState(1);

// //   const [seconds, setSeconds] =
// //     useState(0);

// //   const [sessionId, setSessionId] =
// //     useState<number>(1);

// //   const [loading, setLoading] =
// //     useState(true);

// //   const [todayReading, setTodayReading] =
// //     useState<TodayReading | null>(null);

// //   const [pages, setPages] =
// //     useState<
// //       {
// //         sentences: string[];
// //       }[]
// //     >([]);

// //   const [pageTimes, setPageTimes] =
// //     useState<Record<number, number>>({});

// //   const completeToday =
// //     useReadingStore(
// //       (state) =>
// //         state.completeToday
// //     );

// //   const today =
// //     new Date()
// //       .toISOString()
// //       .split('T')[0];
    
// //   useEffect(()=> {
// //       completeToday(today);
// //     },[]);
  

// //   const [pageOrder, setPageOrder] =
// //     useState<number[]>([1]);

// //   const [
// //     movedBackPages,
// //     setMovedBackPages,
// //   ] = useState<number[]>([]);

// //   const [
// //     sentenceMenuVisible,
// //     setSentenceMenuVisible,
// //   ] = useState(false);

// //   const [
// //     topMenuVisible,
// //     setTopMenuVisible,
// //   ] = useState(false);

// //   const [
// //     highlightedSentences,
// //     setHighlightedSentences,
// //   ] = useState<
// //     {
// //       page: number;
// //       sentenceIndex: number;
// //       text?: string;
// //     }[]
// //   >([]);

// //   const [
// //     selectedSentence,
// //     setSelectedSentence,
// //   ] = useState<{
// //     text: string;
// //     page: number;
// //     sentenceIndex: number;
// //   } | null>(null);

// //   const [paused, setPaused] =
// //     useState(false);

// //   // ✅ 긴 글 자동 페이지 분할
// // const splitIntoPages = (
// //   text: string,
// //   maxChars: number = 180
// // ) => {

// //   const sentences =
// //     text
// //       .split(/\n+/)
// //       .flatMap(
// //         (line) =>
// //           line.match(
// //             /[^.!?]+[.!?]?/g
// //           ) || []
// //       )
// //       .filter(
// //         (sentence) =>
// //           sentence.trim().length > 0
// //       );

// //   const pages: {
// //     sentences: string[];
// //   }[] = [];

// //   let currentPage: string[] = [];
// //   let currentLength = 0;

// //   sentences.forEach(
// //     (sentence) => {

// //       const trimmed =
// //         sentence.trim();

// //       if (
// //         currentLength +
// //           trimmed.length <=
// //         maxChars
// //       ) {

// //         currentPage.push(
// //           trimmed
// //         );

// //         currentLength +=
// //           trimmed.length;

// //       } else {

// //         pages.push({
// //           sentences:
// //             currentPage,
// //         });

// //         currentPage = [
// //           trimmed,
// //         ];

// //         currentLength =
// //           trimmed.length;
// //       }
// //     }
// //   );

// //   if (
// //     currentPage.length > 0
// //   ) {

// //     pages.push({
// //       sentences:
// //         currentPage,
// //     });
// //   }

// //   return pages;
// // };

// //   const totalPages =
// //     pages.length;

// //   const isLastPage =
// //     page === totalPages;

// //   const readingData =
// //     pages.map(
// //       (item, index) => ({
// //         page: index + 1,
// //         textLength:
// //           item.sentences
// //             .join(' ')
// //             .length
// //       })
// //     );

// //   // ✅ 독서 세션 시작
// //   useEffect(() => {

// //     const startReadingSession =
// //       async () => {

// //         try {

// //           setLoading(true);

// //           console.log(
// //             '🔥 USE_MOCK:',
// //             API_CONFIG.USE_MOCK
// //           );

// //           console.log(
// //             '1️⃣ today api 호출 시작'
// //           );
          

// //           const todayData =
// //             await readingService.getTodayReading();

// //           console.log(
// //             '2️⃣ today 응답:',
// //             todayData
// //           );
          

// //           setTodayReading(todayData);

// //           // ✅ content 기반 페이지 자동 생성
// //           const generatedPages =
// //             splitIntoPages(
// //               todayData.content
// //             );

// //           setPages(generatedPages);

// //           console.log(
// //             '📄 생성된 페이지 수:',
// //             generatedPages.length
// //           );

// //           console.log(
// //             '3️⃣ today.bookId:',
// //             todayData.bookId
// //           );

// //           const session =
// //             await readingService.startReading(
// //               todayData.bookId
// //             );

// //           console.log(
// //             '4️⃣ 독서 시작 성공:',
// //             session
// //           );

// //           setSessionId(session.id);

// //         } catch (error: any) {

// //           console.error(
// //             '❌ 독서 시작 실패:',
// //             error.response?.data ||
// //             error.message
// //           );

// //         } finally {

// //           setLoading(false);
// //         }
// //       };

// //     startReadingSession();

// //   }, []);

// //   // ✅ 타이머
// //   useEffect(() => {

// //     if (paused) return;

// //     const timer =
// //       setInterval(() => {

// //         setSeconds(
// //           (prev) => prev + 1
// //         );

// //         setPageTimes(
// //           (prev) => ({
// //             ...prev,

// //             [page]:
// //               (prev[page] || 0) + 1,
// //           })
// //         );

// //       }, 1000);

// //     return () =>
// //       clearInterval(timer);

// //   }, [page, paused]);

// //   const hours =
// //     Math.floor(seconds / 3600);

// //   const minutes =
// //     Math.floor(
// //       (seconds % 3600) / 60
// //     );

// //   const secs =
// //     seconds % 60;

// //   const formatTime = (
// //     time: number
// //   ) => {

// //     return time
// //       .toString()
// //       .padStart(2, '0');
// //   };

// //   if (loading) {

// //     return (
// //       <SafeAreaView
// //         style={[
// //           styles.container,
// //           {
// //             justifyContent:
// //               'center',
// //             alignItems:
// //               'center',
// //           }
// //         ]}
// //       >
// //         <ActivityIndicator
// //           size="large"
// //           color="#2563EB"
// //         />
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <SafeAreaView
// //       style={styles.container}
// //     >

// //       {/* 리더 카드 */}
// //       <View style={styles.readerCard}>

// //         {/* 헤더 */}
// //         <View style={styles.header}>

// //           <TouchableOpacity
// //             onPress={() =>
// //               navigation.goBack()
// //             }
// //           >
// //             <Ionicons
// //               name="arrow-back"
// //               size={24}
// //               color="#111827"
// //             />
// //           </TouchableOpacity>

// //           <Text
// //             style={styles.headerTitle}
// //           >
// //              오늘의 읽기
// //           </Text>

// //           <TouchableOpacity
// //             onPress={() =>
// //               setTopMenuVisible(true)
// //             }
// //           >
// //             <Ionicons
// //               name="ellipsis-vertical"
// //               size={20}
// //               color="#111827"
// //             />
// //           </TouchableOpacity>

// //         </View>

// //         {/* 책 정보 */}
// //         {page === 1 && (
// //           <View style={styles.bookInfo}>

// //             <Text
// //               style={styles.bookTitle}
// //             >
// //               {
// //                 todayReading?.title
// //               }
// //             </Text>

// //             <Text
// //               style={styles.bookAuthor}
// //             >
// //               {
// //                 todayReading?.author
// //               }
// //             </Text>

// //           </View>
// //         )}

// //         {/* 본문 */}
// //         <View
// //           style={
// //             styles.contentContainer
// //           }
// //         >

// //           {paused && (

// //             <BlurView
// //               intensity={85}
// //               style={
// //                 styles.pauseOverlay
// //               }
// //             >

// //               <Text
// //                 style={
// //                   styles.pauseText
// //                 }
// //               >
// //                 타이머 정지 중
// //               </Text>

// //             </BlurView>

// //           )}

// //           <View>

// //             {pages[
// //               page - 1
// //             ]?.sentences.map(
// //               (
// //                 sentence: string,
// //                 index: number
// //               ) => (

// //                 <TouchableOpacity
// //                   key={index}
// //                   activeOpacity={1}
// //                   onLongPress={() => {

// //                     setSelectedSentence({
// //                       text: sentence,
// //                       page,
// //                       sentenceIndex:
// //                         index,
// //                     });

// //                     setSentenceMenuVisible(
// //                       true
// //                     );
// //                   }}
// //                 >

// //                   <Text
// //                     style={[
// //                       styles.content,

// //                       highlightedSentences.some(
// //                         (item) =>
// //                           item.page ===
// //                             page &&
// //                           item.sentenceIndex ===
// //                             index
// //                       ) &&
// //                         styles.highlightedText,
// //                     ]}
// //                   >
// //                     {sentence}
// //                   </Text>

// //                 </TouchableOpacity>
// //               )
// //             )}

// //           </View>
// //         </View>

// //         {/* 페이지 바 */}
// //         <View style={styles.bottomBar}>

// //           <View style={styles.pageRow}>

// //             <TouchableOpacity
// //               onPress={async () => {

// //                 if (page > 1) {
// //                   const prevPage =
// //                     page - 1;

// //                   // 💡 백엔드 실시간 연동: 이전 페이지로 넘어가기 직전, 현재 머물렀던 시간을 기록 전송
// //                   try {
// //                     await readingService.savePageTime(
// //                       sessionId,
// //                       page,
// //                       pageTimes[page] || 0
// //                     );
// //                   } catch (e) {
// //                     console.error('페이지 시간 기록 실패:', e);
// //                   }

// //                   setPage(prevPage);

// //                   setMovedBackPages(
// //                     (prev) => [
// //                       ...prev,
// //                       prevPage,
// //                     ]
// //                   );

// //                   setPageOrder(
// //                     (prev) => [
// //                       ...prev,
// //                       prevPage,
// //                     ]
// //                   );
// //                 }
// //               }}
// //             >

// //               <Text
// //                 style={
// //                   styles.pageButton
// //                 }
// //               >
// //                 이전
// //               </Text>

// //             </TouchableOpacity>

// //             <View>

// //               <Text
// //                 style={styles.pageText}
// //               >
// //                 {page} / {totalPages}
// //               </Text>

// //               <Text
// //                 style={styles.timer}
// //               >
// //                 {formatTime(hours)}:
// //                 {formatTime(minutes)}:
// //                 {formatTime(secs)}
// //               </Text>

// //             </View>

// //             <TouchableOpacity
// //               onPress={async () => {

// //                 if (!isLastPage) {
// //                   const nextPage =
// //                     page + 1;

// //                   // 💡 백엔드 실시간 연동: 다음 페이지로 넘어가기 직전, 현재 머물렀던 시간을 기록 전송
// //                   try {
// //                     await readingService.savePageTime(
// //                       sessionId,
// //                       page,
// //                       pageTimes[page] || 0
// //                     );
// //                   } catch (e) {
// //                     console.error('페이지 시간 기록 실패:', e);
// //                   }

// //                   setPage(nextPage);

// //                   setPageOrder(
// //                     (prev) => [
// //                       ...prev,
// //                       nextPage,
// //                     ]
// //                   );

// //                 } else {

// //                   // 💡 백엔드 실시간 연동: 마지막 페이지에서 완료 시 마지막 페이지 잔여 시간 최종 전송
// //                   try {
// //                     await readingService.savePageTime(
// //                       sessionId,
// //                       page,
// //                       pageTimes[page] || 0
// //                     );
// //                   } catch (e) {
// //                     console.error('마지막 페이지 기록 실패:', e);
// //                   }

// //                   const payload = {

// //                     totalReadingTime:
// //                       seconds,

// //                     pageTimes,

// //                     pageOrder,

// //                     movedBackPages,

// //                     highlights:
// //                       highlightedSentences,

// //                     readingData,
// //                   };

// //                   navigation.replace(
// //                     'Result',
// //                     payload
// //                   );
// //                 }
// //               }}
// //             >

// //               <Text
// //                 style={
// //                   styles.pageButton
// //                 }
// //               >
// //                 {isLastPage
// //                   ? '완료'
// //                   : '다음'}
// //               </Text>

// //             </TouchableOpacity>

// //           </View>

// //         </View>

// //       </View>

// //       {/* 문장 메뉴 */}
// //       <Modal
// //         transparent
// //         visible={
// //           sentenceMenuVisible
// //         }
// //         animationType="fade"
// //       >

// //         <TouchableOpacity
// //           style={styles.modalOverlay}
// //           activeOpacity={1}
// //           onPress={() =>
// //             setSentenceMenuVisible(
// //               false
// //             )
// //           }
// //         >

// //           <View style={styles.menuBox}>

// //             <TouchableOpacity
// //               style={styles.menuItem}
// //               onPress={() => {

// //                 setSentenceMenuVisible(
// //                   false
// //                 );

// //                 navigation.push(
// //                   'SaveSentence',
// //                   {
// //                     selectedSentence,
// //                   }
// //                 );
// //               }}
// //             >

// //               <Text
// //                 style={styles.menuText}
// //               >
// //                 문장 저장하기
// //               </Text>

// //             </TouchableOpacity>

// //             <TouchableOpacity
// //               style={styles.menuItem}
// //               onPress={async () => {

// //                 if (
// //                   selectedSentence
// //                 ) {

// //                   try {

// //                     setHighlightedSentences(
// //                       (prev) => [
// //                         ...prev,
// //                         selectedSentence,
// //                       ]
// //                     );

// //                     // 💡 서비스 연동: 다현님이 선택한 문장을 백엔드 하이라이트 DB에 전송
// //                     await readingService.createHighlight(
// //                       sessionId,
// //                       selectedSentence.text,
// //                       0,
// //                       0
// //                     );

// //                     console.log(
// //                       '🖍️ 형광펜 저장 완료'
// //                     );

// //                   } catch (error) {

// //                     console.error(
// //                       '형광펜 저장 실패:',
// //                       error
// //                     );
// //                   }
// //                 }

// //                 setSentenceMenuVisible(
// //                   false
// //                 );
// //               }}
// //             >

// //               <Text
// //                 style={styles.menuText}
// //               >
// //                 형광펜 칠하기
// //               </Text>

// //             </TouchableOpacity>

// //           </View>

// //         </TouchableOpacity>

// //       </Modal>

// //       {/* 상단 메뉴 */}
// //       <Modal
// //         transparent
// //         visible={topMenuVisible}
// //         animationType="fade"
// //       >

// //         <TouchableOpacity
// //           style={styles.modalOverlay}
// //           onPress={() =>
// //             setTopMenuVisible(false)
// //           }
// //         >

// //           <View style={styles.menuBox}>

// //             <TouchableOpacity
// //               style={styles.menuItem}
// //               onPress={() => {

// //                 setPaused(!paused);

// //                 setTopMenuVisible(
// //                   false
// //                 );
// //               }}
// //             >

// //               <Text
// //                 style={styles.menuText}
// //               >
// //                 {paused
// //                   ? '타이머 다시 시작'
// //                   : '타이머 정지'}
// //               </Text>

// //             </TouchableOpacity>

// //           </View>

// //         </TouchableOpacity>

// //       </Modal>

// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({

// //   container: {
// //     flex: 1,
// //     backgroundColor: '#ECECF3',

// //     paddingHorizontal: 16,
// //     paddingTop: 12,
// //   },

// //   readerCard: {
// //     flex: 1,

// //     backgroundColor: '#F7F8FC',

// //     borderRadius: 22,

// //     overflow: 'hidden',
// //   },

// //   header: {
// //     height: 56,

// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',

// //     paddingHorizontal: 16,

// //     borderBottomWidth: 1,
// //     borderBottomColor: '#E5E7EB',
// //   },

// //   headerTitle: {
// //     position: 'absolute',
// //     left: 54,

// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: '#111827',
// //   },

// //   bookInfo: {
// //     alignItems: 'center',

// //     marginTop: 32,
// //     marginBottom: 36,
// //   },

// //   bookTitle: {
// //     fontSize: 28,
// //     fontWeight: '700',

// //     color: '#111827',
// //   },

// //   bookAuthor: {
// //     marginTop: 10,

// //     fontSize: 15,
// //     fontWeight: '400',

// //     color: '#9CA3AF',
// //   },

// //   contentContainer: {
// //     flex: 1,

// //     paddingTop: 28,
// //     paddingHorizontal: 28,
    
    
// //   },

// //   content: {
// //     fontSize: 18,
// //     lineHeight: 34,

// //     color: '#374151',
// //   },

// //   bottomBar: {
// //     marginHorizontal: 14,
// //     marginBottom: 22,

// //     backgroundColor: '#FFFFFF',

// //     borderRadius: 16,

// //     borderWidth: 1,
// //     borderColor: '#D1D5DB',

// //     paddingVertical: 12,
// //     paddingHorizontal: 20,
// //   },

// //   pageRow: {
// //     flexDirection: 'row',
// //     justifyContent:
// //       'space-between',

// //     alignItems: 'center',
// //   },

// //   pageButton: {
// //     fontSize: 15,
// //     fontWeight: '600',

// //     color: '#9CA3AF',
// //   },

// //   pageText: {
// //     textAlign: 'center',

// //     fontSize: 15,
// //     fontWeight: '600',

// //     color: '#6B7280',
// //   },

// //   timer: {
// //     marginTop: 2,

// //     textAlign: 'center',

// //     fontSize: 10,

// //     color: '#9CA3AF',
// //   },

// //   modalOverlay: {
// //     flex: 1,

// //     backgroundColor:
// //       'rgba(0,0,0,0.1)',

// //     justifyContent: 'center',

// //     alignItems: 'center',
// //   },

// //   menuBox: {
// //     width: 220,

// //     backgroundColor: '#FFFFFF',

// //     borderRadius: 16,

// //     paddingVertical: 10,
// //   },

// //   menuItem: {
// //     paddingVertical: 16,
// //     paddingHorizontal: 20,
// //   },

// //   menuText: {
// //     fontSize: 16,
// //     color: '#111827',
// //   },

// //   highlightedText: {
// //     backgroundColor:
// //       'rgba(37, 99, 235, 0.1)',

// //     borderRadius: 6,
// //   },

// //   sentenceWrapper: {
// //     marginBottom: 28,
// //   },

// //   pauseOverlay: {
// //     position: 'absolute',

// //     backgroundColor:
// //       'rgba(255,255,255,0.15)',

// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,

// //     justifyContent: 'center',

// //     alignItems: 'center',

// //     zIndex: 10,
// //   },

// //   pauseText: {
// //     fontSize: 22,

// //     fontWeight: '700',

// //     color: '#111827',
// //   },
// // });

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

// export default function ReaderScreen() {

//   const navigation = useNavigation<any>();

//   // 사용자 글자 크기 설정 상태 관리
//   const [viewerFontSize, setViewerFontSize] = useState<number>(18); // 기본값 18px

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
//   const [pages, setPages] = useState<{ sentences: string[]; }[]>([]);
//   const [pageTimes, setPageTimes] = useState<Record<number, number>>({});

//   const completeToday = useReadingStore((state) => state.completeToday);
//   const today = new Date().toISOString().split('T')[0];
  
//   const [pageOrder, setPageOrder] = useState<number[]>([1]);
//   const [movedBackPages, setMovedBackPages] = useState<number[]>([]);
//   const [sentenceMenuVisible, setSentenceMenuVisible] = useState(false);
//   const [topMenuVisible, setTopMenuVisible] = useState(false);
//   const [paused, setPaused] = useState(false);

//   const [highlightedSentences, setHighlightedSentences] = useState<
//     { id?: number; page: number; sentenceIndex: number; text?: string; }[]
//   >([]);

//   const [selectedSentence, setSelectedSentence] = useState<{
//     id?: number; text: string; page: number; sentenceIndex: number;
//   } | null>(null);

//   // 긴 글 자동 페이지 분할
//   const splitIntoPages = (text: string, maxChars: number = 180) => {
//     const sentences = text
//       .split(/\n+/)
//       .flatMap((line) => line.match(/[^.!?]+[.!?]?/g) || [])
//       .filter((sentence) => sentence.trim().length > 0);

//     const pages: { sentences: string[]; }[] = [];
//     let currentPage: string[] = [];
//     let currentLength = 0;

//     sentences.forEach((sentence) => {
//       const trimmed = sentence.trim();
//       if (currentLength + trimmed.length <= maxChars) {
//         currentPage.push(trimmed);
//         currentLength += trimmed.length;
//       } else {
//         pages.push({ sentences: currentPage });
//         currentPage = [trimmed];
//         currentLength = trimmed.length;
//       }
//     });

//     if (currentPage.length > 0) {
//       pages.push({ sentences: currentPage });
//     }
//     return pages;
//   };

//   const totalPages = pages.length;
//   const isLastPage = page === totalPages;

//   const readingData = pages.map((item, index) => ({
//     page: index + 1,
//     textLength: item.sentences.join(' ').length
//   }));

//   // ✅ 독서 세션 시작 및 설정 반영 통합 훅 (MOCK 모드 완벽 탑재)
//   useEffect(() => {
//     const startReadingSessionAndSettings = async () => {
//       try {
//         setLoading(true);
//         console.log('🔥 USE_MOCK MODE 상태:', API_CONFIG.USE_MOCK);

//         // 💡 [Mock 치트키 처리] 백엔드가 터졌을 때 프론트 혼자 테스트하기 위한 구원 방어막
//         if (API_CONFIG.USE_MOCK) {
//           const mockData: TodayReading = {
//             bookId: 999,
//             title: "사색의 공간",
//             author: "안다현",
//             content: "현대 사회에서 침묵은 존재의 상태라기보다 일종의 사치품이 되어버렸습니다. 우리는 디지털 알림의 리드미컬한 소음 속에 끊임없이 매여 있으며, 한때 사색이 머물던 빈 공간은 끈질긴 정전기 같은 소음들로 채워지고 있습니다.\n우리 마음의 구조는 결코 이러한 끊임없는 유입을 견독록 설계되지 않았습니다. 끝!",
//             coverImageUrl: "https://example.com/mock-cover.png",
//             characterCount: 168,
//           };

//           setTodayReading(mockData);
//           const dynamicMaxChars = getDynamicMaxChars(viewerFontSize);
//           const generatedPages = splitIntoPages(mockData.content, dynamicMaxChars);
//           setPages(generatedPages);
//           setSessionId(777); // 임시 목 세션 ID 부여
          
//           console.log('🧪 MOCK 독서 세션 세팅 성공 (페이지 수:', generatedPages.length, ')');
//           return; // 실서버 로직으로 넘어가지 않게 중단
//         }

//         // 🌐 실서버 모드 (`USE_MOCK: false`)일 때 작동하는 백엔드 파이프라인
//         console.log('1️⃣ today api 호출 시작');
//         const todayData = await readingService.getTodayReading();
//         console.log('2️⃣ today 응답:', todayData);
//         setTodayReading(todayData);

//         const dynamicMaxChars = getDynamicMaxChars(viewerFontSize);
//         const generatedPages = splitIntoPages(todayData.content, dynamicMaxChars);
//         setPages(generatedPages);

//         console.log('📄 생성된 페이지 수:', generatedPages.length);
//         console.log('3️⃣ today.bookId:', todayData.bookId);

//         const session = await readingService.startReading(todayData.bookId);
//         console.log('4️⃣ 독서 시작 성공:', session);
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
//         console.error('❌ 실서버 독서 세션 실패:', error.message);
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

//   const existingHighlight = highlightedSentences.find(
//     (item) => item.page === page && item.sentenceIndex === selectedSentence?.sentenceIndex
//   );

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

//         {/* 헤더 구역 (뒤로가기 시 홈 화면 이동 가드 장착 완료) */}
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

//         {/* 本文 본문 */}
//         <View style={styles.contentContainer}>
//           {paused && (
//             <BlurView intensity={85} style={styles.pauseOverlay}>
//               <Text style={styles.pauseText}>타이머 정지 중</Text>
//             </BlurView>
//           )}

//           <View>
//             {pages[page - 1]?.sentences.map((sentence: string, index: number) => (
//               <TouchableOpacity
//                 key={index}
//                 activeOpacity={1}
//                 onLongPress={() => {
//                   const matched = highlightedSentences.find(
//                     (h) => h.page === page && h.sentenceIndex === index
//                   );
//                   setSelectedSentence({
//                     id: matched?.id,
//                     text: sentence,
//                     page,
//                     sentenceIndex: index,
//                   });
//                   setSentenceMenuVisible(true);
//                 }}
//               >
//                 <Text
//                   style={[
//                     styles.content,
//                     { fontSize: viewerFontSize }, 
//                     highlightedSentences.some(
//                       (item) => item.page === page && item.sentenceIndex === index
//                     ) && styles.highlightedText,
//                   ]}
//                 >
//                   {sentence}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* 하단 페이지 바 / 계기판 */}
//         <View style={styles.bottomBar}>
//           <View style={styles.pageRow}>
            
//             <TouchableOpacity
//               onPress={async () => {
//                 if (page > 1) {
//                   const prevPage = page - 1;
//                   try {
//                     await readingService.savePageTime(sessionId, page, pageTimes[page] || 0);
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

//             {/* 중앙 타이머 및 스케일 */}
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
//                     await readingService.savePageTime(sessionId, page, pageTimes[page] || 0);
//                   } catch (e) {
//                     console.error('페이지 시간 기록 실패:', e);
//                   }
//                   setPage(nextPage);
//                   setPageOrder((prev) => [...prev, nextPage]);
//                 } else {
//                   try {
//                     await readingService.savePageTime(sessionId, page, pageTimes[page] || 0);
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
//                     if (existingHighlight) {
//                       await readingService.deleteHighlight(sessionId, selectedSentence.id || 1);
//                       setHighlightedSentences((prev) =>
//                         prev.filter((item) => !(item.page === page && item.sentenceIndex === selectedSentence.sentenceIndex))
//                       );
//                     } else {
//                       const resData = await readingService.createHighlight(sessionId, selectedSentence.text, 0, 0);
//                       setHighlightedSentences((prev) => [
//                         ...prev,
//                         {
//                           id: resData?.id || Date.now(),
//                           page: selectedSentence.page,
//                           sentenceIndex: selectedSentence.sentenceIndex,
//                           text: selectedSentence.text,
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
//     lineHeight: 34,
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
//   inlinePlayPause: {
//     marginLeft: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
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

// 💡 [해결 1] 마이페이지에서 세팅한 글자 크기 및 글꼴 조율 데이터를 수급하기 위해 서비스 임포트!
import { settingService } from '../../services/settingService';

export default function ReaderScreen() {

  const navigation = useNavigation<any>();

  // 🔤 사용자 글로벌 글자 설정을 실시간 주입받을 동적 상태 제어기
  const [viewerFontSize, setViewerFontSize] = useState<number>(18); 
  const [viewerFontFamily, setViewerFontFamily] = useState<string>('NANUM_MYEONGJO');

  // 글자 크기에 맞춰서 한 페이지당 적정 글자 수를 유동적으로 반환하는 스마트 스케일링 함수
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
  const [pages, setPages] = useState<{ sentences: string[]; }[]>([]);
  const [pageTimes, setPageTimes] = useState<Record<number, number>>({});

  const completeToday = useReadingStore((state) => state.completeToday);
  const today = new Date().toISOString().split('T')[0];
  
  const [pageOrder, setPageOrder] = useState<number[]>([1]);
  const [movedBackPages, setMovedBackPages] = useState<number[]>([]);
  const [sentenceMenuVisible, setSentenceMenuVisible] = useState(false);
  const [topMenuVisible, setTopMenuVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  const [highlightedSentences, setHighlightedSentences] = useState<
    { id?: number; page: number; sentenceIndex: number; text?: string; }[]
  >([]);

  const [selectedSentence, setSelectedSentence] = useState<{
    id?: number; text: string; page: number; sentenceIndex: number;
  } | null>(null);

  const handleSavePageTime = async (pageNumber: number, elapsedSeconds: number) => {
  try {
    // 🎯 서버는 0부터 페이지를 세므로 p-1을 적용
    const serverPage = pageNumber - 1;
    console.log(`📡 서버 전송: 세션ID=${sessionId}, 페이지=${serverPage}, 시간=${elapsedSeconds}초`);
    
    await readingService.savePageTime(sessionId, serverPage, elapsedSeconds);
  } catch (e) {
    console.error('페이지 시간 기록 실패:', e);
  }
};

  // 긴 글 자동 페이지 분할
  const splitIntoPages = (text: string, maxChars: number = 180) => {
    const sentences = text
      .split(/\n+/)
      .flatMap((line) => line.match(/[^.!?]+[.!?]?/g) || [])
      .filter((sentence) => sentence.trim().length > 0);

    const pages: { sentences: string[]; }[] = [];
    let currentPage: string[] = [];
    let currentLength = 0;

    sentences.forEach((sentence) => {
      const trimmed = sentence.trim();
      if (currentLength + trimmed.length <= maxChars) {
        currentPage.push(trimmed);
        currentLength += trimmed.length;
      } else {
        pages.push({ sentences: currentPage });
        currentPage = [trimmed];
        currentLength = trimmed.length;
      }
    });

    if (currentPage.length > 0) {
      pages.push({ sentences: currentPage });
    }
    return pages;
  };

  const totalPages = pages.length;
  const isLastPage = page === totalPages;

  const readingData = pages.map((item, index) => ({
    page: index + 1,
    textLength: item.sentences.join(' ').length
  }));

  // ✅ [통합 완치] 독서 세션 시작 직전, 마이페이지 글꼴/크기 설정을 서버에서 먼저 긁어와 동기화
  useEffect(() => {
    const startReadingSessionAndSettings = async () => {
      try {
        setLoading(true);
        console.log('🔥 USE_MOCK MODE 상태:', API_CONFIG.USE_MOCK);

        // 🎯 [실시간 상속 마법] 오늘의 읽기가 켜질 때 유저가 설정 탭에서 고쳐둔 폰트 정보를 원격 수급!
        try {
          const globalSettings = await settingService.getSettings();
          if (globalSettings && globalSettings.success) {
            setViewerFontSize(globalSettings.data.fontSize || 18);
            setViewerFontFamily(globalSettings.data.fontFamily || 'NANUM_MYEONGJO');
            console.log(`📡 [설정 동기화] 크기: ${globalSettings.data.fontSize}px, 글꼴: ${globalSettings.data.fontFamily}`);
          }
        } catch (settingError) {
          console.log('⚠️ 글로벌 설정을 불러오지 못해 기본 레이아웃으로 구동합니다.');
        }

        // 💡 MOCK 모드 분기 방어막
        if (API_CONFIG.USE_MOCK) {
          const mockData: TodayReading = {
            bookId: 999,
            title: "사색의 공간",
            author: "안다현",
            content: "현대 사회에서 침묵은 존재의 상태라기보다 일종의 사치품이 되어버렸습니다. 우리는 디지털 알림의 리드미컬한 소음 속에 끊임없이 매여 있으며, 한때 사색이 머물던 빈 공간은 끈질긴 정전기 같은 소음들로 채워지고 있습니다.\n우리 마음의 구조는 결코 이러한 끊임없는 유입을 견디도록 설계되지 않았습니다. 끝!",
            coverImageUrl: "https://example.com/mock-cover.png",
            characterCount: 168,
          };

          setTodayReading(mockData);
          const dynamicMaxChars = getDynamicMaxChars(viewerFontSize);
          const generatedPages = splitIntoPages(mockData.content, dynamicMaxChars);
          setPages(generatedPages);
          setSessionId(777); 
          return; 
        }

        // 🌐 실서버 모드 (`USE_MOCK: false`) 백엔드 통신
        console.log('1️⃣ today api 호출 시작');
        const todayData = await readingService.getTodayReading();
        setTodayReading(todayData);

        const dynamicMaxChars = getDynamicMaxChars(viewerFontSize);
        const generatedPages = splitIntoPages(todayData.content, dynamicMaxChars);
        setPages(generatedPages);

        const session = await readingService.startReading(todayData.bookId);
        setSessionId(session.id);

        try {
          const existingHighlights = await readingService.getHighlights(session.id);
          if (existingHighlights && existingHighlights.length > 0) {
            console.log('기존 형광펜 연동 확인 완료');
          }
        } catch (e) {
          console.log('이전 형광펜 이력 없음');
        }

      } catch (error: any) {
        console.error('❌ 독서 세션 실패:', error.message);
      } finally {
        setLoading(false);
      }
    };

    startReadingSessionAndSettings();
  }, [viewerFontSize]);

  // 타이머 가동 로직
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

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  const existingHighlight = highlightedSentences.find(
    (item) => item.page === page && item.sentenceIndex === selectedSentence?.sentenceIndex
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* 리더 카드 */}
      <View style={styles.readerCard}>

        {/* 헤더 구역 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            오늘의 읽기
          </Text>

          <TouchableOpacity onPress={() => setTopMenuVisible(true)}>
            <Ionicons name="ellipsis-vertical" size={22} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* 책 정보 */}
        {page === 1 && (
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{todayReading?.title}</Text>
            <Text style={styles.bookAuthor}>{todayReading?.author}</Text>
          </View>
        )}

        {/* 本文 본문 */}
        <View style={styles.contentContainer}>
          {paused && (
            <BlurView intensity={85} style={styles.pauseOverlay}>
              <Text style={styles.pauseText}>타이머 정지 중</Text>
            </BlurView>
          )}

          <View>
            {pages[page - 1]?.sentences.map((sentence: string, index: number) => (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onLongPress={() => {
                  const matched = highlightedSentences.find(
                    (h) => h.page === page && h.sentenceIndex === index
                  );
                  setSelectedSentence({
                    id: matched?.id,
                    text: sentence,
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
                      // 🎯 [실시간 동적 스타일링] 마이페이지 글꼴 종류와 픽셀 크기가 실시간 스케일링되어 박힙니다!
                      fontSize: viewerFontSize, 
                      fontFamily: viewerFontFamily === 'NOTO_SANS' ? undefined : 'Kopub',
                      lineHeight: viewerFontSize * 1.7
                    }, 
                    highlightedSentences.some(
                      (item) => item.page === page && item.sentenceIndex === index
                    ) && styles.highlightedText,
                  ]}
                >
                  {sentence}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 하단 페이지 바 / 계기판 */}
        <View style={styles.bottomBar}>
          <View style={styles.pageRow}>
            
            <TouchableOpacity
              onPress={async () => {
                if (page > 1) {
                  const prevPage = page - 1;
                  try {
                    console.log(`📡 [이전] 세션ID=${sessionId}, 서버전송페이지=${page }, 머문시간=${pageTimes[page] || 0}초`);
                    await readingService.savePageTime(sessionId, page, pageTimes[page] || 0);
                  } catch (e) {
                    console.error('페이지 시간 기록 실패:', e);
                  }
                  setPage(prevPage);
                  setMovedBackPages((prev) => [...prev, prevPage]);
                  setPageOrder((prev) => [...prev, prevPage]);
                }
              }}
              disabled={page === 1} 
              style={{ opacity: page === 1 ? 0.3 : 1 }}
            >
              <Text style={styles.pageButton}>〈 이전</Text>
            </TouchableOpacity>

            {/* 🎯 [UX 교정 완료] 타이머 옆에 난잡하게 붙어있던 정지 버튼 코드를 완벽 삭감하여, 군더더기 없는 심플 시안 유지! */}
            <View style={styles.centerTimerBlock}>
              <Text style={styles.pageText}>{page} / {totalPages}</Text>
              
              <View style={styles.timerRow}>
                <Text style={styles.timerText}>
                  {formatTime(hours)}:{formatTime(minutes)}:{formatTime(secs)}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={async () => {
                if (!isLastPage) {
                  const nextPage = page + 1;
                  try {
                    console.log(`📡 [다음/완료] 세션ID=${sessionId}, 서버전송페이지=${page}, 머문시간=${pageTimes[page] || 0}초`);
                    await readingService.savePageTime(sessionId, page, pageTimes[page] || 0);
                  } catch (e) {
                    console.error('페이지 시간 기록 실패:', e);
                  }
                  setPage(nextPage);
                  setPageOrder((prev) => [...prev, nextPage]);
                } else {
                  try {
                    console.log(`📡 [완료] 세션ID=${sessionId}, 서버전송페이지=${page}, 머문시간=${pageTimes[page] || 0}초`);
                    await readingService.savePageTime(sessionId, page, pageTimes[page] || 0);
                  } catch (e) {
                    console.error('마지막 페이지 기록 실패:', e);
                  }
                  const payload = {
                    totalReadingTime: seconds,
                    pageTimes,
                    pageOrder,
                    movedBackPages,
                    highlights: highlightedSentences,
                    readingData,
                  };
                  navigation.replace('Result', payload);
                }
              }}
            >
              <Text style={styles.pageButton}>{isLastPage ? '완료' : '다음 〉'}</Text>
            </TouchableOpacity>

          </View>
        </View>

      </View>

      {/* 문장 메뉴 모달 */}
      <Modal transparent visible={sentenceMenuVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSentenceMenuVisible(false)}
        >
          <View style={styles.menuBox}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setSentenceMenuVisible(false);

                const payload={
                  ...selectedSentence,
                  sessionId: sessionId,
                  suthor: todayReading?.author,
                  bookTitle: todayReading?.title
                };
                navigation.push('SaveSentence', { selectedSentence });
              }}
            >
              <Text style={styles.menuText}>문장 저장하기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={async () => {
                if (selectedSentence) {
                  try {
                    if (existingHighlight) {
                      await readingService.deleteHighlight(sessionId, selectedSentence.id || 1);
                      setHighlightedSentences((prev) =>
                        prev.filter((item) => !(item.page === page && item.sentenceIndex === selectedSentence.sentenceIndex))
                      );
                    } else {
                      const resData = await readingService.createHighlight(sessionId, selectedSentence.text, 0, 0);
                      setHighlightedSentences((prev) => [
                        ...prev,
                        {
                          id: resData?.id || Date.now(),
                          page: selectedSentence.page,
                          sentenceIndex: selectedSentence.sentenceIndex,
                          text: selectedSentence.text,
                        },
                      ]);
                    }
                  } catch (error) {
                    console.error('형광펜 인터랙션 처리 실패:', error);
                  }
                }
                setSentenceMenuVisible(false);
              }}
            >
              <Text style={[styles.menuText, existingHighlight && { color: '#DC2626', fontWeight: '600' }]}>
                {existingHighlight ? '형광펜 취소하기' : '형광펜 칠하기'}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 상단 메뉴 모달 */}
      <Modal transparent visible={topMenuVisible} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setTopMenuVisible(false)}>
          <View style={styles.menuBox}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setPaused(!paused);
                setTopMenuVisible(false);
              }}
            >
              <Text style={styles.menuText}>
                {paused ? '타이머 다시 시작' : '타이머 정지'}
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
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    borderRadius: 4,
  },
  pauseOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.4)',
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