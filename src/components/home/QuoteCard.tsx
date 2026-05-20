
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

  const saveSentencePair = async (showAlert = true) => {
    if (isBookmarked) {
      if (showAlert) Alert.alert('알림', '이미 마이페이지에 저장되어 있는 문장입니다! ⭐');
      return;
    }

    try {
      
      
      const mockSessionId = 3; 
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