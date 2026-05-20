// import { readingHistoryService,} from '../../services/readingHistoryService';
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
// import { useNavigation } from '@react-navigation/native'; 



// export default function ReadingRecordTab() {
//   const navigation = useNavigation<any>(); 

//   const [currentMonth, setCurrentMonth] = useState(5);
//   const [currentYear, setCurrentYear] = useState(2026);
//   const [selectedDate, setSelectedDate] = useState('2026-05-18');
//   const [loading, setLoading] = useState(false); 
//   const [
//   completedDates,
//   setCompletedDates,
// ] = useState<string[]>([]);

// const [
//   selectedHistory,
//   setSelectedHistory,
// ] = useState<any>(null);

// const today = '2026-05-18';
//   useEffect(() => {
//   fetchCalendarHistory();
// }, []);

// const fetchCalendarHistory =
//   async () => {
//     try {
//       const data =
//         await readingHistoryService.getCalendarHistory(
//           currentYear,
//           currentMonth
//         );

//       setCompletedDates(
//         data.completedDates
//       );
//     } catch (error) {
//       console.error(
//         '캘린더 조회 실패:',
//         error
//       );
//     }
//   };

//   const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
//   const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

//   const changeMonth = (direction: 'prev' | 'next') => {
//     if (direction === 'prev') {
//       if (currentMonth === 1) {
//         setCurrentMonth(12);
//         setCurrentYear(currentYear - 1);
//       } else {
//         setCurrentMonth(currentMonth - 1);
//       }
//     } else {
//       if (currentMonth === 12) {
//         setCurrentMonth(1);
//         setCurrentYear(currentYear + 1);
//       } else {
//         setCurrentMonth(currentMonth + 1);
//       }
//     }
//   };

//   // 결과 다시보기 클릭 시 백엔드 조회 후 ResultScreen 이동
//   const handleFetchReadingResult = async () => {
//     // 만약 완독 리스트(completedDates)에 없는 날짜를 누르고 조회하려 하면 예외 처리
//     if (!completedDates.includes(selectedDate)) {
//       Alert.alert('알림', '선택하신 날짜에는 저장된 독서 결과 기록이 없습니다.');
//       return;
//     }

//     try {
//       setLoading(true);

//       // 실무 백엔드 연동 시 예시:
//       // const response = await axios.get(`/api/reading/result?date=${selectedDate}`);
//       // const result = response.data;

//       const result =
//         await readingHistoryService.getReadingResult(
//           selectedHistory?.sessionId || 1
//         );

//       // 독서 결과 화면으로 데이터를 고대로 실어서 스위칭 이동!
//       navigation.navigate('Result', result );

//     } catch (error) {
//       console.error(error);
//       Alert.alert('오류', '과거 독서 데이터를 불러오는 데 실패했습니다.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderCalendar = () => {
//     const calendar = [];

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
//         <TouchableOpacity
//           key={fullDate}
//           style={styles.dayButton}
//           onPress={async () => {
//             setSelectedDate(fullDate);
            
//             try {
//               const history =
//                 await readingHistoryService.getHistoryByDate(
//                   fullDate
//                 );
//               setSelectedHistory(history);
//             } catch (error){
//               console.error(
//                 '날짜별 기록 조회 실패:',
//                 error
//               );
//             }
//           }}
//           >
//           <View
//             style={[
//               styles.dayCircle,
//               isCompleted && styles.completedDay,
//               isToday && styles.todayDay,
//               isToday && isCompleted && styles.todayCompletedDay,
//               isSelected && styles.selectedDay,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.dayText,
//                 isSelected && styles.selectedDayText,
//               ]}
//             >
//               {day}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       );
//     }

//     return calendar;
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={{
//         paddingBottom: 120,
//       }}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* 달력 카드 */}
//       <View style={styles.calendarCard}>
//         {/* 월 이동 */}
//         <View style={styles.monthHeader}>
//           <TouchableOpacity
//             style={styles.arrowButton}
//             onPress={() => changeMonth('prev')}
//           >
//             <Ionicons name="chevron-back" size={24} color="#111827" />
//           </TouchableOpacity>

//           <Text style={styles.monthText}>
//             {currentYear}년 {currentMonth}월
//           </Text>

//           <TouchableOpacity
//             style={styles.arrowButton}
//             onPress={() => changeMonth('next')}
//           >
//             <Ionicons name="chevron-forward" size={24} color="#111827" />
//           </TouchableOpacity>
//         </View>

//         {/* 요일 */}
//         <View style={styles.weekRow}>
//           {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
//             <Text key={day} style={styles.weekText}>
//               {day}
//             </Text>
//           ))}
//         </View>

//         {/* 날짜 */}
//         <View style={styles.calendarGrid}>
//           {renderCalendar()}
//         </View>
//       </View>

//       {/* 독서 기록 섹션 */}
//       <View style={styles.recordSection}>
//         <Text style={styles.recordDate}>
//           {selectedDate.replaceAll('-', '.')} 읽은 책
//         </Text>

//         <View style={styles.bookCard}>
//           <View style={styles.bookImage} />
//           <View style={styles.bookInfo}>
//             <Text style={styles.bookTitle}>
//               {
//                 selectedHistory?.bookTitle ||
//                 '세상을 움직인 문장들'
//               }
//             </Text>
//             <Text style={styles.bookAuthor}>
//               {
//                 selectedHistory?.author ||
//                 '마크 트웨인'
//               }
//             </Text>
//           </View>
//         </View>

//         {/*  결과 다시보기 버튼 핸들러 부착 */}
//         <TouchableOpacity
//           style={[styles.resultButton, loading && { opacity: 0.7 }]}
//           onPress={handleFetchReadingResult}
//           disabled={loading}
//         >
//           <Text style={styles.resultButtonText}>
//             {loading ? '기록 로딩 중...' : '결과 다시보기'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F8FC',
//   },
//   calendarCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 32,
//     marginHorizontal: 20,
//     marginTop: 24,
//     paddingHorizontal: 18,
//     paddingVertical: 24,
//   },
//   monthHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 26,
//   },
//   arrowButton: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   monthText: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#111827',
//   },
//   weekRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 18,
//   },
//   weekText: {
//     width: 44,
//     textAlign: 'center',
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#6B7280',
//   },
//   calendarGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   dayButton: {
//     width: '14.28%',
//     height: 62,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   dayCircle: {
//     width: 42,
//     height: 42,
//     borderRadius: 999,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   completedDay: {
//     backgroundColor: '#DBEAFE',
//   },
//   todayDay: {
//     borderWidth: 2,
//     borderColor: '#1D4ED8',
//   },
//   todayCompletedDay: {
//     backgroundColor: '#DBEAFE',
//     borderWidth: 2,
//     borderColor: '#1D4ED8',
//   },
//   selectedDay: {
//     backgroundColor: '#2563EB',
//   },
//   dayText: {
//     fontSize: 16,
//     color: '#111827',
//   },
//   selectedDayText: {
//     color: '#FFFFFF',
//     fontWeight: '700',
//   },
//   recordSection: {
//     paddingHorizontal: 20,
//     marginTop: 32,
//     marginBottom: 40,
//   },
//   recordDate: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2563EB',
//     marginBottom: 18,
//   },
//   bookCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 18,
//   },
//   bookImage: {
//     width: 56,
//     height: 56,
//     borderRadius: 14,
//     backgroundColor: '#A7F3D0',
//     marginRight: 14,
//   },
//   bookInfo: {
//     flex: 1,
//   },
//   bookTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#111827',
//     marginBottom: 4,
//   },
//   bookAuthor: {
//     fontSize: 15,
//     color: '#6B7280',
//   },
//   resultButton: {
//     height: 58,
//     backgroundColor: '#DBEAFE',
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   resultButtonText: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2563EB',
//   },
// });
import { readingHistoryService } from '../../services/readingHistoryService';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

export default function ReadingRecordTab() {
  const navigation = useNavigation<any>(); 

  // 💡 실시간 시스템 시계 정합성에 기반한 2026년 5월 기본 스펙 최적화
  const [currentMonth, setCurrentMonth] = useState(5);
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState('2026-05-20');
  const [loading, setLoading] = useState(false); 
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<any>(null);

  const today = '2026-05-20'; // 💡 실시간 2026년 5월 오늘 날짜 매핑

  // 💡 월이 바뀌거나 마운트될 때 캘린더 완독 분포 데이터를 백엔드에서 동적으로 리로드
  useEffect(() => {
    fetchCalendarHistory();
  }, [currentMonth, currentYear]);

  const fetchCalendarHistory = async () => {
    try {
      const data = await readingHistoryService.getCalendarHistory(
        currentYear,
        currentMonth
      );
      if (data) {
        setCompletedDates(data.completedDates);
      }
    } catch (error) {
      console.error('캘린더 조회 실패:', error);
    }
  };

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

  const changeMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  // 결과 다시보기 클릭 시 백엔드 조회 후 ResultScreen 이동
  const handleFetchReadingResult = async () => {
    if (!completedDates.includes(selectedDate)) {
      Alert.alert('알림', '선택하신 날짜에는 저장된 독서 결과 기록이 없습니다.');
      return;
    }

    try {
      setLoading(true);
      const result = await readingHistoryService.getReadingResult(
        selectedHistory?.sessionId || 1
      );
      
      // 독서 결과 화면으로 정밀 실측 리포트 구조를 들고 안전하게 이동!
      navigation.navigate('Result', result);
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '과거 독서 데이터를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const renderCalendar = () => {
    const calendar = [];

    for (let i = 0; i < firstDay; i++) {
      calendar.push(<View key={`empty-${i}`} style={styles.dayButton} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const monthString = String(currentMonth).padStart(2, '0');
      const dayString = String(day).padStart(2, '0');
      const fullDate = `${currentYear}-${monthString}-${dayString}`;

      const isCompleted = completedDates.includes(fullDate);
      const isToday = fullDate === today;
      const isSelected = fullDate === selectedDate;

      calendar.push(
        <TouchableOpacity
          key={fullDate}
          style={styles.dayButton}
          onPress={async () => {
            setSelectedDate(fullDate);
            try {
              const history = await readingHistoryService.getHistoryByDate(fullDate);
              setSelectedHistory(history);
            } catch (error) {
              console.error('날짜별 기록 조회 실패:', error);
            }
          }}
        >
          <View
            style={[
              styles.dayCircle,
              isCompleted && styles.completedDay,
              isToday && styles.todayDay,
              isToday && isCompleted && styles.todayCompletedDay,
              isSelected && styles.selectedDay,
            ]}
          >
            <Text
              style={[
                styles.dayText,
                isSelected && styles.selectedDayText,
              ]}
            >
              {day}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return calendar;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* 달력 카드 */}
      <View style={styles.calendarCard}>
        {/* 월 이동 */}
        <View style={styles.monthHeader}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => changeMonth('prev')}
          >
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.monthText}>
            {currentYear}년 {currentMonth}월
          </Text>

          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => changeMonth('next')}
          >
            <Ionicons name="chevron-forward" size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* 요일 */}
        <View style={styles.weekRow}>
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <Text key={day} style={styles.weekText}>
              {day}
            </Text>
          ))}
        </View>

        {/* 날짜 */}
        <View style={styles.calendarGrid}>
          {renderCalendar()}
        </View>
      </View>

      {/* 독서 기록 섹션 */}
      <View style={styles.recordSection}>
        <Text style={styles.recordDate}>
          {selectedDate.replaceAll('-', '.')} 읽은 책
        </Text>

        <View style={styles.bookCard}>
          <View style={styles.bookImage} />
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>
              {
                selectedHistory?.bookTitle ||
                '오늘 배정된 추천 도서가 없습니다.'
              }
            </Text>
            <Text style={styles.bookAuthor}>
              {
                selectedHistory?.author ||
                'Deepflow 추천 피드'
              }
            </Text>
          </View>
        </View>

        {/* 결과 다시보기 버튼 핸들러 부착 */}
        <TouchableOpacity
          style={[styles.resultButton, loading && { opacity: 0.7 }]}
          onPress={handleFetchReadingResult}
          disabled={loading}
        >
          <Text style={styles.resultButtonText}>
            {loading ? '기록 로딩 중...' : '결과 다시보기'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    marginHorizontal: 20,
    marginTop: 24,
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 26,
  },
  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  weekText: {
    width: 44,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayButton: {
    width: '14.28%',
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayCircle: {
    width: 42,
    height: 42,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedDay: {
    backgroundColor: '#DBEAFE',
  },
  todayDay: {
    borderWidth: 2,
    borderColor: '#1D4ED8',
  },
  todayCompletedDay: {
    backgroundColor: '#DBEAFE',
    borderWidth: 2,
    borderColor: '#1D4ED8',
  },
  selectedDay: {
    backgroundColor: '#2563EB',
  },
  dayText: {
    fontSize: 16,
    color: '#111827',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  recordSection: {
    paddingHorizontal: 20,
    marginTop: 32,
    marginBottom: 40,
  },
  recordDate: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 18,
  },
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  bookImage: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#A7F3D0',
    marginRight: 14,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 15,
    color: '#6B7280',
  },
  resultButton: {
    height: 58,
    backgroundColor: '#DBEAFE',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
  },
});