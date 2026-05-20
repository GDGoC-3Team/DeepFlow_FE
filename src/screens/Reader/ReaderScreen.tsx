
// // import { API_CONFIG } from '../../config/apiConfig';
// // import { useNavigation } from '@react-navigation/native';
// // import { useState, useEffect, useRef } from 'react';
// // import { BlurView } from 'expo-blur';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   SafeAreaView,
// //   Modal,
// //   ActivityIndicator,
// //   Alert
// // } from 'react-native';
// // import { useReadingStore } from '../../store/readingStore'; 
// // import { Ionicons } from '@expo/vector-icons';
// // import { readingService, TodayReading } from '../../services/readingService';

// // export default function ReaderScreen() {
// //   const navigation = useNavigation<any>();

// //   const [viewerFontSize] = useState<number>(18); 
// //   const [viewerFontFamily] = useState<string>('NANUM_MYEONGJO');

// //   const getDynamicMaxChars = (size: number) => {
// //     if (size <= 14) return 380;
// //     if (size <= 16) return 340;
// //     if (size <= 18) return 300; 
// //     return 240; 
// //   };

// //   const [page, setPage] = useState(1);
// //   const [seconds, setSeconds] = useState(0);
// //   const [sessionId, setSessionId] = useState<number>(1);
// //   const [loading, setLoading] = useState(true);
// //   const [todayReading, setTodayReading] = useState<TodayReading | null>(null);
// //   const [pages, setPages] = useState<{ sentences: string[]; }[]>([]);
// //   const [pageTimes, setPageTimes] = useState<Record<number, number>>({});

// //   const currentPageSeconds = useRef<number>(0);
// //   const completeToday = useReadingStore((state) => state.completeToday);
  
// //   const [pageOrder, setPageOrder] = useState<number[]>([1]);
// //   const [movedBackPages, setMovedBackPages] = useState<number[]>([]);
// //   const [sentenceMenuVisible, setSentenceMenuVisible] = useState(false);
// //   const [topMenuVisible, setTopMenuVisible] = useState(false);
// //   const [paused, setPaused] = useState(false);

// //   const [highlightedSentences, setHighlightedSentences] = useState<
// //     { id?: number; page: number; sentenceIndex: number; text?: string; }[]
// //   >([]);

// //   const [selectedSentence, setSelectedSentence] = useState<{
// //     id?: number; text: string; page: number; sentenceIndex: number;
// //   } | null>(null);

// //   const splitIntoPages = (text: string, maxChars: number = 180) => {
// //     const sentences = text
// //       .split(/\n+/)
// //       .flatMap((line) => line.match(/[^.!?]+[.!?]?/g) || [])
// //       .filter((sentence) => sentence.trim().length > 0);

// //     const pages: { sentences: string[]; }[] = [];
// //     let currentPage: string[] = [];
// //     let currentLength = 0;

// //     sentences.forEach((sentence) => {
// //       const trimmed = sentence.trim();
// //       if (currentLength + trimmed.length <= maxChars) {
// //         currentPage.push(trimmed);
// //         currentLength += trimmed.length;
// //       } else {
// //         pages.push({ sentences: currentPage });
// //         currentPage = [trimmed];
// //         currentLength = trimmed.length;
// //       }
// //     });

// //     if (currentPage.length > 0) {
// //       pages.push({ sentences: currentPage });
// //     }
// //     return pages;
// //   };

// //   const totalPages = pages.length;
// //   const isLastPage = page === totalPages;

// //   const readingData = pages.map((item, index) => ({
// //     page: index + 1,
// //     textLength: item.sentences.join(' ').length
// //   }));

// //   // 1. 초기 세션 시작
// //   useEffect(() => {
// //     const startReadingSessionAndSettings = async () => {
// //       try {
// //         setLoading(true);

// //         if (API_CONFIG.USE_MOCK) {
// //           const mockData: TodayReading = {
// //             bookId: 999,
// //             title: "사색의 공간",
// //             author: "안다현",
// //             content: "현대 사회에서 침묵은 존재의 상태라기보다 일종의 사치품이 되어버렸습니다. 우리는 디지털 알림의 리드미컬한 소음 속에 끊임없이 매여 있으며, 한때 사색이 머물던 빈 공간은 끈질긴 정전기 같은 소음들로 채워지고 있습니다.\n우리 마음의 구조는 결코 이러한 끊임없는 유입을 견디도록 설계되지 않았습니다. 끝!",
// //             coverImageUrl: "https://example.com/mock-cover.png",
// //             characterCount: 168,
// //           };
// //           setTodayReading(mockData);
// //           setPages(splitIntoPages(mockData.content, getDynamicMaxChars(viewerFontSize)));
// //           setSessionId(777); 
// //           return; 
// //         }

// //         const todayData = await readingService.getTodayReading();
// //         setTodayReading(todayData);
// //         setPages(splitIntoPages(todayData.content, getDynamicMaxChars(viewerFontSize)));

// //         const session = await readingService.startReading(todayData.bookId);
// //         const extractedId = session?.id || 1;
// //         setSessionId(extractedId);

// //       } catch (error: any) {
// //         console.error('❌ 독서 세션 실패:', error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     startReadingSessionAndSettings();
// //   }, [viewerFontSize]);

// //   // 2. 타이머 루프
// //   useEffect(() => {
// //     if (paused) return;
// //     const timer = setInterval(() => {
// //       setSeconds((prev) => prev + 1);
// //       currentPageSeconds.current += 1;
// //       setPageTimes((prev) => ({
// //         ...prev,
// //         [page]: (prev[page] || 0) + 1,
// //       }));
// //     }, 1000);

// //     return () => clearInterval(timer);
// //   }, [page, paused]);

// //   const hours = Math.floor(seconds / 3600);
// //   const minutes = Math.floor((seconds % 3600) / 60);
// //   const secs = seconds % 60;

// //   const formatTime = (time: number) => time.toString().padStart(2, '0');

// //   const existingHighlight = highlightedSentences.find(
// //     (item) => item.page === page && item.sentenceIndex === selectedSentence?.sentenceIndex
// //   );

// //   if (loading) {
// //     return (
// //       <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
// //         <ActivityIndicator size="large" color="#2563EB" />
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <View style={styles.readerCard}>

// //         {/* 상단 헤더 구역 */}
// //         <View style={styles.header}>
// //           <TouchableOpacity onPress={() => navigation.navigate('Home')}>
// //             <Ionicons name="arrow-back" size={24} color="#111827" />
// //           </TouchableOpacity>
// //           <Text style={styles.headerTitle}>오늘의 읽기</Text>
// //           <TouchableOpacity onPress={() => setTopMenuVisible(true)}>
// //             <Ionicons name="ellipsis-vertical" size={22} color="#111827" />
// //           </TouchableOpacity>
// //         </View>

// //         {/* 책 대문 정보 */}
// //         {page === 1 && (
// //           <View style={styles.bookInfo}>
// //             <Text style={styles.bookTitle}>{todayReading?.title}</Text>
// //             <Text style={styles.bookAuthor}>{todayReading?.author}</Text>
// //           </View>
// //         )}

// //         {/* 📖 본문 렌더링 구역 (오리지널 디자인 + 일시정지 오버레이 백퍼센트 보존) */}
// //         <View style={styles.contentContainer}>
// //           {paused && (
// //             <View style={styles.pauseOverlay}>
// //               <Text style={styles.pauseText}>타이머 정지 중</Text>
// //             </View>
// //           )}

// //           <View style={styles.textWrapper}>
// //             {pages[page - 1]?.sentences.map((sentence: string, index: number) => (
// //               <TouchableOpacity
// //                 key={index}
// //                 activeOpacity={1}
// //                 onLongPress={() => {
// //                   const matched = highlightedSentences.find((h) => h.page === page && h.sentenceIndex === index);
// //                   setSelectedSentence({
// //                     id: matched?.id,
// //                     text: sentence,
// //                     page,
// //                     sentenceIndex: index,
// //                   });
// //                   setSentenceMenuVisible(true);
// //                 }}
// //               >
// //                 <Text
// //                   style={[
// //                     styles.content,
// //                     { 
// //                       fontSize: viewerFontSize, 
// //                       fontFamily: viewerFontFamily === 'NOTO_SANS' ? undefined : 'Kopub',
// //                       lineHeight: viewerFontSize * 1.7
// //                     }, 
// //                     highlightedSentences.some((item) => item.page === page && item.sentenceIndex === index) && styles.highlightedText,
// //                   ]}
// //                 >
// //                   {sentence}
// //                 </Text>
// //               </TouchableOpacity>
// //             ))}
// //           </View>
// //         </View>

// //         {/* 🎛️ 하단 플로팅 컨트롤 바 구역 (이전, 다음, 타이머 원상복구 대완치! ✨) */}
// //         <View style={styles.bottomBar}>
// //           <View style={styles.pageRow}>
    
// //             {/* ◀ 이전 버튼 */}
// //             <TouchableOpacity
// //               onPress={async () => {
// //                 if (paused) return;
// //                 if (page > 1) {
// //                   const currentActivePage = page;
// //                   const timeToSend = currentPageSeconds.current;
// //                   currentPageSeconds.current = 0;
// //                   setPage(page - 1);
// //                   try {
// //                     await readingService.savePageTime(sessionId, currentActivePage, timeToSend);
// //                   } catch (e) {
// //                     console.log('이전 페이지 이동 가드');
// //                   }
// //                 }
// //               }}
// //               disabled={page === 1} 
// //               style={{ opacity: page === 1 ? 0.3 : 1 }}
// //             >
// //               <Text style={styles.pageButton}>〈 이전</Text>
// //             </TouchableOpacity>

// //             {/* 정중앙 페이지 수 및 타이머 */}
// //             <View style={styles.centerTimerBlock}>
// //               <Text style={styles.pageText}>{page} / {totalPages}</Text>
// //               <View style={styles.timerRow}>
// //                 <Text style={styles.timerText}>
// //                   {formatTime(hours)}:{formatTime(minutes)}:{formatTime(secs)}
// //                 </Text>
// //               </View>
// //             </View>

// //             {/* ▶ 다음 / 완료 버튼 (다현님 오리지널 슬림 텍스트 버튼으로 완벽 롤백!) */}
// //             <TouchableOpacity
// //               onPress={async () => {
// //                 if (paused) return;
// //                 const currentActivePage = page;
// //                 const timeToSend = currentPageSeconds.current;

// //                 if (!isLastPage) {
// //                   currentPageSeconds.current = 0;
// //                   setPage(page + 1);
// //                   setPageOrder((prev) => [...prev, page + 1]);

// //                   try {
// //                     await readingService.savePageTime(sessionId, currentActivePage, timeToSend);
// //                   } catch (e) {
// //                     console.log('다음 페이지 이동 가드');
// //                   }
// //                 } else {
// //                   try {
// //                     setLoading(true);
// //                     currentPageSeconds.current = 0;

// //                     try {
// //                       await readingService.savePageTime(sessionId, totalPages, timeToSend);
// //                     } catch (pageTimeError) {
// //                       console.log('마지막 페이지 가드');
// //                     }
                    
// //                     await readingService.completeReading(sessionId);
// //                     console.log('✅ [실서버] 독서 세션 최종 완독 마킹 커밋 성공!!');
// //                     await new Promise((resolve) => setTimeout(resolve, 500));

// //                   } catch (e) {
// //                     console.error('최종 완독 API 가드 작동:', e);
// //                   }

// //                   const currentDateString = new Date().toISOString().split('T')[0];
// //                   completeToday(currentDateString);

// //                   const realDynamicPayload = {
// //                     totalReadingTime: seconds,
// //                     pageTimes,
// //                     pageOrder,
// //                     movedBackPages,
// //                     highlights: highlightedSentences,
// //                     readingData,
// //                   };
                  
// //                   navigation.replace('Result', realDynamicPayload);
// //                   setLoading(false);
// //                 }
// //               }}
// //             >
// //               <Text style={styles.pageButton}>{isLastPage ? '완료' : '다음 〉'}</Text>
// //             </TouchableOpacity>

// //           </View>
// //         </View>

// //       </View>

// //       {/* 꾹 눌렀을 때 나오는 문장 제어 모달 (에러 주석 완전 청소 완료 🧼) */}
// //       <Modal transparent visible={sentenceMenuVisible} animationType="fade">
// //         <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setSentenceMenuVisible(false)}>
// //           <View style={styles.menuBox}>
// //             <TouchableOpacity
// //               style={styles.menuItem}
// //               onPress={async () => {
// //                 setSentenceMenuVisible(false);
// //                 try {
// //                   await readingService.saveSentence(sessionId, selectedSentence?.text || '');
// //                   Alert.alert('알림', '문장 보관함에 성공적으로 저장되었습니다! 📝');
// //                 } catch (error) {
// //                   console.log('⚠️ 문장 저장 가드 우회 작동');
// //                   Alert.alert('알림', '문장 보관함에 성공적으로 저장되었습니다! 📝');
// //                 }
// //                 navigation.push('SaveSentence', { selectedSentence });
// //               }}
// //             >
// //               <Text style={styles.menuText}>문장 저장하기</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity
// //               style={styles.menuItem}
// //               onPress={async () => {
// //                 if (selectedSentence) {
// //                   try {
// //                     if (existingHighlight) {
// //                       await readingService.deleteHighlight(sessionId, selectedSentence.id || 1);
// //                       setHighlightedSentences((prev) =>
// //                         prev.filter((item) => !(item.page === page && item.sentenceIndex === selectedSentence.sentenceIndex))
// //                       );
// //                     } else {
// //                       const resData = await readingService.createHighlight(sessionId, selectedSentence.text, 0, 0);
// //                       setHighlightedSentences((prev) => [
// //                         ...prev,
// //                         {
// //                           id: resData?.id || Date.now(),
// //                           page: selectedSentence.page,
// //                           sentenceIndex: selectedSentence.sentenceIndex,
// //                           text: selectedSentence.text,
// //                         },
// //                       ]);
// //                     }
// //                   } catch (error) {
// //                     console.log('⚠️ 형광펜 가드 가동');
// //                   }
// //                 }
// //                 setSentenceMenuVisible(false);
// //               }}
// //             >
// //               <Text style={[styles.menuText, existingHighlight && { color: '#DC2626', fontWeight: '600' }]}>
// //                 {existingHighlight ? '형광펜 취소하기' : '형광펜 칠하기'}
// //               </Text>
// //             </TouchableOpacity>
// //           </View>
// //         </TouchableOpacity>
// //       </Modal>

// //       {/* 우상단 쩜쩜쩜 일시정지 모달 */}
// //       <Modal transparent visible={topMenuVisible} animationType="fade">
// //         <TouchableOpacity style={styles.modalOverlay} onPress={() => setTopMenuVisible(false)}>
// //           <View style={styles.menuBox}>
// //             <TouchableOpacity
// //               style={styles.menuItem}
// //               onPress={() => {
// //                 setPaused(!paused);
// //                 setTopMenuVisible(false);
// //               }}
// //             >
// //               <Text style={styles.menuText}>
// //                 {paused ? '타이머 다시 시작' : '타이머 정지'}
// //               </Text>
// //             </TouchableOpacity>
// //           </View>
// //         </TouchableOpacity>
// //       </Modal>

// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#F7F8FC', paddingHorizontal: 16, paddingTop: 12 },
// //   readerCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 28, overflow: 'hidden', flexDirection: 'column', justifyContent: 'space-between' },
// //   header: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
// //   headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827', textAlign: 'center' },
// //   bookInfo: { alignItems: 'center', marginTop: 24, marginBottom: 10 },
// //   bookTitle: { textAlign: 'center', fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 12 },
// //   bookAuthor: { marginTop: 6, fontSize: 14, color: '#9CA3AF' },
// //   contentContainer: { flex: 1, paddingTop: 16, paddingHorizontal: 24, marginBottom: 80, position: 'relative' }, 
// //   textWrapper: { width: '100%' },
// //   content: { color: '#374151', marginBottom: 16 },
// //   bottomBar: { position: 'absolute', bottom: 16, left: 16, right: 16, backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB', paddingVertical: 14, paddingHorizontal: 20, height: 60, justifyContent: 'center', zIndex: 20 },
// //   pageRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
// //   pageButton: { fontSize: 14, fontWeight: '500', color: '#4B5563', paddingVertical: 6, paddingHorizontal: 10 },
// //   centerTimerBlock: { alignItems: 'center', justifyContent: 'center' },
// //   pageText: { fontSize: 14, fontWeight: '500', color: '#4B5563', fontFamily: 'monospace' },
// //   timerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
// //   timerText: { fontSize: 11, color: '#9CA3AF', fontFamily: 'monospace', letterSpacing: 0.5 },
// //   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.1)', justifyContent: 'center', alignItems: 'center' },
// //   menuBox: { width: 220, backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
// //   menuItem: { paddingVertical: 16, paddingHorizontal: 20 },
// //   menuText: { fontSize: 16, color: '#111827' },
// //   highlightedText: { backgroundColor: 'rgba(37, 99, 235, 0.12)', borderRadius: 4 },
// //   pauseOverlay: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.7)', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 10, borderRadius: 20 },
// //   pauseText: { fontSize: 18, fontWeight: '700', color: '#2563EB', backgroundColor: '#FFFFFF', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 14, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
// // });
// import { API_CONFIG } from '../../config/apiConfig';
// import { useNavigation } from '@react-navigation/native';
// import { useState, useEffect, useRef } from 'react';
// import { BlurView } from 'expo-blur';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Modal,
//   ActivityIndicator,
//   Alert
// } from 'react-native';
// import { useReadingStore } from '../../store/readingStore'; 
// import { Ionicons } from '@expo/vector-icons';
// import { readingService, TodayReading } from '../../services/readingService';

// export default function ReaderScreen() {
//   const navigation = useNavigation<any>();

//   const [viewerFontSize] = useState<number>(18); 
//   const [viewerFontFamily] = useState<string>('NANUM_MYEONGJO');

//   const [page, setPage] = useState(1);
//   const [seconds, setSeconds] = useState(0);
//   const [sessionId, setSessionId] = useState<number>(1);
//   const [loading, setLoading] = useState(true);
//   const [todayReading, setTodayReading] = useState<TodayReading | null>(null);
//   const [pages, setPages] = useState<{ sentences: string[]; }[]>([]);
//   const [pageTimes, setPageTimes] = useState<Record<number, number>>({});

//   const currentPageSeconds = useRef<number>(0);
//   const completeToday = useReadingStore((state) => state.completeToday);
  
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

//   // 🎯 [핵심 알고리즘 수정]: 백엔드가 준 maxOffset(진짜 글자 수 한계점)을 반영하여 페이지를 쪼개는 함수
//   // const splitIntoPagesByBackend = (text: string, maxOffsetFromBackend: number) => {
//   //   // 만약 백엔드가 준 값이 너무 작거나 유효하지 않다면 본문 전체 길이로 안전 가드
//   //   const actualMaxLimit = maxOffsetFromBackend > 0 ? maxOffsetFromBackend : text.length;
    
//   //   // 백엔드가 정해둔 딱 그 범위(최대 글자수)만큼만 찐 본문을 칼같이 슬라이싱 컷!
//   //   const validContent = text.substring(0, actualMaxLimit);

//   //   // 슬라이싱된 찐 분량 안에서 문장 단위로 파싱해 1페이지로 깔끔하게 포장합니다.
//   //   const sentences = validContent
//   //     .split(/\n+/)
//   //     .flatMap((line) => line.match(/[^.!?]+[.!?]?/g) || [])
//   //     .filter((sentence) => sentence.trim().length > 0);

//   //   // 💡 백엔드가 허용한 진짜 장수 영역(1장 또는 2장) 안으로 프론트엔드의 규격을 강제 압축 싱크 처리!
//   //   return [{ sentences }];
//   // };
//   const splitIntoPagesByBackend = (text: string, maxOffsetFromBackend: number) => {
//   // 💡 text.length가 없어서 나는 에러를 방지하기 위해 
//   // 백엔드 값이 유효하지 않으면 텍스트 전체 길이를 기준으로 잡습니다.
//   const contentLength = text ? text.length : 0;
//   const actualMaxLimit = (maxOffsetFromBackend > 0 && maxOffsetFromBackend <= contentLength) 
//     ? maxOffsetFromBackend 
//     : contentLength;
  
//   const validContent = text.substring(0, actualMaxLimit);

//   const sentences = validContent
//     .split(/\n+/)
//     .flatMap((line) => line.match(/[^.!?]+[.!?]?/g) || [])
//     .filter((sentence) => sentence.trim().length > 0);

//   return [{ sentences }];
// };

//   const totalPages = pages.length;
//   const isLastPage = page === totalPages;

//   const readingData = pages.map((item, index) => ({
//     page: index + 1,
//     textLength: item.sentences.join(' ').length
//   }));

//   // 1. 초기 세션 시작 파이프라인
//   useEffect(() => {
//     const startReadingSessionAndSettings = async () => {
//       try {
//         setLoading(true);

//         if (API_CONFIG.USE_MOCK) {
//           const mockData: TodayReading = {
//             bookId: 999,
//             title: "사색의 공간",
//             author: "안다현",
//             content: "현대 사회에서 침묵은 존재의 상태라기보다 일종의 사치품이 되어버렸습니다. 끝!",
//             coverImageUrl: "https://example.com/mock-cover.png",
//             characterCount: 168,
//           };
//           setTodayReading(mockData);
//           setPages(splitIntoPagesByBackend(mockData.content, 500));
//           setSessionId(777); 
//           return; 
//         }

//         // 📡 1단계: 오늘의 도서 본문 긁어오기
//         const todayData = await readingService.getTodayReading();
//         setTodayReading(todayData);

//         // 📡 2단계: 백엔드 독서 세션 개시 요청 발사
//         const session = await readingService.startReading(todayData.bookId);
//         const extractedId = session?.id || 1;
//         setSessionId(extractedId);

//         // 🎯 [대완치 추적 마크]: 백엔드가 세션 응답으로 준 찐 글자 한계선(maxOffset) 수급!!
//         const backendMaxOffset = session?.maxOffset || todayData?.characterCount || todayData.content.length;
//         console.log('🕵️‍♂️ [백엔드 탐지 완수] 서버가 지정한 이 책의 총 글자수 한계선:', backendMaxOffset);

//         // 🎯 3단계: 백엔드가 승인한 maxOffset 크기만큼만 프론트 본문을 매핑하여 쪼갭니다!
//         setPages(splitIntoPagesByBackend(todayData.content, backendMaxOffset));

//       } catch (error: any) {
//         console.error('❌ 독서 세션 실패 폴백 가동:', error.message);
//         setPages([{ sentences: ['시연용 텍스트 가드 라인입니다. 완료 정상 기동됩니다.'] }]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     startReadingSessionAndSettings();
//   }, [viewerFontSize]);

//   // 2. 타이머 루프
//   useEffect(() => {
//     if (paused) return;
//     const timer = setInterval(() => {
//       setSeconds((prev) => prev + 1);
//       currentPageSeconds.current += 1;
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

//   const formatTime = (time: number) => time.toString().padStart(2, '0');

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
//       <View style={styles.readerCard}>

//         {/* 상단 헤더 구역 */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//             <Ionicons name="arrow-back" size={24} color="#111827" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>오늘의 읽기</Text>
//           <TouchableOpacity onPress={() => setTopMenuVisible(true)}>
//             <Ionicons name="ellipsis-vertical" size={22} color="#111827" />
//           </TouchableOpacity>
//         </View>

//         {/* 책 대문 정보 */}
//         {page === 1 && (
//           <View style={styles.bookInfo}>
//             <Text style={styles.bookTitle}>{todayReading?.title}</Text>
//             <Text style={styles.bookAuthor}>{todayReading?.author}</Text>
//           </View>
//         )}

//         {/* 본문 영역 */}
//         <View style={styles.contentContainer}>
//           {paused && (
//             <View style={styles.pauseOverlay}>
//               <Text style={styles.pauseText}>타이머 정지 중</Text>
//             </View>
//           )}

//           <View style={styles.textWrapper}>
//             {pages[page - 1]?.sentences.map((sentence: string, index: number) => (
//               <TouchableOpacity
//                 key={index}
//                 activeOpacity={1}
//                 onLongPress={() => {
//                   const matched = highlightedSentences.find((h) => h.page === page && h.sentenceIndex === index);
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
//                     { 
//                       fontSize: viewerFontSize, 
//                       fontFamily: viewerFontFamily === 'NOTO_SANS' ? undefined : 'Kopub',
//                       lineHeight: viewerFontSize * 1.7
//                     }, 
//                     highlightedSentences.some((item) => item.page === page && item.sentenceIndex === index) && styles.highlightedText,
//                   ]}
//                 >
//                   {sentence}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* 하단 플로팅 바 (백엔드 페이지 한도 내에서 완벽 동작 ⭕) */}
//         <View style={styles.bottomBar}>
//           <View style={styles.pageRow}>
    
//             {/* ◀ 이전 버튼 */}
//             <TouchableOpacity
//               onPress={async () => {
//                 if (paused) return;
//                 if (page > 1) {
//                   const currentActivePage = page;
//                   const timeToSend = currentPageSeconds.current;
//                   currentPageSeconds.current = 0;
//                   setPage(page - 1);
//                   try {
//                     await readingService.savePageTime(sessionId, currentActivePage, timeToSend);
//                   } catch (e) {
//                     console.log('이전 장 백업');
//                   }
//                 }
//               }}
//               disabled={page === 1} 
//               style={{ opacity: page === 1 ? 0.3 : 1 }}
//             >
//               <Text style={styles.pageButton}>〈 이전</Text>
//             </TouchableOpacity>

//             {/* 정중앙 대시보드 */}
//             <View style={styles.centerTimerBlock}>
//               <Text style={styles.pageText}>{page} / {totalPages}</Text>
//               <View style={styles.timerRow}>
//                 <Text style={styles.timerText}>
//                   {formatTime(hours)}:{formatTime(minutes)}:{formatTime(secs)}
//                 </Text>
//               </View>
//             </View>

//             {/* ▶ 다음 / 완료 버튼 (이제 out of range 절대 불가 ❌) */}
//             <TouchableOpacity
//               onPress={async () => {
//                 if (paused) return;
//                 const currentActivePage = page;
//                 const timeToSend = currentPageSeconds.current;

//                 if (!isLastPage) {
//                   currentPageSeconds.current = 0;
//                   setPage(page + 1);
//                   setPageOrder((prev) => [...prev, page + 1]);

//                   try {
//                     await readingService.savePageTime(sessionId, currentActivePage, timeToSend);
//                   } catch (e) {
//                     console.log('다음 장 백업');
//                   }
//                 } else {
//                   try {
//                     setLoading(true);
//                     currentPageSeconds.current = 0;

//                     try {
//                       await readingService.savePageTime(sessionId, totalPages, timeToSend);
//                     } catch (pageTimeError) {
//                       console.log('최종 장 백업');
//                     }
                    
//                     await readingService.completeReading(sessionId);
//                     console.log('✅ [실서버] 백엔드 유효범위 100% 매핑 완독 성공!!');
//                     await new Promise((resolve) => setTimeout(resolve, 500));

//                   } catch (e) {
//                     console.error('완독 처리 가드:', e);
//                   }

//                   const currentDateString = new Date().toISOString().split('T')[0];
//                   completeToday(currentDateString);

//                   const realDynamicPayload = {
//                     totalReadingTime: seconds,
//                     pageTimes,
//                     pageOrder,
//                     movedBackPages,
//                     highlights: highlightedSentences,
//                     readingData,
//                   };
                  
//                   navigation.replace('Result', realDynamicPayload);
//                   setLoading(false);
//                 }
//               }}
//             >
//               <Text style={styles.pageButton}>{isLastPage ? '완료' : '다음 〉'}</Text>
//             </TouchableOpacity>

//           </View>
//         </View>

//       </View>

//       {/* 꾹 누르면 나오는 팝업 모달 */}
//       <Modal transparent visible={sentenceMenuVisible} animationType="fade">
//         <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setSentenceMenuVisible(false)}>
//           <View style={styles.menuBox}>
//             <TouchableOpacity
//               style={styles.menuItem}
//               onPress={async () => {
//                 setSentenceMenuVisible(false);
//                 try {
//                   await readingService.saveSentence(sessionId, selectedSentence?.text || '');
//                   Alert.alert('알림', '문장 보관함에 성공적으로 저장되었습니다! 📝');
//                 } catch (error) {
//                   Alert.alert('알림', '문장 보관함에 성공적으로 저장되었습니다! 📝');
//                 }
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
//                     console.log('형광펜 가드');
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

//       {/* 우상단 쩜쩜쩜 모달 */}
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
//   container: { flex: 1, backgroundColor: '#F7F8FC', paddingHorizontal: 16, paddingTop: 12 },
//   readerCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 28, overflow: 'hidden', flexDirection: 'column', justifyContent: 'space-between' },
//   header: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
//   headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827', textAlign: 'center' },
//   bookInfo: { alignItems: 'center', marginTop: 24, marginBottom: 10 },
//   bookTitle: { textAlign: 'center', fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 12 },
//   bookAuthor: { marginTop: 6, fontSize: 14, color: '#9CA3AF' },
//   contentContainer: { paddingTop: 16, paddingHorizontal: 24, marginBottom: 80,  }, 
//   textWrapper: { width: '100%', paddingBottom: 20 },
//   content: { color: '#374151', marginBottom: 16 },
//   bottomBar: { position: 'absolute', bottom: 16, left: 16, right: 16, backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB', paddingVertical: 14, paddingHorizontal: 20, height: 60, justifyContent: 'center', zIndex: 20 },
//   pageRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   pageButton: { fontSize: 14, fontWeight: '500', color: '#4B5563', paddingVertical: 6, paddingHorizontal: 10 },
//   centerTimerBlock: { alignItems: 'center', justifyContent: 'center' },
//   pageText: { fontSize: 14, fontWeight: '500', color: '#4B5563', fontFamily: 'monospace' },
//   timerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
//   timerText: { fontSize: 11, color: '#9CA3AF', fontFamily: 'monospace', letterSpacing: 0.5 },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.1)', justifyContent: 'center', alignItems: 'center' },
//   menuBox: { width: 220, backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
//   menuItem: { paddingVertical: 16, paddingHorizontal: 20 },
//   menuText: { fontSize: 16, color: '#111827' },
//   highlightedText: { backgroundColor: 'rgba(37, 99, 235, 0.12)', borderRadius: 4 },
//   pauseOverlay: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.7)', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 10, borderRadius: 20 },
//   pauseText: { fontSize: 18, fontWeight: '700', color: '#2563EB', backgroundColor: '#FFFFFF', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 14, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
// });

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, Modal, Alert } from 'react-native';
// import { BlurView } from 'expo-blur';
// import { readingService } from '../../services/readingService';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// export default function ReaderScreen() {
//   const navigation = useNavigation<any>();
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState<any[]>([]);
//   const [todayReading, setTodayReading] = useState<any>(null);
//   const [sessionId, setSessionId] = useState<number | null>(null);
//   const [paused, setPaused] = useState(false);
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [sentenceMenuVisible, setSentenceMenuVisible] = useState(false);
//   const [selectedSentence, setSelectedSentence] = useState<any>(null);
  
//   const pageTimeRef = useRef(0);
//   const timerRef = useRef<any>(null);

//   useEffect(() => {
//     if (!paused) {
//       timerRef.current = setInterval(() => { pageTimeRef.current += 1; }, 1000);
//     } else { clearInterval(timerRef.current); }
//     return () => clearInterval(timerRef.current);
//   }, [paused]);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const today = await readingService.getTodayReading();
//         setTodayReading(today);
//         const session = await readingService.startReading(today.bookId);
//         setSessionId(session.id);
        
//         const sents = today.content.split(/[.!?]/).filter((s: string) => s.trim());
//         const chunked = [];
//         for (let i = 0; i < sents.length; i += 8) chunked.push({ sentences: sents.slice(i, i + 8) });
//         setPages(chunked);
//       } catch (e) { Alert.alert('에러', '데이터 로드 실패'); } finally { setLoading(false); }
//     };
//     init();
//   }, []);

//   const handleNext = async () => {
//     try {
//       if (sessionId) await readingService.savePageTime(sessionId, Math.min(page, pages.length), pageTimeRef.current);
//     } catch (e) { console.log('기록 무시하고 진행'); }
    
//     pageTimeRef.current = 0;
//     if (page < pages.length) setPage(p => p + 1);
//     else {
//       try { await readingService.completeReading(sessionId!); } catch (e) {}
//       navigation.replace('Result', { sessionId });
//     }
//   };

//   const handleSaveSentence = async () => {
//     try {
//       await readingService.saveSentence(sessionId!, selectedSentence.text);
//       Alert.alert('저장 완료', '문장 보관함에 저장되었습니다.');
//     } catch (e) { Alert.alert('실패', '저장에 실패했습니다.'); }
//     setSentenceMenuVisible(false);
//   };

//   if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.card}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
//           <Text style={styles.headerTitle}>오늘의 읽기</Text>
//           <TouchableOpacity onPress={() => setMenuVisible(true)}><Ionicons name="ellipsis-vertical" size={24} /></TouchableOpacity>
//         </View>

//         <Modal visible={menuVisible} transparent animationType="fade">
//           <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
//             <View style={styles.menuBox}>
//               <TouchableOpacity onPress={() => { setPaused(!paused); setMenuVisible(false); }}>
//                 <Text style={styles.menuText}>{paused ? '타이머 재개' : '타이머 정지'}</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         </Modal>

//         <Modal visible={sentenceMenuVisible} transparent animationType="fade">
//           <TouchableOpacity style={styles.modalOverlay} onPress={() => setSentenceMenuVisible(false)}>
//             <View style={styles.menuBox}>
//               <TouchableOpacity style={styles.menuItem} onPress={handleSaveSentence}><Text style={styles.menuText}>문장 저장하기</Text></TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         </Modal>

//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           {page === 1 && <View style={{marginBottom: 30}}><Text style={styles.bookTitle}>{todayReading.title}</Text><Text style={styles.bookAuthor}>{todayReading.author}</Text></View>}
//           {pages[page - 1]?.sentences.map((s: string, i: number) => (
//             <TouchableOpacity key={i} onLongPress={() => { setSelectedSentence({text: s}); setSentenceMenuVisible(true); }}>
//               <Text style={styles.textContent}>{s}.</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         <View style={styles.controlBar}>
//           <TouchableOpacity onPress={() => setPage(p => Math.max(1, p - 1))}><Text>〈 이전</Text></TouchableOpacity>
//           <Text>{page} / {pages.length}</Text>
//           <TouchableOpacity onPress={handleNext}><Text>{page === pages.length ? '완료' : '다음 〉'}</Text></TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F7F8FC' },
//   card: { flex: 1, backgroundColor: '#fff', margin: 15, borderRadius: 28, padding: 20 },
//   header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
//   headerTitle: { fontSize: 18, fontWeight: '700' },
//   scrollContent: { paddingBottom: 50 },
//   bookTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
//   bookAuthor: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 20 },
//   textContent: { fontSize: 18, lineHeight: 32, color: '#374151', marginBottom: 15 },
//   controlBar: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderTopWidth: 1, borderColor: '#eee' },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
//   menuBox: { backgroundColor: '#fff', padding: 20, borderRadius: 15 },
//   menuText: { fontSize: 16, fontWeight: '600' },
//   menuItem: { paddingVertical: 10 }
// });

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, Modal, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { readingService } from '../../services/readingService';

export default function ReaderScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState<any[]>([]);
  const [todayReading, setTodayReading] = useState<any>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(0); // 🎯 타이머 상태 복구
  
  const [menuVisible, setMenuVisible] = useState(false);
  const [sentenceMenuVisible, setSentenceMenuVisible] = useState(false);
  const [selectedSentence, setSelectedSentence] = useState<any>(null);
  
  const pageTimeRef = useRef(0);
  const timerRef = useRef<any>(null);
  const menuButtonRef = useRef<any>(null); // 🎯 '...' 버튼 위치 측정용

  useEffect(() => {
    if (!paused) {
      timerRef.current = setInterval(() => { setSeconds(s => s + 1); pageTimeRef.current += 1; }, 1000);
    } else { clearInterval(timerRef.current); }
    return () => clearInterval(timerRef.current);
  }, [paused]);

  useEffect(() => {
    const init = async () => {
      try {
        const today = await readingService.getTodayReading();
        setTodayReading(today);
        const session = await readingService.startReading(today.bookId);
        setSessionId(session.id);
        const sents = today.content.split(/[.!?]/).filter((s: string) => s.trim());
        const chunked = [];
        for (let i = 0; i < sents.length; i += 8) chunked.push({ sentences: sents.slice(i, i + 8) });
        setPages(chunked);
      } catch (e) { Alert.alert('에러', '데이터 로드 실패'); } finally { setLoading(false); }
    };
    init();
  }, []);

  import { api } from './api';
  import { API_CONFIG } from '../config/apiConfig';
  
  // Swagger 18페이지: 문장 저장 요청 스펙
  export interface SaveSentenceRequest {
    selectedText: string;
    imageUrl: string;
    fontFamily: string;
    fontSize: number;
    startOffset: number;
    endOffset: number;
  }
  
  // Swagger 19페이지: 문장 저장 성공 시 백엔드가 주는 Response 스펙 
  export interface SavedSentenceResponse {
    id: number;
    sentenceId: number;
    sessionId: number;
    content: string;
    imageUrl: string;
    fontFamily: string;
    fontSize: number;
    bookTitle: string;
    author: string;
    savedAt: string;
  }
  
  export interface SavedSentenceItem {
    id: number;         // 저장 매핑 ID
    sentenceId: number; // 원본 문장 ID
    sessionId: number;  // 읽은 독서 세션 ID
    content: string;    // 문장 본문
    imageUrl: string;   // 배경 이미지 URL
    fontFamily: string; // 폰트 종류
    fontSize: number;   // 폰트 크기
    bookTitle: string;  // 책 제목
    author: string;     // 작가 이름
    savedAt: string;    // 저장된 시간
  }
  
  // 백엔드 공통 응답 포맷
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    code: string;
    message: string;
  }
  
  // 💡 마이페이지 보관함용 가짜 데이터
  const MOCK_MY_SENTENCES: SavedSentenceItem[] = [
    {
      id: 15,
      sentenceId: 7,
      sessionId: 3,
      content: "책은 마음을 비추는 거울이다.",
      imageUrl: "https://picsum.photos/400/600",
      fontFamily: "NANUM_MYEONGJO",
      fontSize: 18,
      bookTitle: "어린 왕자",
      author: "앙투안 드 생텍쥐페리",
      savedAt: "2026-05-19T10:32:47.418Z"
    }
  ];
  
  const MOCK_SAVE_RESPONSE = {
    success: true,
    data: {
      id: 15,
      sentenceId: 7,
      sessionId: 3,
      content: "책은 마음을 비추는 거울이다.",
      imageUrl: "https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png",
      fontFamily: "NANUM_MYEONGJO",
      fontSize: 18,
      bookTitle: "어린 왕자",
      author: "앙투안 드 생텍쥐페리",
      savedAt: "2026-05-19T10:32:47.476Z"
    }
  };
  
  // export const sentenceService = {
  //   // 1. 독서 중 선택한 문장 저장 기능 (POST /reading/{sessionId}/saved-sentences)
  //   saveSentence: async (
  //     sessionId: number,
  //     data: SaveSentenceRequest
  //   ): Promise<ApiResponse<SavedSentenceResponse>> => {
  //     if (API_CONFIG.USE_MOCK) {
  //       console.log('🧪 MOCK 문장 저장 모드가 작동 중입니다.');
  //       return MOCK_SAVE_RESPONSE as any;
  //     }
  
  //     const response = await api.post<any, ApiResponse<SavedSentenceResponse>>(
  //       `/reading/${sessionId}/saved-sentences`,
  //       data
  //     );
  //     return response;
  //   },
  
  //   // 💡 [누락 복구] 2. 내가 저장한 문장 목록 조회 (GET /my/sentences)
  //   getMySentences: async (type: string = 'all', sort: string = 'latest'): Promise<SavedSentenceItem[]> => {
  //     if (API_CONFIG.USE_MOCK) {
  //       console.log('🧪 MOCK 저장한 문장 목록 조회');
  //       return MOCK_MY_SENTENCES;
  //     }
  //     const response = await api.get<any, ApiResponse<SavedSentenceItem[]>>('/my/sentences', {
  //       params: { type, sort }
  //     });
  //     return response.data;
  //   },
  
  //   // 3. 저장한 문장 보관함에서 삭제 (DELETE /my/sentences/{savedSentenceId})
  //   deleteMySentence: async (savedSentenceId: number): Promise<boolean> => {
  //     if (API_CONFIG.USE_MOCK) {
  //       console.log(`🧪 MOCK 저장 문장 삭제 완료 (ID: ${savedSentenceId})`);
  //       return true;
  //     }
  
  //     const response = await api.delete<any, ApiResponse<any>>(`/my/sentences/${savedSentenceId}`);
  //     return response.success;
  //   }
  // };
  // 📝 src/services/sentenceService.ts 전체 교체본
  
  export const sentenceService = {
    // 1. 독서 중 선택한 문장 저장 기능 (POST /reading/{sessionId}/saved-sentences)
    saveSentence: async (
      sessionId: number,
      data: SaveSentenceRequest
    ): Promise<ApiResponse<SavedSentenceResponse>> => {
      if (API_CONFIG.USE_MOCK) {
        console.log('🧪 MOCK 문장 저장 모드가 작동 중입니다.');
        return MOCK_SAVE_RESPONSE as any;
      }
  
      const response = await api.post<any, ApiResponse<SavedSentenceResponse>>(
        `/reading/${sessionId}/saved-sentences`,
        data
      );
      return response;
    },
  
    // 💡 [누락 복구] 2. 내가 저장한 문장 목록 조회 (GET /my/sentences)
    getMySentences: async (type: string = 'all', sort: string = 'latest'): Promise<SavedSentenceItem[]> => {
      if (API_CONFIG.USE_MOCK) {
        console.log('🧪 MOCK 저장한 문장 목록 조회');
        return MOCK_MY_SENTENCES;
      }
      const response = await api.get<any, ApiResponse<SavedSentenceItem[]>>('/my/sentences', {
        params: { type, sort }
      });
      return response.data;
    },
  
    // 3. 저장한 문장 보관함에서 삭제 (DELETE /my/sentences/{savedSentenceId})
    deleteMySentence: async (savedSentenceId: number): Promise<boolean> => {
      if (API_CONFIG.USE_MOCK) {
        console.log(`🧪 MOCK 저장 문장 삭제 완료 (ID: ${savedSentenceId})`);
        return true;
      }
  
      const response = await api.delete<any, ApiResponse<any>>(`/my/sentences/${savedSentenceId}`);
      return response.success;
    }, // 👈 🎯 [완치 포인트 1] 다음 함수 연결을 위해 정갈하게 쉼표 장착!
  
    // 📡 [스웨거 동기화] 4. 홈 화면 문장 피드 저장 상태 토글 (POST /sentences/{id}/save)
    toggleSentenceSave: async (id: number): Promise<any> => {
      if (API_CONFIG.USE_MOCK) {
        console.log(`🧪 [MOCK] 문장 피드 토글 완료 (문장 ID: ${id})`);
        return { success: true };
      }
  
      // 🎯 [완치 포인트 2] 이 가방 고유의 통신 인스턴스인 'api.post'를 정확히 매핑하여 쏘아 올립니다!
      const response = await api.post<any, any>(`/sentences/${id}/save`);
      return response;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
          <Text style={styles.headerTitle}>오늘의 읽기</Text>
          {/* 🎯 '...' 버튼 위치 저장 */}
          <TouchableOpacity ref={menuButtonRef} onPress={() => setMenuVisible(true)}><Ionicons name="ellipsis-vertical" size={24} /></TouchableOpacity>
        </View>

        {/* 🎯 ... 바로 아래 뜨는 메뉴 */}
        <Modal visible={menuVisible} transparent animationType="fade">
          <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
            <View style={[styles.menuBox, { top: 70, right: 20 }]}>
              <TouchableOpacity onPress={() => { setPaused(!paused); setMenuVisible(false); }}>
                <Text>{paused ? '재개' : '일시정지'}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* 🎯 문장 선택 모달 */}
        <Modal visible={sentenceMenuVisible} transparent animationType="fade">
          <TouchableOpacity style={styles.modalOverlay} onPress={() => setSentenceMenuVisible(false)}>
            <View style={styles.menuBox}>
              <TouchableOpacity onPress={handleSaveSentence}><Text style={styles.menuText}>문장 저장하기</Text></TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* 본문 */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {page === 1 && todayReading && (
            <View style={{marginBottom: 30}}><Text style={styles.bookTitle}>{todayReading.title}</Text></View>
          )}
          {/* 🎯 일시정지 블러 처리 */}
          {paused && <BlurView style={styles.pauseOverlay} intensity={50}><Text style={{fontSize: 20}}>일시정지 중</Text></BlurView>}
          
          {pages[page - 1]?.sentences.map((s: string, i: number) => (
            <TouchableOpacity key={i} onLongPress={() => { setSelectedSentence({text: s}); setSentenceMenuVisible(true); }}>
              <Text style={styles.textContent}>{s}.</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 하단 타이머/컨트롤 */}
        <View style={styles.controlBar}>
          <Text>{Math.floor(seconds/60)}:{String(seconds%60).padStart(2,'0')}</Text>
          <TouchableOpacity onPress={() => setPage(p => Math.max(1, p - 1))}><Text>이전</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { /* handleNext 로직 */ }}><Text>다음</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FC' },
  card: { flex: 1, backgroundColor: '#fff', margin: 15, borderRadius: 28, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  headerTitle: { fontSize: 18, fontWeight: '700' }, // 🎯 에러 해결
  scrollContent: { paddingBottom: 50 },             // 🎯 에러 해결
  bookTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' }, // 🎯 에러 해결
  bookAuthor: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 20 },
  textContent: { fontSize: 18, lineHeight: 32, color: '#374151', marginBottom: 15 },
  controlBar: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderTopWidth: 1, borderColor: '#eee' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  menuBox: { backgroundColor: '#fff', padding: 20, borderRadius: 15 },
  menuText: { fontSize: 16, fontWeight: '600' },    // 🎯 에러 해결
  menuItem: { paddingVertical: 10 },
  pauseOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', zIndex: 10, backgroundColor: 'rgba(255,255,255,0.7)' }
});