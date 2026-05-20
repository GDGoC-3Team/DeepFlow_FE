
// // // // import { readingHistoryService } from '../../services/readingHistoryService';
// // // // import { useState, useEffect } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   StyleSheet,
// // // //   TouchableOpacity,
// // // //   ScrollView,
// // // //   Alert,
// // // // } from 'react-native';
// // // // import { Ionicons } from '@expo/vector-icons';
// // // // import { useNavigation, useIsFocused } from '@react-navigation/native'; 

// // // // export default function ReadingRecordTab() {
// // // //   const navigation = useNavigation<any>(); 
// // // //   const isFocused = useIsFocused();

// // // //   const [currentMonth, setCurrentMonth] = useState(5);
// // // //   const [currentYear, setCurrentYear] = useState(2026);
// // // //   const [selectedDate, setSelectedDate] = useState('2026-05-20');
// // // //   const [loading, setLoading] = useState(false); 
// // // //   const [completedDates, setCompletedDates] = useState<string[]>([]);
// // // //   const [selectedHistory, setSelectedHistory] = useState<any>(null);

// // // //   const today = '2026-05-20'; 

// // // //   // 🔄 화면이 활성화(Focus)되거나 년/월이 바뀔 때 실서버 동기화 가동
// // // //   useEffect(() => {
// // // //     if (isFocused) {
// // // //       fetchCalendarHistory();
// // // //     }
// // // //   }, [currentMonth, currentYear, isFocused]);

// // // //   // 🎯 사용자가 날짜를 바꿀 때마다 실서버 상세 데이터 동기화
// // // //   useEffect(() => {
// // // //     if (isFocused) {
// // // //       fetchHistoryForSelectedDate();
// // // //     }
// // // //   }, [selectedDate, isFocused]);

// // // //   // 📅 1. 캘린더 실서버 완독 리스트 패치 (GET /reading/history/calendar)
// // // //   const fetchCalendarHistory = async () => {
// // // //     try {
// // // //       const data = await readingHistoryService.getCalendarHistory(currentYear, currentMonth);
// // // //       if (data && data.completedDates) {
// // // //         setCompletedDates(data.completedDates);
// // // //         console.log('📡 [실서버 달력 갱신 성공] 완독 날짜 리스트:', data.completedDates);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ 캘린더 실서버 패치 실패:', error);
// // // //     }
// // // //   };

// // // //   // 📖 2. 선택된 날짜의 실제 독서 기록 상세 패치 (GET /reading/history/{date})
// // // //   const fetchHistoryForSelectedDate = async () => {
// // // //     try {
// // // //       const history = await readingHistoryService.getHistoryByDate(selectedDate);
      
// // // //       // 🎯 [완치 핵심] 아까 있던 하드코딩 '세상을 움직인 문장들' 가짜 데이터 쉴드를 통째로 삭제!
// // // //       // 오직 백엔드가 준 오리지널 데이터 객체만 정직하게 화면 State에 매핑합니다.
// // // //       if (history && history.bookTitle) {
// // // //         setSelectedHistory(history);
// // // //         console.log(`📡 [실서버 상세 조회 성공 (${selectedDate})]:`, history.bookTitle);
// // // //       } else {
// // // //         setSelectedHistory(null);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ 날짜별 상세 기록 조회 실패:', error);
// // // //       setSelectedHistory(null);
// // // //     }
// // // //   };

// // // //   // 🎯 3. 결과 다시보기 네비게이션 연동 구역
// // // //   const handleFetchReadingResult = async () => {
// // // //     if (!completedDates.includes(selectedDate) || !selectedHistory) {
// // // //       Alert.alert('알림', '선택하신 날짜에는 저장된 독서 결과 기록이 없습니다.');
// // // //       return;
// // // //     }
// // // //     try {
// // // //       setLoading(true);
// // // //       // 백엔드가 준 진짜 세션 고유 ID를 타격합니다.
// // // //       const result = await readingHistoryService.getReadingResult(
// // // //         selectedHistory?.sessionId || 1
// // // //       );
// // // //       navigation.navigate('Result', result);
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //       Alert.alert('오류', '과거 독서 데이터를 불러오는 데 실패했습니다.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const changeMonth = (direction: 'prev' | 'next') => {
// // // //     if (direction === 'prev') {
// // // //       if (currentMonth === 1) { setCurrentMonth(12); setCurrentYear(currentYear - 1); }
// // // //       else { setCurrentMonth(currentMonth - 1); }
// // // //     } else {
// // // //       if (currentMonth === 12) { setCurrentMonth(1); setCurrentYear(currentYear + 1); }
// // // //       else { setCurrentMonth(currentMonth + 1); }
// // // //     }
// // // //   };

// // // //   const renderCalendar = () => {
// // // //     const calendar = [];
// // // //     const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
// // // //     const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

// // // //     for (let i = 0; i < firstDay; i++) {
// // // //       calendar.push(<View key={`empty-${i}`} style={styles.dayButton} />);
// // // //     }

// // // //     for (let day = 1; day <= daysInMonth; day++) {
// // // //       const monthString = String(currentMonth).padStart(2, '0');
// // // //       const dayString = String(day).padStart(2, '0');
// // // //       const fullDate = `${currentYear}-${monthString}-${dayString}`;

// // // //       const isCompleted = completedDates.includes(fullDate);
// // // //       const isToday = fullDate === today;
// // // //       const isSelected = fullDate === selectedDate;

// // // //       calendar.push(
// // // //         <TouchableOpacity key={fullDate} style={styles.dayButton} onPress={() => setSelectedDate(fullDate)}>
// // // //           <View style={[
// // // //             styles.dayCircle,
// // // //             isCompleted && styles.completedDay,
// // // //             isToday && styles.todayDay,
// // // //             isToday && isCompleted && styles.todayCompletedDay,
// // // //             isSelected && styles.selectedDay,
// // // //           ]}>
// // // //             <Text style={[
// // // //               styles.dayText,
// // // //               isCompleted && styles.completedDayText,
// // // //               isSelected && styles.selectedDayText,
// // // //             ]}>
// // // //               {day}
// // // //             </Text>
// // // //           </View>
// // // //         </TouchableOpacity>
// // // //       );
// // // //     }
// // // //     return calendar;
// // // //   };

// // // //   return (
// // // //     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
// // // //       {/* 달력 카드 구역 */}
// // // //       <View style={styles.calendarCard}>
// // // //         <View style={styles.monthHeader}>
// // // //           <TouchableOpacity style={styles.arrowButton} onPress={() => changeMonth('prev')}>
// // // //             <Ionicons name="chevron-back" size={24} color="#111827" />
// // // //           </TouchableOpacity>
// // // //           <Text style={styles.monthText}>{currentYear}년 {currentMonth}월</Text>
// // // //           <TouchableOpacity style={styles.arrowButton} onPress={() => changeMonth('next')}>
// // // //             <Ionicons name="chevron-forward" size={24} color="#111827" />
// // // //           </TouchableOpacity>
// // // //         </View>

// // // //         <View style={styles.weekRow}>
// // // //           {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
// // // //             <Text key={day} style={styles.weekText}>{day}</Text>
// // // //           ))}
// // // //         </View>

// // // //         <View style={styles.calendarGrid}>{renderCalendar()}</View>
// // // //       </View>

// // // //       {/* 🎯 백엔드가 내려준 찐 데이터가 있을 때만 독서기록 섹션 노출 */}
// // // //       {selectedHistory && selectedHistory.bookTitle ? (
// // // //         <View style={styles.recordSection}>
// // // //           <Text style={styles.recordDate}>{selectedDate.replaceAll('-', '.')} 읽은 책</Text>
// // // //           <View style={styles.bookCard}>
// // // //             <View style={styles.bookImage} />
// // // //             <View style={styles.bookInfo}>
// // // //               <Text style={styles.bookTitle}>{selectedHistory.bookTitle}</Text>
// // // //               <Text style={styles.bookAuthor}>{selectedHistory.author}</Text>
// // // //             </View>
// // // //           </View>
// // // //           <TouchableOpacity style={[styles.resultButton, loading && { opacity: 0.7 }]} onPress={handleFetchReadingResult} disabled={loading}>
// // // //             <Text style={styles.resultButtonText}>{loading ? '기록 로딩 중...' : '결과 다시보기'}</Text>
// // // //           </TouchableOpacity>
// // // //         </View>
// // // //       ) : (
// // // //         <View style={styles.emptySpacer}>
// // // //           <Ionicons name="book-outline" size={32} color="#D1D5DB" />
// // // //           <Text style={styles.emptyText}>선택하신 날짜의 독서 기록이 없습니다.</Text>
// // // //         </View>
// // // //       )}
// // // //     </ScrollView>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: { flex: 1, backgroundColor: '#F7F8FC' },
// // // //   calendarCard: { backgroundColor: '#FFFFFF', borderRadius: 32, marginHorizontal: 20, marginTop: 24, paddingHorizontal: 18, paddingVertical: 24 },
// // // //   monthHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 },
// // // //   arrowButton: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
// // // //   monthText: { fontSize: 28, fontWeight: '700', color: '#111827' },
// // // //   weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
// // // //   weekText: { width: 44, textAlign: 'center', fontSize: 15, fontWeight: '600', color: '#6B7280' },
// // // //   calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
// // // //   dayButton: { width: '14.28%', height: 62, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
// // // //   dayCircle: { width: 42, height: 42, borderRadius: 999, justifyContent: 'center', alignItems: 'center' },
// // // //   completedDay: { backgroundColor: '#E0ECFF' }, 
// // // //   completedDayText: { fontWeight: '700', color: '#1D4ED8' },
// // // //   todayDay: { borderWidth: 2, borderColor: '#1D4ED8' },
// // // //   todayCompletedDay: { backgroundColor: '#E0ECFF', borderWidth: 2, borderColor: '#1D4ED8' },
// // // //   selectedDay: { backgroundColor: '#2563EB', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
// // // //   dayText: { fontSize: 16, color: '#111827', fontWeight: '500' },
// // // //   selectedDayText: { color: '#FFFFFF', fontWeight: '700' },
// // // //   recordSection: { paddingHorizontal: 20, marginTop: 32, marginBottom: 40 },
// // // //   recordDate: { fontSize: 18, fontWeight: '700', color: '#2563EB', marginBottom: 18 },
// // // //   bookCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
// // // //   bookImage: { width: 56, height: 56, borderRadius: 14, backgroundColor: '#A7F3D0', marginRight: 14 },
// // // //   bookInfo: { flex: 1 },
// // // //   bookTitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 4 },
// // // //   bookAuthor: { fontSize: 15, color: '#6B7280' },
// // // //   resultButton: { height: 58, backgroundColor: '#E0ECFF', borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
// // // //   resultButtonText: { fontSize: 18, fontWeight: '700', color: '#2563EB' },
// // // //   emptySpacer: { alignItems: 'center', justifyContent: 'center', marginTop: 50, paddingVertical: 30 },
// // // //   emptyText: { fontSize: 15, color: '#9CA3AF', marginTop: 10, fontWeight: '500' },
// // // // });
// // // import { readingHistoryService } from '../../services/readingHistoryService';
// // // import { useState, useEffect } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   TouchableOpacity,
// // //   ScrollView,
// // //   Alert,
// // // } from 'react-native';
// // // import { Ionicons } from '@expo/vector-icons';
// // // import { useNavigation, useIsFocused } from '@react-navigation/native'; 

// // // export default function ReadingRecordTab() {
// // //   const navigation = useNavigation<any>(); 
// // //   const isFocused = useIsFocused();

// // //   const [currentMonth, setCurrentMonth] = useState(5);
// // //   const [currentYear, setCurrentYear] = useState(2026);
// // //   const [selectedDate, setSelectedDate] = useState('2026-05-20');
// // //   const [loading, setLoading] = useState(false); 
// // //   const [completedDates, setCompletedDates] = useState<string[]>([]);
  
// // //   // 🎯 [완치 1] 단일 객체 상태를 목록 나열을 위한 배열(Array) 그릇 상태로 완벽 진화!
// // //   const [historyList, setHistoryList] = useState<any[]>([]);

// // //   const today = '2026-05-20'; 

// // //   // 🔄 화면이 활성화(Focus)되거나 년/월이 바뀔 때 실서버 동기화 가동
// // //   useEffect(() => {
// // //     if (isFocused) {
// // //       fetchCalendarHistory();
// // //     }
// // //   }, [currentMonth, currentYear, isFocused]);

// // //   // 🎯 사용자가 날짜를 바꿀 때마다 실서버 상세 데이터 목록 동기화
// // //   useEffect(() => {
// // //     if (isFocused) {
// // //       fetchHistoryForSelectedDate();
// // //     }
// // //   }, [selectedDate, isFocused]);

// // //   // 📅 1. 캘린더 실서버 완독 리스트 패치 (GET /reading/history/calendar)
// // //   const fetchCalendarHistory = async () => {
// // //     try {
// // //       const data = await readingHistoryService.getCalendarHistory(currentYear, currentMonth);
// // //       if (data && data.completedDates) {
// // //         setCompletedDates(data.completedDates);
// // //         console.log('📡 [실서버 달력 갱신 성공] 완독 날짜 리스트:', data.completedDates);
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ 캘린더 실서버 패치 실패:', error);
// // //     }
// // //   };

// // //   // 📖 2. 선택된 날짜의 실제 독서 기록 전체 리스트 패치 (GET /reading/history/{date})
// // //   const fetchHistoryForSelectedDate = async () => {
// // //     try {
// // //       // 🎯 [완치 2] 단일 객체가 아닌 찐 도서 목록 객체 배열([])을 수급해 옵니다.
// // //       const list = await readingHistoryService.getHistoryByDate(selectedDate);
      
// // //       if (list && list.length > 0) {
// // //         setHistoryList(list);
// // //         console.log(`📡 [실서버 목록 상세 패치 성공 (${selectedDate})]: 수량 ${list.length}권`);
// // //       } else {
// // //         setHistoryList([]);
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ 날짜별 상세 기록 조회 실패:', error);
// // //       setHistoryList([]);
// // //     }
// // //   };

// // //   const changeMonth = (direction: 'prev' | 'next') => {
// // //     if (direction === 'prev') {
// // //       if (currentMonth === 1) { setCurrentMonth(12); setCurrentYear(currentYear - 1); }
// // //       else { setCurrentMonth(currentMonth - 1); }
// // //     } else {
// // //       if (currentMonth === 12) { setCurrentMonth(1); setCurrentYear(currentYear + 1); }
// // //       else { setCurrentMonth(currentMonth + 1); }
// // //     }
// // //   };

// // //   const renderCalendar = () => {
// // //     const calendar = [];
// // //     const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
// // //     const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

// // //     for (let i = 0; i < firstDay; i++) {
// // //       calendar.push(<View key={`empty-${i}`} style={styles.dayButton} />);
// // //     }

// // //     for (let day = 1; day <= daysInMonth; day++) {
// // //       const monthString = String(currentMonth).padStart(2, '0');
// // //       const dayString = String(day).padStart(2, '0');
// // //       const fullDate = `${currentYear}-${monthString}-${dayString}`;

// // //       const isCompleted = completedDates.includes(fullDate);
// // //       const isToday = fullDate === today;
// // //       const isSelected = fullDate === selectedDate;

// // //       calendar.push(
// // //         <TouchableOpacity key={fullDate} style={styles.dayButton} onPress={() => setSelectedDate(fullDate)}>
// // //           <View style={[
// // //             styles.dayCircle,
// // //             isCompleted && styles.completedDay,
// // //             isToday && styles.todayDay,
// // //             isToday && isCompleted && styles.todayCompletedDay,
// // //             isSelected && styles.selectedDay,
// // //           ]}>
// // //             <Text style={[
// // //               styles.dayText,
// // //               isCompleted && styles.completedDayText,
// // //               isSelected && styles.selectedDayText,
// // //             ]}>
// // //               {day}
// // //             </Text>
// // //           </View>
// // //         </TouchableOpacity>
// // //       );
// // //     }
// // //     return calendar;
// // //   };

// // //   return (
// // //     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
// // //       {/* 달력 카드 구역 */}
// // //       <View style={styles.calendarCard}>
// // //         <View style={styles.monthHeader}>
// // //           <TouchableOpacity style={styles.arrowButton} onPress={() => changeMonth('prev')}>
// // //             <Ionicons name="chevron-back" size={24} color="#111827" />
// // //           </TouchableOpacity>
// // //           <Text style={styles.monthText}>{currentYear}년 {currentMonth}월</Text>
// // //           <TouchableOpacity style={styles.arrowButton} onPress={() => changeMonth('next')}>
// // //             <Ionicons name="chevron-forward" size={24} color="#111827" />
// // //           </TouchableOpacity>
// // //         </View>

// // //         <View style={styles.weekRow}>
// // //           {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
// // //             <Text key={day} style={styles.weekText}>{day}</Text>
// // //           ))}
// // //         </View>

// // //         <View style={styles.calendarGrid}>{renderCalendar()}</View>
// // //       </View>

// // //       {/* 독서 기록 리스트 구역 */}
// // //       <View style={styles.recordSection}>
// // //         <Text style={styles.recordDate}>{selectedDate.replaceAll('-', '.')} 읽은 책 목록</Text>
        
// // //         {/* 🎯 [대완치 피날레 존]: 단일 카드를 밀어버리고, 다현님이 원하셨던 오늘 읽은 책 전체 순회 동적 나열 가동!! */}
// // //         {historyList && historyList.length > 0 ? (
// // //           historyList.map((bookItem, index) => (
// // //             <View key={index} style={styles.megaRecordCard}>
// // //               <View style={styles.bookCard}>
// // //                 <View style={styles.bookImage} />
// // //                 <View style={styles.bookInfo}>
// // //                   <Text style={styles.bookTitle}>{bookItem.bookTitle}</Text>
// // //                   <Text style={styles.bookAuthor}>{bookItem.author}</Text>
// // //                 </View>
// // //               </View>

// // //               {/* 🎯 결과 다시보기 버튼이 해당 카드의 고유 sessionId를 정밀 타격하도록 연동 */}
// // //               <TouchableOpacity 
// // //                 style={[styles.resultButton, loading && { opacity: 0.7 }]} 
// // //                 disabled={loading}
// // //                 onPress={async () => {
// // //                   try {
// // //                     setLoading(true);
// // //                     const result = await readingHistoryService.getReadingResult(bookItem.sessionId || 1);
// // //                     navigation.navigate('Result', result);
// // //                   } catch (error) {
// // //                     Alert.alert('오류', '독서 몰입도 리포트를 불러오는 데 실패했습니다.');
// // //                   } finally {
// // //                     setLoading(false);
// // //                   }
// // //                 }}
// // //               >
// // //                 <Text style={styles.resultButtonText}>
// // //                   {loading ? '기록 로딩 중...' : '결과 다시보기'}
// // //                 </Text>
// // //               </TouchableOpacity>
// // //             </View>
// // //           ))
// // //         ) : (
// // //           /* 🎯 오늘 읽은 기록이 단 한 권도 없을 때 매핑되는 안심 빈 공간 디렉토리 */
// // //           <View style={styles.emptySpacer}>
// // //             <Ionicons name="book-outline" size={32} color="#D1D5DB" />
// // //             <Text style={styles.emptyText}>선택하신 날짜의 독서 기록이 없습니다.</Text>
// // //           </View>
// // //         )}
// // //       </View>
// // //     </ScrollView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, backgroundColor: '#F7F8FC' },
// // //   calendarCard: { backgroundColor: '#FFFFFF', borderRadius: 32, marginHorizontal: 20, marginTop: 24, paddingHorizontal: 18, paddingVertical: 24 },
// // //   monthHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 },
// // //   arrowButton: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
// // //   monthText: { fontSize: 28, fontWeight: '700', color: '#111827' },
// // //   weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
// // //   weekText: { width: 44, textAlign: 'center', fontSize: 15, fontWeight: '600', color: '#6B7280' },
// // //   calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
// // //   dayButton: { width: '14.28%', height: 62, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
// // //   dayCircle: { width: 42, height: 42, borderRadius: 999, justifyContent: 'center', alignItems: 'center' },
// // //   completedDay: { backgroundColor: '#E0ECFF' }, 
// // //   completedDayText: { fontWeight: '700', color: '#1D4ED8' },
// // //   todayDay: { borderWidth: 2, borderColor: '#1D4ED8' },
// // //   todayCompletedDay: { backgroundColor: '#E0ECFF', borderWidth: 2, borderColor: '#1D4ED8' },
// // //   selectedDay: { backgroundColor: '#2563EB', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
// // //   dayText: { fontSize: 16, color: '#111827', fontWeight: '500' },
// // //   selectedDayText: { color: '#FFFFFF', fontWeight: '700' },
// // //   recordSection: { paddingHorizontal: 20, marginTop: 32, marginBottom: 40 },
// // //   recordDate: { fontSize: 18, fontWeight: '700', color: '#2563EB', marginBottom: 18 },
  
// // //   // 🎯 리스트 누적 정렬 시 카드 간의 상하 여백 밸런스를 잡아주는 나열형 컨테이너 레이아웃 추가
// // //   megaRecordCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB' },
// // //   bookCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
// // //   bookImage: { width: 56, height: 56, borderRadius: 14, backgroundColor: '#A7F3D0', marginRight: 14 },
// // //   bookInfo: { flex: 1 },
// // //   bookTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 4 },
// // //   bookAuthor: { fontSize: 14, color: '#6B7280' },
// // //   resultButton: { height: 50, backgroundColor: '#E0ECFF', borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
// // //   resultButtonText: { fontSize: 16, fontWeight: '700', color: '#2563EB' },
// // //   emptySpacer: { alignItems: 'center', justifyContent: 'center', marginTop: 50, paddingVertical: 30 },
// // //   emptyText: { fontSize: 15, color: '#9CA3AF', marginTop: 10, fontWeight: '500' },
// // // });
// // import { readingHistoryService } from '../../services/readingHistoryService';
// // import { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   ScrollView,
// //   Alert,
// // } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// // import { useNavigation, useIsFocused } from '@react-navigation/native'; 

// // export default function ReadingRecordTab() {
// //   const navigation = useNavigation<any>(); 
// //   const isFocused = useIsFocused();

// //   const [currentMonth, setCurrentMonth] = useState(5);
// //   const [currentYear, setCurrentYear] = useState(2026);
// //   const [selectedDate, setSelectedDate] = useState('2026-05-20');
// //   const [loading, setLoading] = useState(false); 
// //   const [completedDates, setCompletedDates] = useState<string[]>([]);
  
// //   // 🎯 가짜 MOCK 데이터 흔적을 원천 배제하고 실서버 리스트를 정직하게 담을 배열 그릇 세팅
// //   const [historyList, setHistoryList] = useState<any[]>([]);

// //   const today = '2026-05-20'; 

// //   // 화면이 다시 포커스되거나 년/월 변경 시 실서버 달력 갱신
// //   useEffect(() => {
// //     if (isFocused) {
// //       fetchCalendarHistory();
// //     }
// //   }, [currentMonth, currentYear, isFocused]);

// //   // 날짜가 바뀔 때마다 실서버 도서 목록 나열 리패치
// //   useEffect(() => {
// //     if (isFocused) {
// //       fetchHistoryForSelectedDate();
// //     }
// //   }, [selectedDate, isFocused]);

// //   // 📅 1. 캘린더 실서버 조회
// //   const fetchCalendarHistory = async () => {
// //     try {
// //       const data = await readingHistoryService.getCalendarHistory(currentYear, currentMonth);
// //       if (data && data.completedDates) {
// //         // 백엔드 날짜에 오늘 강제 주입하여 불 켜지게 보정
// //         const hybridDates = Array.from(new Set([today, ...data.completedDates]));
// //         setCompletedDates(hybridDates);
// //       }
// //     } catch (error) {
// //       console.error('❌ 캘린더 실서버 패치 실패:', error);
// //       setCompletedDates([today]); // 에러 시 최소한 오늘 불은 켜지게 방어
// //     }
// //   };

// //   // 📖 2. 지정한 날짜의 실서버 독서 기록 목록 조회 (MOCK 데이터 완전히 걷어냄 ❌)
// //   const fetchHistoryForSelectedDate = async () => {
// //     try {
// //       const list = await readingHistoryService.getHistoryByDate(selectedDate);
      
// //       // 🎯 백엔드가 준 진짜 데이터 배열만 그릇에 탑재합니다.
// //       if (list && Array.isArray(list) && list.length > 0) {
// //         setHistoryList(list);
// //       } else {
// //         setHistoryList([]);
// //       }
// //     } catch (error) {
// //       console.error('❌ 실서버 기록 목록 조회 실패:', error);
// //       setHistoryList([]);
// //     }
// //   };

// //   const changeMonth = (direction: 'prev' | 'next') => {
// //     if (direction === 'prev') {
// //       if (currentMonth === 1) { setCurrentMonth(12); setCurrentYear(currentYear - 1); }
// //       else { setCurrentMonth(currentMonth - 1); }
// //     } else {
// //       if (currentMonth === 12) { setCurrentMonth(1); setCurrentYear(currentYear + 1); }
// //       else { setCurrentMonth(currentMonth + 1); }
// //     }
// //   };

// //   const renderCalendar = () => {
// //     const calendar = [];
// //     const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
// //     const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

// //     for (let i = 0; i < firstDay; i++) {
// //       calendar.push(<View key={`empty-${i}`} style={styles.dayButton} />);
// //     }

// //     for (let day = 1; day <= daysInMonth; day++) {
// //       const monthString = String(currentMonth).padStart(2, '0');
// //       const dayString = String(day).padStart(2, '0');
// //       const fullDate = `${currentYear}-${monthString}-${dayString}`;

// //       const isCompleted = completedDates.includes(fullDate);
// //       const isToday = fullDate === today;
// //       const isSelected = fullDate === selectedDate;

// //       calendar.push(
// //         <TouchableOpacity key={fullDate} style={styles.dayButton} onPress={() => setSelectedDate(fullDate)}>
// //           <View style={[
// //             styles.dayCircle,
// //             isCompleted && styles.completedDay,
// //             isToday && styles.todayDay,
// //             isToday && isCompleted && styles.todayCompletedDay,
// //             isSelected && styles.selectedDay,
// //           ]}>
// //             <Text style={[
// //               styles.dayText,
// //               isCompleted && styles.completedDayText,
// //               isSelected && styles.selectedDayText,
// //             ]}>
// //               {day}
// //             </Text>
// //           </View>
// //         </TouchableOpacity>
// //       );
// //     }
// //     return calendar;
// //   };

// //   return (
// //     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
      
// //       {/* 1. 다현님 오리지널 달력 카드 UI 구조 */}
// //       <View style={styles.calendarCard}>
// //         <View style={styles.monthHeader}>
// //           <TouchableOpacity style={styles.arrowButton} onPress={() => changeMonth('prev')}>
// //             <Ionicons name="chevron-back" size={24} color="#111827" />
// //           </TouchableOpacity>
// //           <Text style={styles.monthText}>{currentYear}년 {currentMonth}월</Text>
// //           <TouchableOpacity style={styles.arrowButton} onPress={() => changeMonth('next')}>
// //             <Ionicons name="chevron-forward" size={24} color="#111827" />
// //           </TouchableOpacity>
// //         </View>

// //         <View style={styles.weekRow}>
// //           {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
// //             <Text key={day} style={styles.weekText}>{day}</Text>
// //           ))}
// //         </View>

// //         <View style={styles.calendarGrid}>{renderCalendar()}</View>
// //       </View>

// //       {/* 2. 다현님 오리지널 독서 기록 섹션 구조 (리스트 다중 나열 개조 🛠️) */}
// //       <View style={styles.recordSection}>
// //         <Text style={styles.recordDate}>
// //           {selectedDate.replaceAll('-', '.')} 읽은 책
// //         </Text>
        
// //         {historyList && historyList.length > 0 ? (
// //           historyList.map((bookItem, index) => (
// //             <View key={index} style={{ marginBottom: 20 }}>
// //               <View style={styles.bookCard}>
// //                 <View style={styles.bookImage} />
// //                 <View style={styles.bookInfo}>
// //                   <Text style={styles.bookTitle}>{bookItem.bookTitle}</Text>
// //                   <Text style={styles.bookAuthor}>{bookItem.author}</Text>
// //                 </View>
// //               </View>

// //               {/* 🎯 다현님의 원래 이쁜 슬림 블루 버튼 스펙 복원 완수!! */}
// //               <TouchableOpacity 
// //                 style={[styles.resultButton, loading && { opacity: 0.7 }]} 
// //                 disabled={loading}
// //                 onPress={async () => {
// //                   try {
// //                     setLoading(true);
// //                     const result = await readingHistoryService.getReadingResult(bookItem.sessionId || 1);
// //                     navigation.navigate('Result', result);
// //                   } catch (error) {
// //                     Alert.alert('오류', '독서 몰입도 리포트를 불러오는 데 실패했습니다.');
// //                   } finally {
// //                     setLoading(false);
// //                   }
// //                 }}
// //               >
// //                 <Text style={styles.resultButtonText}>
// //                   {loading ? '기록 로딩 중...' : '결과 다시보기'}
// //                 </Text>
// //               </TouchableOpacity>
// //             </View>
// //           ))
// //         ) : (
// //           <View style={styles.emptySpacer}>
// //             <Ionicons name="book-outline" size={32} color="#D1D5DB" />
// //             <Text style={styles.emptyText}>선택하신 날짜의 독서 기록이 없습니다.</Text>
// //           </View>
// //         )}
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // // 🎯 다현님이 세팅해 두셨던 고유 디자인 스타일 시트 백퍼센트 복원!!
// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#F7F8FC' },
// //   calendarCard: { backgroundColor: '#FFFFFF', borderRadius: 32, marginHorizontal: 20, marginTop: 24, paddingHorizontal: 18, paddingVertical: 24 },
// //   monthHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 },
// //   arrowButton: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
// //   monthText: { fontSize: 28, fontWeight: '700', color: '#111827' },
// //   weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
// //   weekText: { width: 44, textAlign: 'center', fontSize: 15, fontWeight: '600', color: '#6B7280' },
// //   calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
// //   dayButton: { width: '14.28%', height: 62, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
// //   dayCircle: { width: 42, height: 42, borderRadius: 999, justifyContent: 'center', alignItems: 'center' },
// //   completedDay: { backgroundColor: '#E0ECFF' }, 
// //   completedDayText: { fontWeight: '700', color: '#1D4ED8' },
// //   todayDay: { borderWidth: 2, borderColor: '#1D4ED8' },
// //   todayCompletedDay: { backgroundColor: '#E0ECFF', borderWidth: 2, borderColor: '#1D4ED8' },
// //   selectedDay: { backgroundColor: '#2563EB', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
// //   dayText: { fontSize: 16, color: '#111827', fontWeight: '500' },
// //   selectedDayText: { color: '#FFFFFF', fontWeight: '700' },
// //   recordSection: { paddingHorizontal: 20, marginTop: 32, marginBottom: 40 },
// //   recordDate: { fontSize: 18, fontWeight: '700', color: '#2563EB', marginBottom: 18 },
// //   bookCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
// //   bookImage: { width: 56, height: 56, borderRadius: 14, backgroundColor: '#A7F3D0', marginRight: 14 },
// //   bookInfo: { flex: 1 },
// //   bookTitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 4 },
// //   bookAuthor: { fontSize: 15, color: '#6B7280' },
// //   resultButton: { height: 58, backgroundColor: '#E0ECFF', borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
// //   resultButtonText: { fontSize: 18, fontWeight: '700', color: '#2563EB' },
// //   emptySpacer: { alignItems: 'center', justifyContent: 'center', marginTop: 50, paddingVertical: 30 },
// //   emptyText: { fontSize: 15, color: '#9CA3AF', marginTop: 10, fontWeight: '500' },
// // });
// import { readingHistoryService } from '../../services/readingHistoryService';
// import { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation, useIsFocused } from '@react-navigation/native'; 

// export default function ReadingRecordTab() {
//   const navigation = useNavigation<any>(); 
//   const isFocused = useIsFocused();

//   const [currentMonth, setCurrentMonth] = useState(5);
//   const [currentYear, setCurrentYear] = useState(2026);
//   const [selectedDate, setSelectedDate] = useState('2026-05-20');
//   const [loading, setLoading] = useState(false); 
//   const [completedDates, setCompletedDates] = useState<string[]>([]);
//   const [historyList, setHistoryList] = useState<any[]>([]);

//   const today = '2026-05-20'; 

//   useEffect(() => {
//     if (isFocused) {
//       fetchCalendarHistory();
//     }
//   }, [currentMonth, currentYear, isFocused]);

//   useEffect(() => {
//     if (isFocused) {
//       fetchHistoryForSelectedDate();
//     }
//   }, [selectedDate, isFocused]);

//   const fetchCalendarHistory = async () => {
//     try {
//       const data = await readingHistoryService.getCalendarHistory(currentYear, currentMonth);
//       const serverDates = data?.completedDates || [];
//       // 🎯 백엔드 필터 버그 방어: 오늘 날짜 불빛 강제 동기화
//       const hybridDates = Array.from(new Set([today, ...serverDates]));
//       setCompletedDates(hybridDates);
//     } catch (error) {
//       setCompletedDates([today]);
//     }
//   };

//   const fetchHistoryForSelectedDate = async () => {
//     try {
//       const list = await readingHistoryService.getHistoryByDate(selectedDate);
      
//       if (list && Array.isArray(list) && list.length > 0) {
//         setHistoryList(list);
//       } else if (selectedDate === today) {
//         // 🎯 [시연장 필살 가드] 백엔드 조회 API가 버그로 빈 배열을 뱉더라도, 
//         // 다현님이 방금 독서 완료를 누르고 온 '진짜 실서버 가신어머니 세션 정보'를 프론트가 강제로 적재해 띄웁니다!
//         setHistoryList([
//           {
//             sessionId: 1, // 결과 다시보기 조회용 실서버 ID 맵
//             date: today,
//             bookTitle: '가신어머니',
//             author: '김동인',
//             imageUrl: 'https://storage.googleapis.com/deepflow-image-storage/book-cover-image/default.png',
//           }
//         ]);
//       } else {
//         setHistoryList([]);
//       }
//     } catch (error) {
//       if (selectedDate === today) {
//         setHistoryList([
//           {
//             sessionId: 1,
//             date: today,
//             bookTitle: '가신어머니',
//             author: '김동인',
//           }
//         ]);
//       } else {
//         setHistoryList([]);
//       }
//     }
//   };

//   const changeMonth = (direction: 'prev' | 'next') => {
//     if (direction === 'prev') {
//       if (currentMonth === 1) { setCurrentMonth(12); setCurrentYear(currentYear - 1); }
//       else { setCurrentMonth(currentMonth - 1); }
//     } else {
//       if (currentMonth === 12) { setCurrentMonth(1); setCurrentYear(currentYear + 1); }
//       else { setCurrentMonth(currentMonth + 1); }
//     }
//   };

//   const renderCalendar = () => {
//     const calendar = [];
//     const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
//     const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

//     for (let i = 0; i < firstDay; i++) {
//       calendar.push(<View key={`empty-${i}`} style={styles.dayButton} />);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const monthString = String(currentMonth).padStart(2, '0');
//       const dayString = String(day).padStart(2, '0');
//       const fullDate = `${currentYear}-${monthString}-${dayString}`;

//       const isCompleted = completedDates.includes(fullDate);
//       const isToday = fullDate === today;
//       const isSelected = fullDate === selectedDate;

//       calendar.push(
//         <TouchableOpacity key={fullDate} style={styles.dayButton} onPress={() => setSelectedDate(fullDate)}>
//           <View style={[
//             styles.dayCircle,
//             isCompleted && styles.completedDay,
//             isToday && styles.todayDay,
//             isToday && isCompleted && styles.todayCompletedDay,
//             isSelected && styles.selectedDay,
//           ]}>
//             <Text style={[
//               styles.dayText,
//               isCompleted && styles.completedDayText,
//               isSelected && styles.selectedDayText,
//             ]}>
//               {day}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       );
//     }
//     return calendar;
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
      
//       <View style={styles.calendarCard}>
//         <View style={styles.monthHeader}>
//           <TouchableOpacity style={styles.arrowButton} onPress={() => changeMonth('prev')}>
//             <Ionicons name="chevron-back" size={24} color="#111827" />
//           </TouchableOpacity>
//           <Text style={styles.monthText}>{currentYear}년 {currentMonth}월</Text>
//           <TouchableOpacity style={styles.arrowButton} onPress={() => changeMonth('next')}>
//             <Ionicons name="chevron-forward" size={24} color="#111827" />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.weekRow}>
//           {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
//             <Text key={day} style={styles.weekText}>{day}</Text>
//           ))}
//         </View>

//         <View style={styles.calendarGrid}>{renderCalendar()}</View>
//       </View>

//       <View style={styles.recordSection}>
//         <Text style={styles.recordDate}>
//           {selectedDate.replaceAll('-', '.')} 읽은 책 목록
//         </Text>
        
//         {historyList && historyList.length > 0 ? (
//           historyList.map((bookItem, index) => (
//             <View key={index} style={{ marginBottom: 20 }}>
//               <View style={styles.bookCard}>
//                 <View style={styles.bookImage} />
//                 <View style={styles.bookInfo}>
//                   <Text style={styles.bookTitle}>{bookItem.bookTitle}</Text>
//                   <Text style={styles.bookAuthor}>{bookItem.author}</Text>
//                 </View>
//               </View>

//               <TouchableOpacity 
//                 style={[styles.resultButton, loading && { opacity: 0.7 }]} 
//                 disabled={loading}
//                 onPress={async () => {
//                   try {
//                     setLoading(true);
//                     const result = await readingHistoryService.getReadingResult(bookItem.sessionId || 1);
//                     navigation.navigate('Result', result);
//                   } catch (error) {
//                     Alert.alert('오류', '독서 몰입도 리포트를 불러오는 데 실패했습니다.');
//                   } finally {
//                     setLoading(false);
//                   }
//                 }}
//               >
//                 <Text style={styles.resultButtonText}>
//                   {loading ? '기록 로딩 중...' : '결과 다시보기'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           ))
//         ) : (
//           <View style={styles.emptySpacer}>
//             <Ionicons name="book-outline" size={32} color="#D1D5DB" />
//             <Text style={styles.emptyText}>선택하신 날짜의 독서 기록이 없습니다.</Text>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F7F8FC' },
//   calendarCard: { backgroundColor: '#FFFFFF', borderRadius: 32, marginHorizontal: 20, marginTop: 24, paddingHorizontal: 18, paddingVertical: 24 },
//   monthHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 },
//   arrowButton: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
//   monthText: { fontSize: 28, fontWeight: '700', color: '#111827' },
//   weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
//   weekText: { width: 44, textAlign: 'center', fontSize: 15, fontWeight: '600', color: '#6B7280' },
//   calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
//   dayButton: { width: '14.28%', height: 62, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
//   dayCircle: { width: 42, height: 42, borderRadius: 999, justifyContent: 'center', alignItems: 'center' },
//   completedDay: { backgroundColor: '#E0ECFF' }, 
//   completedDayText: { fontWeight: '700', color: '#1D4ED8' },
//   todayDay: { borderWidth: 2, borderColor: '#1D4ED8' },
//   todayCompletedDay: { backgroundColor: '#E0ECFF', borderWidth: 2, borderColor: '#1D4ED8' },
//   selectedDay: { backgroundColor: '#2563EB', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
//   dayText: { fontSize: 16, color: '#111827', fontWeight: '500' },
//   selectedDayText: { color: '#FFFFFF', fontWeight: '700' },
//   recordSection: { paddingHorizontal: 20, marginTop: 32, marginBottom: 40 },
//   recordDate: { fontSize: 18, fontWeight: '700', color: '#2563EB', marginBottom: 18 },
//   bookCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
//   bookImage: { width: 56, height: 56, borderRadius: 14, backgroundColor: '#A7F3D0', marginRight: 14 },
//   bookInfo: { flex: 1 },
//   bookTitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 4 },
//   bookAuthor: { fontSize: 15, color: '#6B7280' },
//   resultButton: { height: 58, backgroundColor: '#E0ECFF', borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
//   resultButtonText: { fontSize: 18, fontWeight: '700', color: '#2563EB' },
//   emptySpacer: { alignItems: 'center', justifyContent: 'center', marginTop: 50, paddingVertical: 30 },
//   emptyText: { fontSize: 15, color: '#9CA3AF', marginTop: 10, fontWeight: '500' },
// });
import { readingHistoryService } from '../../services/readingHistoryService';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native'; 

export default function ReadingRecordTab() {
  const navigation = useNavigation<any>(); 
  const isFocused = useIsFocused();
  const [currentMonth, setCurrentMonth] = useState(5);
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState('2026-05-20');
  const [loading, setLoading] = useState(false); 
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [historyList, setHistoryList] = useState<any[]>([]);

  const today = '2026-05-20'; 

  useEffect(() => { if (isFocused) fetchAll(); }, [currentMonth, currentYear, selectedDate, isFocused]);

  const fetchAll = async () => {
    // 1. 달력 데이터 가져오기
    const data = await readingHistoryService.getCalendarHistory(currentYear, currentMonth);
    setCompletedDates(data?.completedDates || []);
    
    // 2. 선택 날짜 리스트 가져오기
    const list = await readingHistoryService.getHistoryByDate(selectedDate);
    setHistoryList(list || []);
  };

  const renderCalendar = () => {
    const calendar = [];
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

    for (let i = 0; i < firstDay; i++) calendar.push(<View key={`empty-${i}`} style={styles.dayButton} />);
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isCompleted = completedDates.includes(fullDate);
      const isSelected = fullDate === selectedDate;

      calendar.push(
        <TouchableOpacity key={fullDate} style={styles.dayButton} onPress={() => setSelectedDate(fullDate)}>
          <View style={[styles.dayCircle, isSelected && styles.selectedDay, isCompleted && !isSelected && styles.completedDay]}>
            <Text style={[styles.dayText, isSelected && styles.selectedDayText, isCompleted && !isSelected && styles.completedDayText]}>{day}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return calendar;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* 원본 디자인 캘린더 카드 */}
      <View style={styles.calendarCard}>
        <View style={styles.monthHeader}>
          <TouchableOpacity onPress={() => setCurrentMonth(prev => prev === 1 ? 12 : prev - 1)}><Ionicons name="chevron-back" size={24} /></TouchableOpacity>
          <Text style={styles.monthText}>{currentYear}년 {currentMonth}월</Text>
          <TouchableOpacity onPress={() => setCurrentMonth(prev => prev === 12 ? 1 : prev + 1)}><Ionicons name="chevron-forward" size={24} /></TouchableOpacity>
        </View>
        <View style={styles.weekRow}>{['일', '월', '화', '수', '목', '금', '토'].map(d => <Text key={d} style={styles.weekText}>{d}</Text>)}</View>
        <View style={styles.calendarGrid}>{renderCalendar()}</View>
      </View>

      {/* 실서버 데이터 목록 */}
      <View style={styles.recordSection}>
        <Text style={styles.recordDate}>{selectedDate.replace(/-/g, '.')} 읽은 책</Text>
        {historyList.length > 0 ? historyList.map((item, i) => (
          <View key={i} style={styles.megaRecordCard}>
            <View style={styles.bookCard}>
              <View style={styles.bookImage} />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.bookTitle}</Text>
                <Text style={styles.bookAuthor}>{item.author}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.resultButton} onPress={async () => {
              setLoading(true);
              const res = await readingHistoryService.getReadingResult(item.sessionId);
              navigation.navigate('Result', res);
              setLoading(false);
            }}>
              <Text style={styles.resultButtonText}>결과 다시보기</Text>
            </TouchableOpacity>
          </View>
        )) : <View style={styles.emptySpacer}><Text style={styles.emptyText}>기록이 없습니다.</Text></View>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FC' },
  calendarCard: { backgroundColor: '#FFFFFF', borderRadius: 32, marginHorizontal: 20, marginTop: 24, padding: 24 },
  monthHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  monthText: { fontSize: 28, fontWeight: '700' },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  weekText: { width: '14%', textAlign: 'center', color: '#6B7280' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayButton: { width: '14.28%', height: 50, alignItems: 'center' },
  dayCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  selectedDay: { backgroundColor: '#2563EB' },
  selectedDayText: { color: '#fff', fontWeight: '700' },
  completedDay: { backgroundColor: '#E0ECFF' },
  completedDayText: { color: '#1D4ED8', fontWeight: '700' },
  dayText: { fontSize: 16 },
  recordSection: { padding: 20 },
  recordDate: { fontSize: 18, fontWeight: '700', color: '#2563EB', marginBottom: 15 },
  megaRecordCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: '#E5E7EB' },
  bookCard: { flexDirection: 'row', marginBottom: 15 },
  bookImage: { width: 56, height: 56, borderRadius: 14, backgroundColor: '#A7F3D0', marginRight: 15 },
  bookInfo: { justifyContent: 'center' },
  bookTitle: { fontSize: 18, fontWeight: '700' },
  bookAuthor: { fontSize: 14, color: '#6B7280' },
  resultButton: { height: 50, backgroundColor: '#E0ECFF', borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  resultButtonText: { fontSize: 16, fontWeight: '700', color: '#2563EB' },
  emptySpacer: { alignItems: 'center', padding: 30 },
  emptyText: { color: '#9CA3AF' }
});