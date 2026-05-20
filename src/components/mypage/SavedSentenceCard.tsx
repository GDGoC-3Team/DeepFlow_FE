// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image'; // TypeScript 에러 방지를 위해 expo-image 반영
// import { useSentenceStore } from '../../store/sentenceStore'; // 👈 스토어 훅 임포트

// type Props = {
//   item: any;
//   selectedType: 'image' | 'text';
//   menuVisible: boolean;
//   setMenuVisible: (visible: boolean) => void;
// };

// export default function SavedSentenceCard({
//   item,
//   selectedType,
//   menuVisible,
//   setMenuVisible,
// }: Props) {
//   // 전역 스토어에서 전체 삭제용 액션 함수 가져오기
//   const removeSentenceByText = useSentenceStore((state) => state.removeSentenceByText);

//   const formattedDate = item.createdAt
//     ? new Date(item.createdAt).toLocaleDateString('ko-KR', {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//       }).replace(/\s/g, '').slice(0, -1)
//     : '2025.05.06';

//   const author = item.author || '마크 트웨인';
//   const bookTitle = item.bookTitle || '세상을 움직인 문장들';

//   // 👈 삭제 버튼 누를 때 실행될 공통 세트 삭제 헬퍼
//   const handleDelete = () => {
//     removeSentenceByText(item.text); // 똑같은 텍스트를 가진 이미지/텍스트 카드 동시 제거
//     setMenuVisible(false); // 드롭다운 닫기
//   };

//   return (
//     <View style={[styles.card, selectedType === 'text' && styles.textCardContainer]}>
      
//       {/* IMAGE 타입 헤더 */}
//       {selectedType === 'image' && (
//         <View style={styles.cardHeader}>
//           <View style={styles.headerLeft}>
//             <View style={styles.logoWrapper}>
//               <Image
//                 source={require('../../../assets/logo.png')}
//                 style={styles.logo}
//                 resizeMode="contain"
//               />
//             </View>
//             <View>
//               <Text style={styles.savedTitle}>저장된 문장</Text>
//               <Text style={styles.savedDate}>{formattedDate}</Text>
//             </View>
//           </View>
//           <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
//             <Ionicons name="ellipsis-horizontal" size={20} color="#6B7280" />
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* 조절된 드롭다운 메뉴 */}
//       {menuVisible && (
//         <View style={[styles.dropdown, selectedType === 'text' && styles.textDropdownPosition]}>
//           <TouchableOpacity style={styles.dropdownItem} onPress={handleDelete}>
//             <Text style={styles.dropdownText}>삭제</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* 카드 본문 분기 조절 */}
//       {selectedType === 'image' ? (
//         /* IMAGE 타입 */
//         <View style={styles.imageCard}>
//           <Image
//             source={require('../../../assets/logo.png')}
//             style={styles.backgroundImage}
//             resizeMode="cover"
//           />
//           <TouchableOpacity style={styles.bookmark}>
//             <Ionicons name="bookmark" size={24} color="#2563EB" />
//           </TouchableOpacity>
//           <Text
//             style={[
//               styles.imageSentence,
//               {
//                 textAlign: item.textAlign || 'center',
//                 fontSize: item.fontSize || 24,
//               },
//             ]}
//           >
//             {item.text}
//           </Text>
//         </View>
//       ) : (
//         /* TEXT 타입 */
//         <View style={styles.textCardContent}>
//           <Text
//             style={[
//               styles.textSentence,
//               {
//                 textAlign: item.textAlign || 'left',
//                 fontSize: 17,
//                 fontFamily: item.font || 'Kopub',
//               },
//             ]}
//           >
//             "{item.text}"
//           </Text>

//           <View style={styles.textCardFooter}>
//             <Text style={styles.metaText} numberOfLines={1}>
//               <Text style={styles.metaAuthor}>{author}</Text>
//               {` · ${bookTitle} · ${formattedDate}`}
//             </Text>

//             <TouchableOpacity 
//               onPress={() => setMenuVisible(!menuVisible)}
//               hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//             >
//               <Ionicons name="ellipsis-horizontal" size={20} color="#374151" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 28,
//     marginBottom: 22,
//     overflow: 'hidden',
//   },
//   textCardContainer: {
//     borderLeftWidth: 5,
//     borderLeftColor: '#2563EB',
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.04,
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 18,
//     paddingTop: 18,
//     marginBottom: 14,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logoWrapper: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     backgroundColor: '#EEF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   logo: {
//     width: 16,
//     height: 16,
//   },
//   savedTitle: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#111827',
//   },
//   savedDate: {
//     fontSize: 13,
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   dropdown: {
//     position: 'absolute',
//     top: 56,
//     right: 18,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 14,
//     zIndex: 999,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   textDropdownPosition: {
//     top: undefined,
//     bottom: 45,
//     right: 16,
//   },
//   dropdownItem: {
//     paddingHorizontal: 18,
//     paddingVertical: 14,
//   },
//   dropdownText: {
//     fontSize: 15,
//     color: '#DC2626',
//     fontWeight: '600',
//   },
//   imageCard: {
//     position: 'relative',
//   },
//   backgroundImage: {
//     width: '100%',
//     height: 420,
//   },
//   bookmark: {
//     position: 'absolute',
//     top: 14,
//     right: 16,
//   },
//   imageSentence: {
//     position: 'absolute',
//     top: '38%',
//     left: 30,
//     right: 30,
//     color: '#111827',
//     fontWeight: '700',
//     lineHeight: 42,
//   },
//   textCardContent: {
//     paddingTop: 26,
//     paddingHorizontal: 24,
//     paddingBottom: 16,
//   },
//   textSentence: {
//     color: '#1F2937',
//     lineHeight: 30,
//     fontWeight: '500',
//     letterSpacing: -0.3,
//     marginBottom: 20,
//   },
//   textCardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 4,
//   },
//   metaText: {
//     fontSize: 13,
//     color: '#9CA3AF',
//     flex: 1,
//     marginRight: 10,
//   },
//   metaAuthor: {
//     fontWeight: '700',
//     color: '#1F2937',
//   },
// });
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image'; // TypeScript 에러 방지를 위해 expo-image 반영
import { useSentenceStore } from '../../store/sentenceStore'; // 스토어 훅 임포트
import { sentenceService } from '../../services/sentenceService'; // 💡 백엔드 실시간 삭제용 서비스 임포트

type Props = {
  item: any;
  selectedType: 'image' | 'text';
  menuVisible: boolean;
  setMenuVisible: (visible: boolean) => void;
  onRefreshList?: () => void; // 💡 안전한 리스트 동기화 리프레시 콜백 추가 허용 가드
};

export default function SavedSentenceCard({
  item,
  selectedType,
  menuVisible,
  setMenuVisible,
  onRefreshList,
}: Props) {
  // 전역 스토어에서 전체 삭제용 액션 함수 가져오기
  //const removeSentenceByText = useSentenceStore((state) => state.removeSentenceByText);
  

  // 💡 백엔드 스펙 필드명 가드 처리 (savedAt 혹은 createdAt 유연한 매핑)
  const dateSource = item.savedAt || item.createdAt;
  const formattedDate = dateSource
    ? new Date(dateSource).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\s/g, '').slice(0, -1)
    : '2026.05.20';

  const author = item.author || '마크 트웨인';
  const bookTitle = item.bookTitle || '세상을 움직인 문장들';
  
  // 💡 데이터 본문 필드 정합성 확보 (백엔드는 content, 로컬 Mock은 text)
  const sentenceText = item.content || item.text || '';
  const removeSentenceByGroupId = useSentenceStore((state) => state.removeSentenceByGroupId);

  // 👈 💡 [행동 통화 결합] 백엔드와 프론트 로컬 스토어를 동시에 지워주는 핵심 공통 삭제 핸들러
  // const execDeleteSequence = async () => {
  //   console.log("삭제 요청 시도, item 객체 확인:", item);
  // console.log("서버에 보낼 삭제 ID:", item.sentenceId);
  //   try {
  //     // 1. 실시간 서버 DB에서 문장 삭제 처리 (DELETE /my/sentences/{id})
  //     // 백엔드 데이터에 아이템 고유 고유 ID가 매핑되어 들어옵니다. (없으면 가드용 15 타겟팅)
  //     await sentenceService.deleteMySentence(item.Id || 15);
  //     console.log(`🚀 백엔드 문장 삭제 완료 (ID: ${item.id})`);

  //     // 2. 로컬 Zustand 스토어 데이터 동시 제거
  //     removeSentenceByGroupId(item.groupId);

  //     // 3. 상위 리스트 화면 상태 새로고침 트래킹 함수 호출
  //     if (onRefreshList) {
  //       onRefreshList();
  //     }
  //   } catch (error) {
  //     console.error('문장 보관함 삭제 실패:', error);
  //   } finally {
  //     setMenuVisible(false); // 드롭다운 닫기
  //   }
  // };
  const execDeleteSequence = async () => {
  try {
    // 🎯 [핵심] 서버 데이터와 로컬 데이터를 구분하는 조건문
    // 1779279867328 같이 큰 숫자는 Date.now()로 생성된 로컬 데이터입니다.
    // 서버에서 받은 데이터라면 보통 id가 훨씬 작을 것입니다(예: 1~1000).
    const isServerData = item.id < 10000; 

    if (isServerData) {
      // 서버 데이터인 경우에만 삭제 API 호출
      await sentenceService.deleteMySentence(item.id);
      console.log(`🚀 서버 데이터 삭제 완료`);
    } else {
      console.log(`📂 로컬 데이터 삭제 진행 (서버 통신 생략)`);
    }

    // 서버 삭제 여부와 상관없이 무조건 로컬 스토어 제거
    removeSentenceByGroupId(item.groupId);

    if (onRefreshList) {
      onRefreshList();
    }
  } catch (error) {
    console.error('삭제 처리 중 에러 발생:', error);
    // 에러가 나더라도 로컬 스토어는 지워지도록 여기에도 배치
    removeSentenceByGroupId(item.groupId);
  } finally {
    setMenuVisible(false);
  }
};

  return (
    <View style={[styles.card, selectedType === 'text' && styles.textCardContainer]}>
      
      {/* IMAGE 타입 헤더 */}
      {selectedType === 'image' && (
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <View style={styles.logoWrapper}>
              <Image
                source={require('../../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.savedTitle}>저장된 문장</Text>
              <Text style={styles.savedDate}>{formattedDate}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      )}

      {/* 조절된 드롭다운 메뉴 */}
      {menuVisible && (
        <View style={[styles.dropdown, selectedType === 'text' && styles.textDropdownPosition]}>
          <TouchableOpacity style={styles.dropdownItem} onPress={execDeleteSequence}>
            <Text style={styles.dropdownText}>삭제</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 카드 본문 분기 조절 */}
      {selectedType === 'image' ? (
        /* IMAGE 타입 */
        <View style={styles.imageCard}>
          <Image
            //source={require('../../../assets/logo.png')}
            source={item.imageUrl ? { uri: item.imageUrl } : require('../../../assets/logo.png')}
            style={styles.backgroundImage}
            contentFit="cover"
          />
          {/* 💡 [행동 2 완성] 북마크 아이콘을 툭 누르면 보관함에서 바로 삭제(해제) 처리되도록 핸들러 바인딩! */}
          <TouchableOpacity style={styles.bookmark} onPress={execDeleteSequence}>
            <Ionicons name="bookmark" size={24} color="#2563EB" />
          </TouchableOpacity>
          {/* 💡 QuoteCard와 동일한 텍스트 배치 구조 */}
          <View style={styles.centerTextOverlay}>
            <Text style={styles.imageSentence}>"{sentenceText}"</Text>
            <Text style={styles.author}>{author}</Text>
          </View>
          {/* <Text
            style={[
              styles.imageSentence,
              {
                textAlign: item.textAlign || 'center',
                fontSize: item.fontSize || 24,
              },
            ]}
          >
            {sentenceText}
          </Text> */}
        </View>
      ) : (
        /* TEXT 타입 */
        <View style={styles.textCardContent}>
          <Text
            style={[
              styles.textSentence,
              {
                textAlign: item.textAlign || 'left',
                fontSize: 17,
                fontFamily: item.font || 'Kopub',
              },
            ]}
          >
            "{sentenceText}"
          </Text>

          <View style={styles.textCardFooter}>
            <Text style={styles.metaText} numberOfLines={1}>
              <Text style={styles.metaAuthor}>{author}</Text>
              {` · ${bookTitle} · ${formattedDate}`}
            </Text>

            <TouchableOpacity 
              onPress={() => setMenuVisible(!menuVisible)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="ellipsis-horizontal" size={20} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>
      )}

    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20, // QuoteCard와 일치
    marginBottom: 22,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  textCardContainer: {
    borderLeftWidth: 5,
    borderLeftColor: '#2563EB',
    borderRadius: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 18,
    marginBottom: 14,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logoWrapper: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginRight: 10,
  },
  logo: { width: 16, height: 16 },
  savedTitle: { fontSize: 15, fontWeight: '700', color: '#111827' },
  savedDate: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  
  // 🎯 QuoteCard와 동일한 디자인 반영
  imageCard: {
    width: '100%',
    aspectRatio: 1, // 정사각형
    position: 'relative',
    backgroundColor: '#111827',
  },
  backgroundImage: { width: '100%', height: '100%' },
  bookmark: { position: 'absolute', top: 14, right: 16, zIndex: 10 },
  
  centerTextOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 36,
  },
  imageSentence: {
    fontSize: 20,
    fontWeight: '500',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 32,
  
  },
  author: {
    color: '#E5E7EB',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 12,
    textAlign: 'center',
  },
  
  // 텍스트 카드 전용 스타일 유지
  textCardContent: { paddingTop: 26, paddingHorizontal: 24, paddingBottom: 16 },
  textSentence: { color: '#1F2937', lineHeight: 30, fontWeight: '500', marginBottom: 20 },
  textCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  metaText: { fontSize: 13, color: '#9CA3AF', flex: 1, marginRight: 10 },
  metaAuthor: { fontWeight: '700', color: '#1F2937' },
  textDropdownPosition: {
    top: undefined,
    bottom: 45,
    right: 16,
  },
  dropdown: {
    position: 'absolute', top: 56, right: 18,
    backgroundColor: '#FFFFFF', borderRadius: 14, zIndex: 999,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 5,
  },
  dropdownItem: { paddingHorizontal: 18, paddingVertical: 14 },
  dropdownText: { fontSize: 15, color: '#DC2626', fontWeight: '600' },
});
// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 28,
//     marginBottom: 22,
//     overflow: 'hidden',
//   },
//   textCardContainer: {
//     borderLeftWidth: 5,
//     borderLeftColor: '#2563EB',
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.04,
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 18,
//     paddingTop: 18,
//     marginBottom: 14,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logoWrapper: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     backgroundColor: '#EEF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   logo: {
//     width: 16,
//     height: 16,
//   },
//   savedTitle: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#111827',
//   },
//   savedDate: {
//     fontSize: 13,
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   dropdown: {
//     position: 'absolute',
//     top: 56,
//     right: 18,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 14,
//     zIndex: 999,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   textDropdownPosition: {
//     top: undefined,
//     bottom: 45,
//     right: 16,
//   },
//   dropdownItem: {
//     paddingHorizontal: 18,
//     paddingVertical: 14,
//   },
//   dropdownText: {
//     fontSize: 15,
//     color: '#DC2626',
//     fontWeight: '600',
//   },
//   imageCard: {
//     position: 'relative',
//   },
//   backgroundImage: {
//     width: '100%',
//     height: 420,
//   },
//   bookmark: {
//     position: 'absolute',
//     top: 14,
//     right: 16,
//   },
//   imageSentence: {
//     position: 'absolute',
//     top: '38%',
//     left: 30,
//     right: 30,
//     color: '#111827',
//     fontWeight: '700',
//     lineHeight: 42,
//   },
//   textCardContent: {
//     paddingTop: 26,
//     paddingHorizontal: 24,
//     paddingBottom: 16,
//   },
//   textSentence: {
//     color: '#1F2937',
//     lineHeight: 30,
//     fontWeight: '500',
//     letterSpacing: -0.3,
//     marginBottom: 20,
//   },
//   textCardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 4,
//   },
//   metaText: {
//     fontSize: 13,
//     color: '#9CA3AF',
//     flex: 1,
//     marginRight: 10,
//   },
//   metaAuthor: {
//     fontWeight: '700',
//     color: '#1F2937',
//   },
// });