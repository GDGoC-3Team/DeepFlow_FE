// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

// export default function ResultScreen() {
//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();

//   // params 구조 안정성 및 기본값 가드 예외 처리 완료
//   const {
//     totalReadingTime = 0,
//     pageTimes = {},
//     pageOrder = [],
//     movedBackPages = [],
//     highlights = [],
//     readingData = [],
//   } = route.params || {};

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
        
//         {/* 헤더 */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="chevron-back" size={26} color="#111827" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>독서 결과</Text>
//         </View>

//         {/* 집중도 분석 */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>집중도 분석</Text>
//             <View style={styles.legendRow}>
//               <View style={styles.legendDot} />
//               <Text style={styles.legendText}>체류 시간</Text>
//             </View>
//           </View>

//           <View style={styles.chartCard}>
//             <View style={styles.chartContainer}>
//               {(Object.values(pageTimes) as number[]).map(
//                 (
//                   height: number, 
//                   index: number
//                 ) => (
//                 <View key={index} style={styles.barWrapper}>
//                   <View
//                     style={[
//                       styles.bar,
//                       {
//                         height: 120 * 
//                         (
//                           height /
//                           Math.max(...(Object.values(pageTimes) as number[]), 1)
//                         ),
//                         opacity: index === 2 ? 1 : 0.55,
//                       },
//                     ]}
//                   />
//                   <Text style={styles.barLabel}>{index + 1}p</Text>
                  
//                   {/* 가드 처리를 입혀서 연동 시 undefined 에러를 원천 차단 */}
//                   <Text style={styles.barTime}>
//                     {readingData[index]?.textLength || 0}자
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         </View>

//         {/* 집중 흔들린 구간 */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>집중이 흔들린 구간</Text>
//           <View style={styles.warningCard}>
//             <View style={styles.warningTop}>
//               <Ionicons name="alert-circle" size={22} color="#DC2626" />
//               <Text style={styles.warningTitle}>4페이지 주의 필요</Text>
//             </View>
//             <Text style={styles.warningText}>
//               4페이지는 텍스트 양에 비해 읽는 시간이 너무 짧았습니다. 중요한
//               내용을 놓쳤을 가능성이 있으니 다시 한 번 훑어보시는 것을
//               추천드려요.
//             </Text>
//           </View>
//         </View>

//         {/* 표시된 문장들 */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>표시된 문장들</Text>
          
//           {highlights.length === 0 ? (

//             <Text
//               style={{
//                 marginTop: 20,
//                 color: '#9CA3AF',
//               }}
//             >
//               표시된 문장이 없습니다.
//             </Text>

//           ) : (

//             highlights.map(
//               (
//                 item: any,
//                 index: number
//               ) => (

//                 <View
//                   key={index}
//                   style={styles.highlightCard}
//                 >

//                   <View style={styles.pageBadge}>
//                     <Text
//                       style={
//                         styles.pageBadgeText
//                       }
//                     >
//                       PAGE {item.page || index + 1}
//                     </Text>
//                   </View>

//                   <Text
//                     style={
//                       styles.highlightSentence
//                     }
//                   >
//                     {
//                       item.text ||
//                       item
//                     }
//                   </Text>

//                 </View>
//               )
//             )
//           )}
//         </View>

//         {/* 하단 버튼 */}
//         <TouchableOpacity
//           style={styles.homeButton}
//           onPress={() => navigation.reset({
//             index: 0,
//             routes:[
//               { name: 'MainTabs', 
//                 params: {screen: 'Home',

//                 },
//               },
//             ],
          
          
//         })
//       }
//         >
//           <Text style={styles.homeButtonText}>홈으로 돌아가기</Text>
//         </TouchableOpacity>

//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F8FC',
//   },
//   header: {
//     height: 68,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//     backgroundColor: '#F7F8FC',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#111827',
//     marginLeft: 12,
//   },
//   section: {
//     marginTop: 34,
//     paddingHorizontal: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#111827',
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   legendRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   legendDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#7EA6FF',
//     marginRight: 6,
//   },
//   legendText: {
//     fontSize: 12,
//     color: '#9CA3AF',
//     fontWeight: '500',
//   },
//   chartCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 28,
//     paddingTop: 28,
//     paddingBottom: 22,
//     paddingHorizontal: 18,
//     borderWidth: 1,
//     borderColor: '#EEF2F7',
//   },
//   chartContainer: {
//     height: 180,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'flex-end',
//   },
//   barWrapper: {
//     alignItems: 'center',
//   },
//   bar: {
//     width: 26,
//     borderRadius: 10,
//     backgroundColor: '#7EA6FF',
//     marginBottom: 10,
//   },
//   barLabel: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   barTime: {
//     fontSize: 10,
//     color: '#9CA3AF',
//   },
//   warningCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 28,
//     padding: 24,
//     marginTop: 16,
//     borderLeftWidth: 4,
//     borderLeftColor: '#EF4444',
//     borderWidth: 1,
//     borderColor: '#EEF2F7',
//   },
//   warningTop: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 14,
//   },
//   warningTitle: {
//     fontSize: 17,
//     fontWeight: '700',
//     color: '#111827',
//     marginLeft: 10,
//   },
//   warningText: {
//     fontSize: 15,
//     lineHeight: 28,
//     color: '#6B7280',
//   },
//   highlightCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 28,
//     padding: 24,
//     marginTop: 16,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#EEF2F7',
//     position: 'relative',
//   },
//   pageBadge: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#EEF2FF',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 999,
//   },
//   pageBadgeText: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: '#2563EB',
//   },
//   highlightSentence: {
//     marginTop: 18,
//     fontSize: 18,
//     lineHeight: 40,
//     color: '#111827',
//     backgroundColor: 'rgba(37,99,235,0.1)',
//   },
//   moreButton: {
//     position: 'absolute',
//     right: 18,
//     bottom: 18,
//   },
//   homeButton: {
//     height: 62,
//     backgroundColor: '#2563EB',
//     borderRadius: 22,
//     marginHorizontal: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 12,
//     marginBottom: 44,
//   },
//   homeButtonText: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#FFFFFF',
//   },
// });
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ResultScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // params 구조 안정성 및 기본값 가드 예외 처리 완료
  const {
    totalReadingTime = 0,
    pageTimes = {},
    pageOrder = [],
    movedBackPages = [],
    highlights = [],
    readingData = [],
  } = route.params || {};

  // 📊 차트 렌더링에 필요한 수치 안전화 및 최댓값 추출
  const pageTimeValues = (Object.values(pageTimes) as number[]) || [];
  const maxPageTime = Math.max(...pageTimeValues, 1);

  // 💡 실시간 집중도 매핑: 각 페이지별 '글자당 체류 시간'을 계산해 가장 오래 머문 핵심 페이지 인덱스를 찾습니다.
  let maxFocusIndex = 0;
  let maxSecondsPerChar = 0;
  
  pageTimeValues.forEach((time, idx) => {
    const charCount = readingData[idx]?.textLength || 1;
    const secondsPerChar = time / charCount;
    if (secondsPerChar > maxSecondsPerChar) {
      maxSecondsPerChar = secondsPerChar;
      maxFocusIndex = idx;
    }
  });

  // 🚨 주의 필요 구간 동적 할당: 사용자가 뒤로 돌아가서 다시 읽었거나(movedBackPages), 
  // 혹은 텍스트 양 대비 체류 시간이 가장 짧았던 소외 페이지를 동적으로 추출합니다.
  const warningPage = movedBackPages.length > 0 
    ? movedBackPages[0] 
    : (pageTimeValues.indexOf(Math.min(...pageTimeValues)) + 1 || 4);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>독서 결과</Text>
        </View>

        {/* 집중도 분석 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>집중도 분석</Text>
            <View style={styles.legendRow}>
              <View style={styles.legendDot} />
              <Text style={styles.legendText}>체류 시간</Text>
            </View>
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartContainer}>
              {pageTimeValues.map(
                (
                  height: number, 
                  index: number
                ) => (
                <View key={index} style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      {
                        // 💡 기존 120 높이 기준 다현님 공식 정밀 이식
                        height: 120 * (height / maxPageTime),
                        // 💡 몰입 패턴 분석에 따라 가장 딥하게 읽은 기둥을 하이라이팅(투명도 1) 합니다.
                        opacity: index === maxFocusIndex ? 1 : 0.55,
                      },
                    ]}
                  />
                  <Text style={styles.barLabel}>{index + 1}p</Text>
                  
                  {/* 가드 처리를 입혀서 연동 시 undefined 에러를 원천 차단 */}
                  <Text style={styles.barTime}>
                    {readingData[index]?.textLength || 0}자
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 집중 흔들린 구간 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>집중이 흔들린 구간</Text>
          <View style={styles.warningCard}>
            <View style={styles.warningTop}>
              <Ionicons name="alert-circle" size={22} color="#DC2626" />
              <Text style={styles.warningTitle}>{warningPage}페이지 주의 필요</Text>
            </View>
            <Text style={styles.warningText}>
              {warningPage}페이지는 텍스트 양에 비해 읽는 시간이 다소 차이가 있었거나, 
              흐름을 놓쳐 다시 되돌아가 확인한 정황이 발견되었습니다. 중요한 
              내용을 놓쳤을 가능성이 있으니 다시 한 번 훑어보시는 것을 
              추천드려요.
            </Text>
          </View>
        </View>

        {/* 표시된 문장들 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>표시된 문장들</Text>
          
          {highlights.length === 0 ? (
            <Text
              style={{
                marginTop: 20,
                color: '#9CA3AF',
              }}
            >
              표시된 문장이 없습니다.
            </Text>
          ) : (
            highlights.map(
              (
                item: any,
                index: number
              ) => (
                <View
                  key={index}
                  style={styles.highlightCard}
                >
                  <View style={styles.pageBadge}>
                    <Text
                      style={
                        styles.pageBadgeText
                      }
                    >
                      PAGE {item.page || index + 1}
                    </Text>
                  </View>

                  <Text
                    style={
                      styles.highlightSentence
                    }
                  >
                    {
                      item.text ||
                      item.highlightedText || // 스펙 유연성 확보
                      item
                    }
                  </Text>
                </View>
              )
            )
          )}
        </View>

        {/* 하단 버튼 */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.reset({
            index: 0,
            routes:[
              { name: 'MainTabs', 
                params: {screen: 'Home'},
              },
            ],
          })}
        >
          <Text style={styles.homeButtonText}>홈으로 돌아가기</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  header: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#F7F8FC',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 12,
  },
  section: {
    marginTop: 34,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7EA6FF',
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingTop: 28,
    paddingBottom: 22,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },
  chartContainer: {
    height: 180,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  barWrapper: {
    alignItems: 'center',
  },
  bar: {
    width: 26,
    borderRadius: 10,
    backgroundColor: '#7EA6FF',
    marginBottom: 10,
  },
  barLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 4,
  },
  barTime: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  warningCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },
  warningTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  warningTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 10,
  },
  warningText: {
    fontSize: 15,
    lineHeight: 28,
    color: '#6B7280',
  },
  highlightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    marginTop: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    position: 'relative',
  },
  pageBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  pageBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  highlightSentence: {
    marginTop: 18,
    fontSize: 18,
    lineHeight: 40,
    color: '#111827',
    backgroundColor: 'rgba(37,99,235,0.1)',
  },
  moreButton: {
    position: 'absolute',
    right: 18,
    bottom: 18,
  },
  homeButton: {
    height: 62,
    backgroundColor: '#2563EB',
    borderRadius: 22,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 44,
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});