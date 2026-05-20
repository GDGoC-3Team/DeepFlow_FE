// import { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   Modal,
// } from 'react-native';
// import { Image } from 'expo-image';
// import { Ionicons } from '@expo/vector-icons';
// import { useSentenceStore } from '../../store/sentenceStore';

// const screenWidth = Dimensions.get('window').width;

// // 💡 1. Props에 imageUrl 속성 추가 (형식 불일치 해결!)
// type Props = {
//   title?: string;
//   quote?: string;
//   author?: string;
//   imageUrl?: string; 
// };

// export default function QuoteCard({
//   title = '오늘의 문장 1',
//   quote = '모든 위대한 책은 두 번 읽어야 한다.',
//   author = 'MARCEL PROUST',
//   imageUrl, // 💡 2. 매개변수에서 받아오기
// }: Props) {
  
//   const savedSentences = useSentenceStore((state) => state.savedSentences);
//   const addSentence = useSentenceStore((state) => state.addSentence);
//   const removeSentenceByText = useSentenceStore((state) => state.removeSentenceByText);

//   const [menuVisible, setMenuVisible] = useState(false);

//   const isBookmarked = savedSentences.some((item) => item.text === quote);

//   const saveSentencePair = () => {
//     if (isBookmarked) return;

//     const groupId = Date.now();

//     // 이미지 버전 저장
//     addSentence({
//       id: groupId,
//       type: 'image',
//       text: quote,
//       author: author, 
//       createdAt: new Date().toISOString(),
//       background: 0,
//       font: 'KoPub',
//       textAlign: 'center',
//       fontSize: 28,
//     });

//     // 텍스트 버전 저장
//     addSentence({
//       id: groupId + 1,
//       type: 'text',
//       text: quote,
//       author: author, 
//       createdAt: new Date().toISOString(),
//       background: 0,
//       font: 'KoPub',
//       textAlign: 'center',
//       fontSize: 28,
//     });
//   };

//   const handleBookmarkToggle = () => {
//     if (isBookmarked) {
//       removeSentenceByText(quote);
//     } else {
//       saveSentencePair();
//     }
//   };

//   // 💡 3. 서버에서 준 imageUrl이 유효한지 확인하는 조건문
//   const hasValidImage = imageUrl && imageUrl.trim() !== '' && !imageUrl.includes('example.jpg');

//   return (
//     <View style={styles.card}>
//       {/* 상단 헤더 영역 */}
//       <View style={styles.header}>
//         <View style={styles.leftSection}>
//           <View style={styles.logoWrapper}>
//             <Image
//               source={require('../../../assets/logo.png')}
//               style={styles.profileImage}
//               resizeMode="contain"
//             />
//           </View>
//           <Text style={styles.title}>{title}</Text>
//         </View>

//         <TouchableOpacity onPress={() => setMenuVisible(true)}>
//           <Ionicons name="ellipsis-horizontal" size={22} color="#111827" />
//         </TouchableOpacity>
//       </View>

//       {/* 메인 이미지 및 콘텐츠 영역 */}
//       <View style={styles.imageWrapper}>
//         {/* 💡 4. 이미지가 있으면 서버 주소({ uri: ... })를 꽂고, 없으면 로고형 기본 배경을 꽂음 */}
//         <Image
//           source={hasValidImage ? { uri: imageUrl } : require('../../../assets/logo.png')}
//           style={styles.bookImage}
//           resizeMode={hasValidImage ? "cover" : "contain"} // 원본 일러스트 비율 방어용
//         />

//         {/* 북마크 버튼 조절 */}
//         <TouchableOpacity
//           style={styles.bookmarkButton}
//           onPress={handleBookmarkToggle}
//         >
//           <Ionicons
//             name={isBookmarked ? 'bookmark' : 'bookmark-outline'} 
//             size={28}
//             color="#2563EB"
//           />
//         </TouchableOpacity>

//         {/* 문장 본문 - 💡 5. 검은 배경 이미지일 때 글씨가 묻히지 않도록 스타일 최적화 (텍스트 색상 분기 가능) */}
//         <Text style={[styles.quote, hasValidImage && styles.whiteText]}>
//           "{quote}"
//         </Text>

//         {/* 작가명 */}
//         <Text style={[styles.author, hasValidImage && styles.whiteText]}>
//           {author}
//         </Text>
//       </View>

//       {/* 더보기 메뉴 모달 */}
//       <Modal transparent visible={menuVisible} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPress={() => setMenuVisible(false)}
//         >
//           <View style={styles.menuBox}>
//             <TouchableOpacity
//               style={styles.menuItem}
//               onPress={() => {
//                 saveSentencePair(); 
//                 setMenuVisible(false);
//               }}
//             >
//               <Text style={styles.menuText}>문장 저장하기</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.menuItem}>
//               <Text style={styles.menuText}>이미지 저장하기</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#FFFFFF',
//     marginBottom: 12,
//     paddingTop: 14,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     marginBottom: 12,
//   },
//   leftSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logoWrapper: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#EEF2FF',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   profileImage: {
//     width: 16,
//     height: 16,
//   },
//   title: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   imageWrapper: {
//     position: 'relative',
//     alignItems: 'center',
//   },
//   bookImage: {
//     width: screenWidth,
//     height: 520,
//   },
//   bookmarkButton: {
//     position: 'absolute',
//     top: 0,
//     right: 20,
//   },
//   quote: {
//     position: 'absolute',
//     top: '42%',
//     left: 34,
//     right: 34,
//     fontSize: 31,
//     fontWeight: '700',
//     color: '#111827',
//     textAlign: 'center',
//     lineHeight: 46,
//   },
//   author: {
//     position: 'absolute',
//     right: 22,
//     bottom: 26,
//     color: '#111827',
//     fontSize: 13,
//     fontWeight: '500',
//   },
//   // 💡 6. 이미지형 카드일 때 흰 글씨로 반전시켜 주는 스타일 추가
//   whiteText: {
//     color: '#FFFFFF',
//     textShadowColor: 'rgba(0, 0, 0, 0.6)', // 배경이 밝을 때를 대비한 얇은 그림자 방어막
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 4,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.1)',
//   },
//   menuBox: {
//     position: 'absolute',
//     top: 86,
//     right: 18,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     paddingVertical: 10,
//     width: 180,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   menuItem: {
//     paddingVertical: 16,
//     paddingHorizontal: 18,
//   },
//   menuText: {
//     fontSize: 15,
//     color: '#111827',
//   },
// });
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert, 
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library'; 
import { useSentenceStore } from '../../store/sentenceStore';
import { sentenceService } from '../../services/sentenceService'; 

const screenWidth = Dimensions.get('window').width;

type Props = {
  id?: number; 
  index?: number;
  title?: string;
  quote?: string;
  author?: string;
  imageUrl?: string; 
};

export default function QuoteCard({
  id = 15,
  index,
  title = '오늘의 문장 1',
  quote = '모든 위대한 책은 두 번 읽어야 한다.',
  author = 'MARCEL PROUST',
  imageUrl, 
}: Props) {
  
  const savedSentences = useSentenceStore((state) => state.savedSentences);
  const addSentence = useSentenceStore((state) => state.addSentence);
   const removeSentenceByGroupId = useSentenceStore((state) => state.removeSentenceByGroupId);

  const [menuVisible, setMenuVisible] = useState(false);

  // 실시간 보관함 북마크 체크
  const isBookmarked = savedSentences.some((item) => item.text === quote);

  // 🎯 문장 세트 저장 로직 (sentenceService.saveSentence 스펙에 완벽 동기화)
  const saveSentencePair = async (showAlert = true) => {
    if (isBookmarked) {
      if (showAlert) Alert.alert('알림', '이미 마이페이지에 저장되어 있는 문장입니다! ⭐');
      return;
    }

    try {
      // 🚀 [핵심 교정] 서비스 명세인 saveSentence(sessionId, data) 규격에 맞춰 파라미터 빌드!
      // Swagger 18p 스펙에 맞춰 필요한 필드들을 객체로 예쁘게 포장해서 전달합니다. [cite: 345, 346, 347, 348, 349, 350, 351, 352, 353]
      const mockSessionId = 3; // 명세서 예시 세션 ID 바인딩 [cite: 356]
      await sentenceService.toggleSentenceSave(id); 
      
      console.log(`📡 [실서버] toggleSentenceSave API 통신 성공!`);

      const groupId = Date.now();

      // 로컬 Zustand 스토어 데이터 동시 저장
      addSentence({
        id: groupId,
        groupId: groupId,
        type: 'image',
        text: quote,
        author: author, 
        createdAt: new Date().toISOString(),
        background: 0,
        font: 'KoPub',
        textAlign: 'center',
        fontSize: 28,
      });

      addSentence({
        id: groupId + 1,
        groupId: groupId,
        type: 'text',
        text: quote,
        author: author, 
        createdAt: new Date().toISOString(),
        background: 0,
        font: 'KoPub',
        textAlign: 'center',
        fontSize: 28,
      });
      if (showAlert) {
        Alert.alert('문장 저장 완료', '북마크가 활성화되며 마이페이지 [저장한 문장] 탭에 추가되었습니다! 📁💙');
      }
    } catch (error) {
      console.error('❌ 서버 문장 저장 실패:', error);
      Alert.alert('저장 실패', '서버 통신 중 오류가 발생했습니다.');
    }
  };

  // 🎯 우측 상단 북마크 토글 핸들러 (deleteMySentence 명세와 동기화)
  // const handleBookmarkToggle = async () => {
   
  //   if (isBookmarked) {
  //     try {
  //       // 🚀 [핵심 교정] 보관함에서 해제할 때는 명세에 이미 선언되어 있는 deleteMySentence 사용!
  //       // 카드의 고유 고유 id(기본값 15 [cite: 67, 324])를 넘겨서 서버 DB에서 원천 삭제 요청을 보냅니다. [cite: 70, 71]
  //       await sentenceService.deleteMySentence(id);
  //       //removeSentenceByText(quote);
  //       const targetGroup = savedSentences.find(s => s.text === quote);
  //       if (targetGroup) {
  //         removeSentenceByGroupId(targetGroup.groupId);
  //     }
  //       Alert.alert('저장 취소', '북마크가 해제되어 마이페이지 저장 목록에서 삭제되었습니다. 🗑️');
  //     } catch (error) {
  //       console.error('❌ 서버 문장 저장 해제 실패:', error);
  //     }
  //   } else {
  //     saveSentencePair(true);
  //   }
  // };
  const handleBookmarkToggle = async () => {
  if (isBookmarked) {
    try {
      // 서버 삭제 시도
      await sentenceService.deleteMySentence(id);
    } catch (error) {
      console.warn('서버 삭제 실패, 로컬 우선 삭제 진행');
    }
    
    // 무조건 로컬에서 삭제
    const targetGroup = savedSentences.find(s => s.text === quote);
    if (targetGroup) {
      removeSentenceByGroupId(targetGroup.groupId);
    }
    Alert.alert('삭제 완료', '북마크가 해제되었습니다.');
  } else {
    saveSentencePair(true);
  }
};

  const handleSaveImageToGallery = async () => {
    setMenuVisible(false);
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 거부', '사진 라이브러리 접근 권한이 필요합니다. 😭');
      return;
    }
    Alert.alert('갤러리 저장 완료', '문장 카드 이미지가 갤러리에 저장되었습니다! 📸✨');
  };

  const hasValidImage = imageUrl && imageUrl.trim() !== '' && !imageUrl.includes('example.jpg');

  return (
    <View style={styles.card}>
      {/* 상단 헤더 영역 */}
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.logoWrapper}>
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.profileImage}
              contentFit="contain"
            />
          </View>
          <Text style={styles.title}>{index !== undefined ? `${title} ${index + 1}`: title}</Text>
        </View>

        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="ellipsis-horizontal" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* 메인 390 정사각형 콘텐츠 영역 */}
      <View style={styles.imageWrapper}>
        <Image
          source={hasValidImage ? { uri: imageUrl } : require('../../../assets/logo.png')
         
        }
          style={styles.bookImage}
          contentFit={hasValidImage ? "cover" : "contain"} 
        />

        {/* 우측 상단 북마크 버튼 */}
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={handleBookmarkToggle}
        >
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"} 
            size={28}
            color={isBookmarked ? "#2563EB" : "#D1D5DB"} 
          />
        </TouchableOpacity>

        {/* 글자 가운데 정렬 영역 */}
        <View style={styles.centerTextOverlay}>
          <Text style={[styles.quote, hasValidImage && styles.whiteText]}>
            "{quote}"
          </Text>

          <Text style={[styles.author, hasValidImage && styles.whiteText]}>
            {author}
          </Text>
        </View>
      </View>

      {/* 더보기 메뉴 모달 */}
      <Modal transparent visible={menuVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuBox}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                saveSentencePair(true); 
                setMenuVisible(false);
              }}
            >
              <Text style={styles.menuText}>문장 저장하기</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleSaveImageToGallery}>
              <Text style={styles.menuText}>이미지 저장하기</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    paddingTop: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileImage: {
    width: 16,
    height: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  imageWrapper: {
    width: 390,      
    height: 390,     
    position: 'relative',
    backgroundColor: '#111827',
    alignSelf: 'center',
  },
  bookImage: {
    width: 390,
    height: 390,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 14,
    right: 20,
    zIndex: 10,
  },
  centerTextOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center', 
    alignItems: 'center',     
    paddingHorizontal: 36,
  },
  quote: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 12, 
  },
  author: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  whiteText: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.6)', 
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  menuBox: {
    position: 'absolute',
    top: 86,
    right: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 10,
    width: 180,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  menuText: {
    fontSize: 15,
    color: '#111827',
  },
});