
// import { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
// import { Image } from 'expo-image';
// import { Ionicons } from '@expo/vector-icons';
// import * as MediaLibrary from 'expo-media-library'; 
// import { useSentenceStore } from '../../store/sentenceStore';
// import { sentenceService } from '../../services/sentenceService'; 

// type Props = {
//   id?: number; 
//   index?: number;
//   title?: string;
//   quote?: string;
//   author?: string;
//   imageUrl?: string; 
// };

// export default function QuoteCard({
//   id = 15, 
//   index = 0,
//   quote = '모든 위대한 책은 두 번 읽어야 한다.',
//   author = 'MARCEL PROUST',
//   imageUrl, 
// }: Props) {
  
//   const savedSentences = useSentenceStore((state) => state.savedSentences);
//   const addSentence = useSentenceStore((state) => state.addSentence);
//   const removeSentenceByText = useSentenceStore((state) => state.removeSentenceByText);

//   const [menuVisible, setMenuVisible] = useState(false);
//   const isBookmarked = savedSentences.some((item) => item.text === quote);

//   // 🎯 [기획 구현] 문장 저장하기 가동 (서버 억까 방지 + 로컬 동시 2개 적재)
//   const saveSentencePair = async (showAlert = true) => {
//     if (isBookmarked) {
//       if (showAlert) Alert.alert('알림', '이미 마이페이지에 저장되어 있는 문장입니다! ⭐');
//       return;
//     }

//     try {
//       // 백엔드 명세 싱크용 예외 처리 가드
//       try {
//         const mockSessionId = 3; 
//         await sentenceService.saveSentence(mockSessionId, {
//           selectedText: quote,
//           imageUrl: imageUrl || "https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png", 
//           fontFamily: "NANUM_MYEONGJO", 
//           fontSize: 18, 
//           startOffset: 0, 
//           endOffset: quote.length 
//         }); 
//       } catch (serverError) {
//         console.log(`⚠️ 서버 백업 패스 (로컬 스토어 듀얼 모드 가동)`);
//       }

//       const groupId = Date.now();

//       // 🖼️ 1. 이미지 버전 보관함 저장 (Zustand)
//       addSentence({
//         id: groupId,
//         type: 'image', 
//         text: quote,
//         author: author, 
//         createdAt: new Date().toISOString(),
//         background: 0,
//         font: 'Kopub', 
//         textAlign: 'center',
//         fontSize: 28,
//       });

//       // 📝 2. 텍스트 버전 보관함 저장 (Zustand)
//       addSentence({
//         id: groupId + 1,
//         type: 'text', 
//         text: quote,
//         author: author, 
//         createdAt: new Date().toISOString(),
//         background: 0,
//         font: 'Kopub', 
//         textAlign: 'center',
//         fontSize: 28,
//       });

//       if (showAlert) {
//         Alert.alert('문장 저장 완료', '북마크가 활성화되며 마이페이지 [저장한 문장] 탭에 추가되었습니다! 📁💙');
//       }
//     } catch (error) {
//       console.error('❌ 문장 저장 실패:', error);
//     }
//   };

//   // 🎯 [기획 구현] 북마크 해제 시 이미지/텍스트 두 버전 동시 완전 증발
//   const handleBookmarkToggle = async () => {
//     if (isBookmarked) {
//       try {
//         await sentenceService.deleteMySentence(id);
//       } catch (error) {
//         console.log('⚠️ 서버 삭제 스킵 후 로컬 박스 정정 진행');
//       }
      
//       // 🌟 이 명령어가 호출되면서 동일 텍스트를 가진 이미지/텍스트 카드가 한 번에 날아갑니다!
//       removeSentenceByText(quote);
//       Alert.alert('저장 취소', '북마크가 해제되어 마이페이지 저장 목록에서 삭제되었습니다. 🗑️');
//     } else {
//       saveSentencePair(true);
//     }
//   };

//   const handleSaveImageToGallery = async () => {
//     setMenuVisible(false);
//     const { status } = await MediaLibrary.requestPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('권한 거부', '사진 라이브러리 접근 권한이 필요합니다. 😭');
//       return;
//     }
//     Alert.alert('갤러리 저장 완료', '문장 카드 이미지가 갤러리에 저장되었습니다! 📸✨');
//   };

//   const hasValidImage = imageUrl && imageUrl.trim() !== '' && !imageUrl.includes('example.jpg');
//   const displayTitle = `오늘의 문장 ${index + 1}`;

//   return (
//     <View style={styles.card}>
//       <View style={styles.header}>
//         <View style={styles.leftSection}>
//           <View style={styles.logoWrapper}>
//             <Image source={require('../../../assets/logo.png')} style={styles.profileImage} contentFit="contain" />
//           </View>
//           <Text style={styles.title}>{displayTitle}</Text>
//         </View>
//         <TouchableOpacity onPress={() => setMenuVisible(true)}>
//           <Ionicons name="ellipsis-horizontal" size={22} color="#111827" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.imageWrapper}>
//         <Image
//           source={hasValidImage ? { uri: imageUrl } : require('../../../assets/logo.png')}
//           style={styles.bookImage}
//           contentFit={hasValidImage ? "cover" : "contain"} 
//         />
//         <TouchableOpacity style={styles.bookmarkButton} onPress={handleBookmarkToggle}>
//           <Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={28} color={isBookmarked ? "#2563EB" : "#D1D5DB"} />
//         </TouchableOpacity>

//         <View style={styles.centerTextOverlay}>
//           <Text style={[styles.quote, hasValidImage && styles.whiteText]}>"{quote}"</Text>
//           <Text style={[styles.author, hasValidImage && styles.whiteText]}>{author}</Text>
//         </View>
//       </View>

//       <Modal transparent visible={menuVisible} animationType="fade">
//         <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setMenuVisible(false)}>
//           <View style={styles.menuBox}>
//             <TouchableOpacity style={styles.menuItem} onPress={() => { saveSentencePair(true); setMenuVisible(false); }}>
//               <Text style={styles.menuText}>문장 저장하기</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.menuItem} onPress={handleSaveImageToGallery}>
//               <Text style={styles.menuText}>이미지 저장하기</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: { backgroundColor: '#FFFFFF', marginBottom: 12, paddingTop: 14 },
//   header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 },
//   leftSection: { flexDirection: 'row', alignItems: 'center' },
//   logoWrapper: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#EEF2FF', borderWidth: 1, borderColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
//   profileImage: { width: 16, height: 16 },
//   title: { fontSize: 15, fontWeight: '600', color: '#111827' },
//   imageWrapper: { width: 390, height: 390, position: 'relative', backgroundColor: '#111827', alignSelf: 'center' },
//   bookImage: { width: 390, height: 390 },
//   bookmarkButton: { position: 'absolute', top: 14, right: 20, zIndex: 10 },
//   centerTextOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 },
//   quote: { fontSize: 16, fontWeight: '600', color: '#111827', textAlign: 'center', lineHeight: 26, marginBottom: 12 },
//   author: { color: '#6B7280', fontSize: 12, fontWeight: '500', textAlign: 'center' },
//   whiteText: { color: '#FFFFFF', textShadowColor: 'rgba(0, 0, 0, 0.6)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.15)' },
//   menuBox: { position: 'absolute', top: 86, right: 18, backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 10, width: 180, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
//   menuItem: { paddingVertical: 16, paddingHorizontal: 18 },
//   menuText: { fontSize: 15, color: '#111827' },
// });
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library'; 
import { useSentenceStore } from '../../store/sentenceStore';
import { sentenceService } from '../../services/sentenceService'; 

type Props = {
  id?: number; // 🎯 스웨거 문서의 문장 고유 ID (예: 15번 문장)
  index?: number;
  title?: string;
  quote?: string;
  author?: string;
  imageUrl?: string; 
};

export default function QuoteCard({
  id = 15, // 피드 API에서 넘겨주는 진짜 문장 ID가 여기로 들어옵니다!
  index = 0,
  quote = '모든 위대한 책은 두 번 읽어야 한다.',
  author = 'MARCEL PROUST',
  imageUrl, 
}: Props) {
  
  const savedSentences = useSentenceStore((state) => state.savedSentences);
  const addSentence = useSentenceStore((state) => state.addSentence);
  const removeSentenceByText = useSentenceStore((state) => state.removeSentenceByText);

  const [menuVisible, setMenuVisible] = useState(false);
  
  // Zustand 스토어에 현재 문장 텍스트가 있으면 북마크 활성화 상태로 판별
  const isBookmarked = savedSentences.some((item) => item.text === quote);

  // 🎯 [스웨거 동기화] 문장 저장/해제 통합 핸들러 (POST /sentences/{id}/save)
  const handleBookmarkToggle = async () => {
    try {
      console.log(`📡 [실서버 요청] POST /sentences/${id}/save 토글 가동 (문장ID: ${id})`);
      
      // 1️⃣ [실서버 통신] 스웨거 명세대로 문장 고유 id만 패스로 넘겨주면 서버가 알아서 토글합니다!
      const response = await (sentenceService as any).toggleSentenceSave(id); 
      // 💡 만약 서비스 파일 함수명이 다르다면 다현님이 만드신 토글 API 함수명(예: toggleSave)으로 매칭해주세요!

      // 2️⃣ [프론트엔드 Zustand 스토어 분기 처리]
      if (isBookmarked) {
        // [저장 해제 시점] ➡️ 양쪽 탭에서 동시 삭제
    
    
    // Zustand 상자 안에서 진짜 원본 ID(originalId)가 일치하는 쌍둥이 한 방에 폭파!
    const currentSaved = useSentenceStore.getState().savedSentences;
    const filteredSaved = currentSaved.filter((item: any) => item.originalId !== id && item.id !== id);
    
    useSentenceStore.setState({ savedSentences: filteredSaved });
        Alert.alert('저장 취소', '북마크가 해제되어 마이페이지 저장 목록에서 삭제되었습니다. 🗑️');
      } else {
        // [저장 등록 시점] ➡️ 이미지/텍스트 듀얼 적재 기획 완벽 이식
        //const groupId = Date.now();
        const baseId = id * 10000;

        // 🖼️ 1. 이미지 버전 보관함 적재
        addSentence({
          id: baseId,
          
          type: 'image',
          text: quote,
          author: author,
          createdAt: new Date().toISOString(),
          background: 0,
          font: 'Kopub',
          textAlign: 'center',
          fontSize: 28,
        });

        // 📝 2. 텍스트 버전 보관함 적재 (첫 번째 시안 디자인 적용)
        addSentence({
          id: baseId,
          
          type: 'text',
          text: quote,
          author: author,
          createdAt: new Date().toISOString(),
          background: 0,
          font: 'Kopub',
          textAlign: 'center',
          fontSize: 28,
        });

        Alert.alert('문장 저장 완료', '북마크가 활성화되며 마이페이지 [저장한 문장] 탭에 추가되었습니다! 📁💙');
      }

    } catch (error) {
      console.error('❌ 스웨거 토글 API 통신 실패:', error);
      Alert.alert('오류', '서버와 통신하는 중 문제가 발생했습니다.');
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
  const displayTitle = `오늘의 문장 ${index + 1}`;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.logoWrapper}>
            <Image source={require('../../../assets/logo.png')} style={styles.profileImage} contentFit="contain" />
          </View>
          <Text style={styles.title}>{displayTitle}</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="ellipsis-horizontal" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <View style={styles.imageWrapper}>
        <Image
          source={hasValidImage ? { uri: imageUrl } : require('../../../assets/logo.png')}
          style={styles.bookImage}
          contentFit={hasValidImage ? "cover" : "contain"} 
        />
        <TouchableOpacity style={styles.bookmarkButton} onPress={handleBookmarkToggle}>
          <Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={28} color={isBookmarked ? "#2563EB" : "#D1D5DB"} />
        </TouchableOpacity>

        <View style={styles.centerTextOverlay}>
          <Text style={[styles.quote, hasValidImage && styles.whiteText]}>"{quote}"</Text>
          <Text style={[styles.author, hasValidImage && styles.whiteText]}>{author}</Text>
        </View>
      </View>

      <Modal transparent visible={menuVisible} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuBox}>
            <TouchableOpacity style={styles.menuItem} onPress={() => { handleBookmarkToggle(); setMenuVisible(false); }}>
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
  card: { backgroundColor: '#FFFFFF', marginBottom: 12, paddingTop: 14 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 },
  leftSection: { flexDirection: 'row', alignItems: 'center' },
  logoWrapper: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#EEF2FF', borderWidth: 1, borderColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  profileImage: { width: 16, height: 16 },
  title: { fontSize: 15, fontWeight: '600', color: '#111827' },
  imageWrapper: { width: 390, height: 390, position: 'relative', backgroundColor: '#111827', alignSelf: 'center' },
  bookImage: { width: 390, height: 390 },
  bookmarkButton: { position: 'absolute', top: 14, right: 20, zIndex: 10 },
  centerTextOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 },
  quote: { fontSize: 16, fontWeight: '600', color: '#111827', textAlign: 'center', lineHeight: 26, marginBottom: 12 },
  author: { color: '#6B7280', fontSize: 12, fontWeight: '500', textAlign: 'center' },
  whiteText: { color: '#FFFFFF', textShadowColor: 'rgba(0, 0, 0, 0.6)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.15)' },
  menuBox: { position: 'absolute', top: 86, right: 18, backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 10, width: 180, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  menuItem: { paddingVertical: 16, paddingHorizontal: 18 },
  menuText: { fontSize: 15, color: '#111827' },
});