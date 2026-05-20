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
//       setSentences(data);
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
//     const filtered = sentences.filter(item => {
//       if (selectedType === 'image') return !!item.imageUrl;
//       return !item.imageUrl;
//     });

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

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F7F8FC' },
//   toggleContainer: { paddingHorizontal: 20, marginTop: 16, alignItems: 'center' },
//   toggleBackground: { flexDirection: 'row', backgroundColor: '#EFF2F9', borderRadius: 16, padding: 4, width: '100%', height: 48 },
//   toggleButton: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
//   activeToggleButton: { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
//   toggleText: { fontSize: 15, fontWeight: '500', color: '#6B7280' },
//   activeToggleText: { color: '#1F2937', fontWeight: '700' },
//   filterRow: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 16, marginBottom: 14 },
//   filterButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#E5E7EB', marginRight: 8 },
//   activeFilterButton: { backgroundColor: '#2563EB' },
//   filterButtonText: { fontSize: 13, fontWeight: '500', color: '#4B5563' },
//   activeFilterButtonText: { color: '#FFFFFF', fontWeight: '600' },
//   scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
//   emptyContainer: { marginTop: 100, justifyContent: 'center', alignItems: 'center' },
//   emptyText: { fontSize: 15, color: '#9CA3AF' },
// });
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

  // 로컬 전역 스토어 연동 유지
  const savedSentences = useSentenceStore((state) => state.savedSentences);

  // 🌐 백엔드 실서버 규격 및 MOCK 통합 수급 함수
  // const loadSavedSentences = async () => {
  //   try {
  //     setLoading(true);

  //     // 🛡️ [MOCK 모드 쉴드]
  //     if (API_CONFIG.USE_MOCK) {
  //       const baseMockItems: SavedSentenceItem[] = [
  //         {
  //           id: 9991,
  //           sentenceId: 7,
  //           sessionId: 3,
  //           content: "책은 마음을 비추는 거울이다.",
  //           bookTitle: "어린 왕자",
  //           author: "앙투안 드 생텍쥐페리",
  //           imageUrl: "https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png",
  //           fontFamily: "NANUM_MYEONGJO",
  //           fontSize: 18,
  //           savedAt: "2026-05-19T10:32:47.418Z"
  //         }
  //       ];

  //       const mappedSavedItems: SavedSentenceItem[] = savedSentences.map((s: any) => ({
  //         id: s.id,
  //         sentenceId: s.id + 100, 
  //         sessionId: 3,
  //         content: s.text, 
  //         bookTitle: '오늘의 저장 문구',
  //         author: s.author,
  //         imageUrl: s.type === 'image' ? 'https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png' : '',
  //         fontFamily: s.font || "NANUM_MYEONGJO",
  //         fontSize: s.fontSize || 18,
  //         savedAt: s.createdAt || new Date().toISOString()
  //       }));

  //       setSentences([...baseMockItems, ...mappedSavedItems]);
  //       return; 
  //     }

  //     // 🌐 [실서버] Swagger 3페이지 공식 연동 규격 가동
  //     const data = await sentenceService.getMySentences('all', 'latest');
  //     if (data) {
  //       setSentences(data);
  //     }
  //   } catch (error) {
  //     console.error('❌ 저장한 문장 목록 불러오기 실패:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // 📝 src/components/home/SavedSentenceTab.tsx 내부 loadSavedSentences 함수 수정

  // 🌐 백엔드 실서버 규격 및 MOCK 통합 수급 함수
  const loadSavedSentences = async () => {
    try {
      setLoading(true);

      // 🛡️ [MOCK 모드 쉴드] 
      if (API_CONFIG.USE_MOCK) {
        const baseMockItems: SavedSentenceItem[] = [
          {
            id: 9991,
            sentenceId: 7,
            sessionId: 3,
            content: "책은 마음을 비추는 거울이다.",
            bookTitle: "어린 왕자",
            author: "앙투안 드 생텍쥐페리",
            imageUrl: "https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png",
            fontFamily: "NANUM_MYEONGJO",
            fontSize: 18,
            savedAt: "2026-05-19T10:32:47.418Z"
          }
        ];

        const mappedSavedItems: SavedSentenceItem[] = savedSentences.map((s: any) => ({
          id: s.id,
          sentenceId: s.id + 100, 
          sessionId: 3,
          content: s.text, 
          bookTitle: '오늘의 저장 문구',
          author: s.author,
          imageUrl: s.type === 'image' ? 'https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png' : '',
          fontFamily: s.font || "NANUM_MYEONGJO",
          fontSize: s.fontSize || 18,
          savedAt: s.createdAt || new Date().toISOString()
        }));

        setSentences([...baseMockItems, ...mappedSavedItems]);
        return; 
      }

      // 🌐 [실서버 모드 완치 완벽 연동] 
      // MyPageScreen에서 이미 서버 데이터를 받아 가공해 둔 Zustand 상자(savedSentences)를 1순위로 사용합니다.
      if (savedSentences && savedSentences.length > 0) {
        const mappedServerItems: SavedSentenceItem[] = savedSentences.map((s: any) => ({
          id: s.id,
          sentenceId: s.sentenceId || s.id,
          sessionId: s.sessionId || 1,
          content: s.text || s.content, // 가공 단계의 text 필드를 content로 매핑
          bookTitle: s.bookTitle || '저장한 문장피드',
          author: s.author,
          // 🔥 가공된 객체의 type 속성이 'image'라면 강제로 디폴트 고래 배경 주소를 꽂아 
          // 아래 getSortedSentences의 필터링을 무사히 프리패스 하도록 처리합니다!
          imageUrl: s.type === 'image' ? (s.imageUrl || 'https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png') : '',
          fontFamily: s.font || "NANUM_MYEONGJO",
          fontSize: s.fontSize || 18,
          savedAt: s.savedAt || s.createdAt || new Date().toISOString()
        }));

        setSentences(mappedServerItems);
      } else {
        // 스토어가 비어있을 때만 백업용으로 서버에서 직접 패치 시도
        const data = await sentenceService.getMySentences('all', 'latest');
        if (data) {
          setSentences(data);
        }
      }
    } catch (error) {
      console.error('❌ 저장한 문장 목록 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 보관함 실시간 감시 바인딩
  useEffect(() => {
    loadSavedSentences();
  }, [savedSentences, selectedType]); 

  // 📊 다현님의 소중한 3대 정렬 알고리즘 완벽 작동 구역
  const getSortedSentences = () => {
    const filtered = sentences.filter(item => {
      // imageUrl이 유효하게 있으면 이미지형, 빈 문자열이거나 없으면 텍스트형으로 분류
      if (selectedType === 'image') return !!item.imageUrl && item.imageUrl.trim() !== '';
      return !item.imageUrl || item.imageUrl.trim() === '';
    });

    return [...filtered].sort((a, b) => {
      if (currentFilter === 'latest') {
        return b.id - a.id; // 최신순 정렬
      }
      if (currentFilter === 'date') {
        return new Date(a.savedAt || '').getTime() - new Date(b.savedAt || '').getTime(); // 날짜순 정렬
      }
      if (currentFilter === 'abc') {
        return (a.content || '').localeCompare(b.content || '', 'ko'); // 가나다순 정렬
      }
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
      {/* 🔄 상단 Image / Text 전환 토글 컨테이너 */}
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

      {/* 🗂️ 최신순 / 날짜순 / 가나다순 필터 버튼 로우 */}
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

      {/* 📑 저장 문장 리스트 스크롤 렌더링 영역 */}
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