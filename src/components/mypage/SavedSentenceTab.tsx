// import { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import { useSentenceStore } from '../../store/sentenceStore';
// import SavedSentenceCard from './SavedSentenceCard';

// type FilterType = 'latest' | 'date' | 'abc';

// export default function SavedSentenceTab() {
//   const [selectedType, setSelectedType] = useState<'image' | 'text'>('image');
//   const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);
//   const [currentFilter, setCurrentFilter] = useState<FilterType>('latest');

  
//   const savedSentences = useSentenceStore((state) => state.savedSentences);

//   const getSortedSentences = () => {
//     const filtered = savedSentences.filter(item => item.type === selectedType);

//     return [...filtered].sort((a, b) => {
//       if (currentFilter === 'latest') {
//         return b.id - a.id;
//       }
//       if (currentFilter === 'date') {
//         return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//       }
//       if (currentFilter === 'abc') {
//         return a.text.localeCompare(b.text, 'ko');
//       }
//       return 0;
//     });
//   };

//   const displayList = getSortedSentences();

//   return (
//     <View style={styles.container}>
      
//       {/* 상단 타입 선택 토글 바 */}
//       <View style={styles.toggleContainer}>
//         <View style={styles.toggleBackground}>
//           <TouchableOpacity
//             style={[
//               styles.toggleButton,
//               selectedType === 'image' && styles.activeToggleButton,
//             ]}
//             onPress={() => setSelectedType('image')}
//           >
//             <Text style={[styles.toggleText, selectedType === 'image' && styles.activeToggleText]}>
//               Image
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.toggleButton,
//               selectedType === 'text' && styles.activeToggleButton,
//             ]}
//             onPress={() => setSelectedType('text')}
//           >
//             <Text style={[styles.toggleText, selectedType === 'text' && styles.activeToggleText]}>
//               Text
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* 필터 행 */}
//       <View style={styles.filterRow}>
//         {[
//           { label: '최신순', value: 'latest' },
//           { label: '날짜순', value: 'date' },
//           { label: '가나다순', value: 'abc' },
//         ].map((filter) => (
//           <TouchableOpacity
//             key={filter.value}
//             style={[
//               styles.filterButton,
//               currentFilter === filter.value && styles.activeFilterButton,
//             ]}
//             onPress={() => setCurrentFilter(filter.value as FilterType)}
//           >
//             <Text
//               style={[
//                 styles.filterButtonText,
//                 currentFilter === filter.value && styles.activeFilterButtonText,
//               ]}
//             >
//               {filter.label}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* 저장 문장 리스트 출력 영역 */}
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {displayList.length === 0 ? (
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>저장된 문장이 없습니다.</Text>
//           </View>
//         ) : (
//           displayList.map((item) => (
//             <SavedSentenceCard
//               key={item.id}
//               item={item}
//               selectedType={selectedType}
              
//               menuVisible={visibleMenuId === item.id}
//               setMenuVisible={(visible) =>
//                 setVisibleMenuId(visible ? item.id : null)
//               }
//             />
//           ))
//         )}
//       </ScrollView>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F8FC',
//   },
//   toggleContainer: {
//     paddingHorizontal: 20,
//     marginTop: 16,
//     alignItems: 'center',
//   },
//   toggleBackground: {
//     flexDirection: 'row',
//     backgroundColor: '#EFF2F9',
//     borderRadius: 16,
//     padding: 4,
//     width: '100%',
//     height: 48,
//   },
//   toggleButton: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 12,
//   },
//   activeToggleButton: {
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   toggleText: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#6B7280',
//   },
//   activeToggleText: {
//     color: '#1F2937',
//     fontWeight: '700',
//   },
//   filterRow: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     marginTop: 16,
//     marginBottom: 14,
//   },
//   filterButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: '#E5E7EB',
//     marginRight: 8,
//   },
//   activeFilterButton: {
//     backgroundColor: '#2563EB',
//   },
//   filterButtonText: {
//     fontSize: 13,
//     fontWeight: '500',
//     color: '#4B5563',
//   },
//   activeFilterButtonText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 100,
//   },
//   emptyContainer: {
//     marginTop: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 15,
//     color: '#9CA3AF',
//   },
// });
// import { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';
// import { API_CONFIG } from '../../config/apiConfig'; // 💡 MOCK 모드 스위치 연동
// import { useSentenceStore } from '../../store/sentenceStore'; // 💡 Zustand 바구니 감시 카메라
// import { sentenceService, SavedSentenceItem } from '../../services/sentenceService';
// import SavedSentenceCard from './SavedSentenceCard';

// type FilterType = 'latest' | 'date' | 'abc';

// export default function SavedSentenceTab() {
//   const [selectedType, setSelectedType] = useState<'image' | 'text'>('image');
//   const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);
//   const [currentFilter, setCurrentFilter] = useState<FilterType>('latest');
  
//   const [sentences, setSentences] = useState<SavedSentenceItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // 💡 홈 피드에서 북마크 눌렀을 때 담기는 로컬 전역 상자 실시간 수급
//   const savedSentences = useSentenceStore((state) => state.savedSentences);

//   // 🌐 저장한 문장 목록 수급 함수
//   const loadSavedSentences = async () => {
//     try {
//       setLoading(true);

//       // 🛡️ [MOCK 모드 쉴드] 백엔드 정석 타입(SavedSentenceItem) 규격 완벽 상속 및 쉴드
//       if (API_CONFIG.USE_MOCK) {
//         // 1. 기본 덤프 가짜 데이터
//         const baseMockItems: SavedSentenceItem[] = [
//           {
//             id: 9991,
//             groupId: 9991, // 🎯 필수 추가
//             type: 'image',
//             sentenceId: 7,
//             sessionId: 3,
//             content: "책은 마음을 비추는 거울이다.",
//             bookTitle: "어린 왕자",
//             author: "앙투안 드 생텍쥐페리",
//             imageUrl: "https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png",
//             fontFamily: "NANUM_MYEONGJO",
//             fontSize: 18,
//             savedAt: "2026-05-19T10:32:47.4182"
//           }
//         ];

//         // 2. 🎯 [해결 치트키] 
//         // string | undefined 시비를 끄기 위해 이미지가 없는 텍스트 타입 카드여도
//         // undefined 대신 빈 문자열 ""을 강제로 꽂아 string 형식을 완벽하게 맞춰줍니다!
//         const mappedSavedItems: SavedSentenceItem[] = savedSentences.map((s: any) => ({
//           id: s.id,
//           groupId: s.groupId || s.id,
//           type: s.type || (s.imageUrl ? 'image' : 'text'),
//           sentenceId: s.id + 100, 
//           sessionId: 3,
//           content: s.text, 
//           bookTitle: '오늘의 저장 문구',
//           author: s.author,
//           // 🔥 undefined 대신 빈 문자열("") 주입으로 TypeScript 시비 원천 차단!
//           imageUrl: s.type === 'image' ? 'https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png' : '',
//           fontFamily: s.font || "NANUM_MYEONGJO",
//           fontSize: s.fontSize || 18,
//           savedAt: s.createdAt || new Date().toISOString()
//         }));

//         // 이제 타입 가드가 완벽히 일치하므로 에러 없이 깔끔하게 통과!
//         setSentences([...baseMockItems, ...mappedSavedItems]);
//         return; 
//       }

//       // 🌐 실서버 모드 API
//       const data = await sentenceService.getMySentences('all', 'latest');
//       const processedData: SavedSentenceItem[] = data.map((item: any) => ({
//         ...item,
//         type: item.type || (item.imageUrl ? 'image' : 'text'), // 타입 강제 주입
//         groupId: item.groupId || item.id // groupId 보정
//       }));

//       setSentences(processedData);
//       //setSentences(data);
//     } catch (error) {
//       console.error('저장한 문장 목록 불러오기 실패:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // 💡 홈에서 문장을 저장해서 바구니 내용이 바뀔 때마다 실시간으로 보관함 자동 새로고침!
//   useEffect(() => {
//     loadSavedSentences();
//   }, [savedSentences, selectedType]); 

//   // 📊 다현님의 소중한 3대 정렬 알고리즘 스펙 결합
//   const getSortedSentences = () => {
//     // const filtered = sentences.filter(item => {
//     //   if (selectedType === 'image') return !!item.imageUrl;
//     //   return !item.imageUrl;
//     // });
//     const allData = [...sentences, ...savedSentences];
//     const filtered = sentences.filter(item => {
//       const itemType = item.type || (item.imageUrl && item.imageUrl !== '' ? 'image' : 'text');
//       return item.type === selectedType;
//     })

//     return [...filtered].sort((a, b) => {
//       if (currentFilter === 'latest') {
        
//         return b.id - a.id;
//       }
//       if (currentFilter === 'date') {
//         return new Date(a.savedAt || '').getTime() - new Date(b.savedAt || '').getTime();
//       }
//       if (currentFilter === 'abc') {
//         return (a.content || '').localeCompare(b.content || '', 'ko');
//       }
//       return 0;
//     });
//   };

//   const displayList = getSortedSentences();

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F8FC' }}>
//         <ActivityIndicator size="large" color="#2563EB" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* 상단 타입 선택 토글 바 */}
//       <View style={styles.toggleContainer}>
//         <View style={styles.toggleBackground}>
//           <TouchableOpacity
//             style={[styles.toggleButton, selectedType === 'image' && styles.activeToggleButton]}
//             onPress={() => setSelectedType('image')}
//           >
//             <Text style={[styles.toggleText, selectedType === 'image' && styles.activeToggleText]}>Image</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.toggleButton, selectedType === 'text' && styles.activeToggleButton]}
//             onPress={() => setSelectedType('text')}
//           >
//             <Text style={[styles.toggleText, selectedType === 'text' && styles.activeToggleText]}>Text</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* 필터 행 */}
//       <View style={styles.filterRow}>
//         {[
//           { label: '최신순', value: 'latest' },
//           { label: '날짜순', value: 'date' },
//           { label: '가나다순', value: 'abc' },
//         ].map((filter) => (
//           <TouchableOpacity
//             key={filter.value}
//             style={[styles.filterButton, currentFilter === filter.value && styles.activeFilterButton]}
//             onPress={() => setCurrentFilter(filter.value as FilterType)}
//           >
//             <Text style={[styles.filterButtonText, currentFilter === filter.value && styles.activeFilterButtonText]}>
//               {filter.label}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* 저장 문장 리스트 출력 영역 */}
//       <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
//         {displayList.length === 0 ? (
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>저장된 문장이 없습니다.</Text>
//           </View>
//         ) : (
//           displayList.map((item, index) => (
//             <SavedSentenceCard
//               key={`${item.id}-${index}`}
//               item={item}
//               selectedType={selectedType}
//               menuVisible={visibleMenuId === item.id}
//               setMenuVisible={(visible: boolean) => setVisibleMenuId(visible ? item.id : null)}
//               onRefreshList={loadSavedSentences} // 💡 삭제 시 동기화 새로고침 콜백 연동
//             />
//           ))
//         )}
//       </ScrollView>
//     </View>
//   );
// }

import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { API_CONFIG } from '../../config/apiConfig';
import { useSentenceStore } from '../../store/sentenceStore';
import { sentenceService, SavedSentenceItem } from '../../services/sentenceService';
import SavedSentenceCard from './SavedSentenceCard';

type FilterType = 'latest' | 'date' | 'abc';

export default function SavedSentenceTab() {
  const [selectedType, setSelectedType] = useState<'image' | 'text'>('image');
  const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('latest');
  
  const [sentences, setSentences] = useState<SavedSentenceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const savedSentences = useSentenceStore((state) => state.savedSentences);

  const loadSavedSentences = async () => {
    try {
      setLoading(true);
      let serverData: SavedSentenceItem[] = [];

      if (!API_CONFIG.USE_MOCK) {
        try {
          const response = await sentenceService.getMySentences('all', 'latest');
          console.log("받아온 API 응답 확인:", response);
          // 서버 응답이 배열인지 확인 후 매핑
          const responseAny = response as any;
          const rawData = Array.isArray(responseAny) ? responseAny : (responseAny.data || []);
          serverData = rawData.map((item: any) => ({
            ...item,
            type: item.type || (item.imageUrl && item.imageUrl !== '' ? 'image' : 'text'),
            groupId: item.groupId || item.id,
            content: item.content || item.text || ''
          }));
        } catch (e) {
          console.error("실서버 데이터 로드 실패:", e);
        }
      }

      // 로컬 스토어 데이터 매핑
      const localData: SavedSentenceItem[] = savedSentences.map((s: any) => ({
        id: s.id,
        groupId: s.groupId || s.id,
        type: s.type || (s.imageUrl ? 'image' : 'text'),
        sentenceId: s.id + 100,
        sessionId: 3,
        content: s.text || s.content || '',
        bookTitle: s.bookTitle || '오늘의 저장 문구',
        author: s.author || '작자 미상',
        imageUrl: s.imageUrl || '',
        fontFamily: s.font || "NANUM_MYEONGJO",
        fontSize: s.fontSize || 18,
        savedAt: s.createdAt || new Date().toISOString()
      }));

      // 🎯 서버 + 로컬 전체 합치기
      setSentences([...serverData, ...localData]);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedSentences();
  }, [savedSentences, selectedType]); 

  const getSortedSentences = () => {
    // 🎯 합쳐진 sentences 상태를 사용하여 필터링
    const filtered = sentences.filter(item => item.type === selectedType);

    return [...filtered].sort((a, b) => {
      if (currentFilter === 'latest') return b.id - a.id;
      if (currentFilter === 'date') return new Date(a.savedAt || '').getTime() - new Date(b.savedAt || '').getTime();
      if (currentFilter === 'abc') return (a.content || '').localeCompare(b.content || '', 'ko');
      return 0;
    });
  };

  const displayList = getSortedSentences();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F8FC' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <View style={styles.toggleBackground}>
          <TouchableOpacity
            style={[styles.toggleButton, selectedType === 'image' && styles.activeToggleButton]}
            onPress={() => setSelectedType('image')}
          >
            <Text style={[styles.toggleText, selectedType === 'image' && styles.activeToggleText]}>Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, selectedType === 'text' && styles.activeToggleButton]}
            onPress={() => setSelectedType('text')}
          >
            <Text style={[styles.toggleText, selectedType === 'text' && styles.activeToggleText]}>Text</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filterRow}>
        {[
          { label: '최신순', value: 'latest' },
          { label: '날짜순', value: 'date' },
          { label: '가나다순', value: 'abc' },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.value}
            style={[styles.filterButton, currentFilter === filter.value && styles.activeFilterButton]}
            onPress={() => setCurrentFilter(filter.value as FilterType)}
          >
            <Text style={[styles.filterButtonText, currentFilter === filter.value && styles.activeFilterButtonText]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {displayList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>저장된 문장이 없습니다.</Text>
          </View>
        ) : (
          displayList.map((item, index) => (
            <SavedSentenceCard
              key={`${item.id}-${index}`}
              item={item}
              selectedType={selectedType}
              menuVisible={visibleMenuId === item.id}
              setMenuVisible={(visible: boolean) => setVisibleMenuId(visible ? item.id : null)}
              onRefreshList={loadSavedSentences}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
// (Styles는 기존과 동일)

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FC' },
  toggleContainer: { paddingHorizontal: 20, marginTop: 16, alignItems: 'center' },
  toggleBackground: { flexDirection: 'row', backgroundColor: '#EFF2F9', borderRadius: 16, padding: 4, width: '100%', height: 48 },
  toggleButton: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
  activeToggleButton: { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  toggleText: { fontSize: 15, fontWeight: '500', color: '#6B7280' },
  activeToggleText: { color: '#1F2937', fontWeight: '700' },
  filterRow: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 16, marginBottom: 14 },
  filterButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#E5E7EB', marginRight: 8 },
  activeFilterButton: { backgroundColor: '#2563EB' },
  filterButtonText: { fontSize: 13, fontWeight: '500', color: '#4B5563' },
  activeFilterButtonText: { color: '#FFFFFF', fontWeight: '600' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  emptyContainer: { marginTop: 100, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 15, color: '#9CA3AF' },
});