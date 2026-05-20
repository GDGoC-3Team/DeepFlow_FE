import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useSentenceStore } from '../../store/sentenceStore';
import { sentenceService } from '../../services/sentenceService';

type Props = {
  item: any;
  selectedType: 'image' | 'text';
  menuVisible: boolean;
  setMenuVisible: (visible: boolean) => void;
  onRefreshList?: () => void;
};

export default function SavedSentenceCard({
  item,
  selectedType,
  menuVisible,
  setMenuVisible,
  onRefreshList,
}: Props) {
  const removeSentenceByGroupId = useSentenceStore((state) => state.removeSentenceByGroupId);

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
  const sentenceText = item.content || item.text || '';

  // 핵심 삭제 핸들러 (서버/로컬 통합)
  const execDeleteSequence = async () => {
    try {
      // 1. 서버 데이터인 경우에만 삭제 API 호출 (ID가 작으면 서버 데이터로 간주)
      // 서버에서 받은 데이터의 ID 범위가 크다면, 백엔드 응답의 ID와 대조하여 조건을 조정하세요.
      const isServerData = item.id < 10000; 

      if (isServerData) {
        await sentenceService.deleteMySentence(item.id);
        console.log(`서버 데이터 삭제 완료 (ID: ${item.id})`);
      } else {
        console.log(`로컬 데이터 삭제 진행 (서버 통신 생략)`);
      }

      // 2. 서버 삭제 여부와 상관없이 무조건 로컬 데이터 제거
      removeSentenceByGroupId(item.groupId);
      
      // 3. UI 새로고침
      if (onRefreshList) onRefreshList();
    } catch (error) {
      console.error('삭제 처리 중 에러 발생:', error);
      // 에러 발생 시에도 로컬 상태는 지워지도록 보장
      removeSentenceByGroupId(item.groupId);
    } finally {
      setMenuVisible(false);
    }
  };

  return (
    <View style={[styles.card, selectedType === 'text' && styles.textCardContainer]}>
      {selectedType === 'image' && (
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <View style={styles.logoWrapper}>
              <Image source={require('../../../assets/logo.png')} style={styles.logo} />
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

      {menuVisible && (
        <View style={[styles.dropdown, selectedType === 'text' && styles.textDropdownPosition]}>
          <TouchableOpacity style={styles.dropdownItem} onPress={execDeleteSequence}>
            <Text style={styles.dropdownText}>삭제</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedType === 'image' ? (
        <View style={styles.imageCard}>
          <Image
            source={item.imageUrl ? { uri: item.imageUrl } : require('../../../assets/logo.png')}
            style={styles.backgroundImage}
            contentFit="cover"
          />
          <TouchableOpacity style={styles.bookmark} onPress={execDeleteSequence}>
            <Ionicons name="bookmark" size={24} color="#2563EB" />
          </TouchableOpacity>
          <View style={styles.centerTextOverlay}>
            <Text style={styles.imageSentence}>"{sentenceText}"</Text>
            <Text style={styles.author}>{author}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.textCardContent}>
          <Text style={[styles.textSentence, { textAlign: item.textAlign || 'left', fontSize: 17, fontFamily: item.font || 'Kopub' }]}>
            "{sentenceText}"
          </Text>
          <View style={styles.textCardFooter}>
            <Text style={styles.metaText} numberOfLines={1}>
              <Text style={styles.metaAuthor}>{author}</Text>
              {` · ${bookTitle} · ${formattedDate}`}
            </Text>
            <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, marginBottom: 22, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  textCardContainer: { borderLeftWidth: 5, borderLeftColor: '#2563EB', borderRadius: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingTop: 18, marginBottom: 14 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logoWrapper: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  logo: { width: 16, height: 16 },
  savedTitle: { fontSize: 15, fontWeight: '700', color: '#111827' },
  savedDate: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  imageCard: { width: '100%', aspectRatio: 1, position: 'relative', backgroundColor: '#111827' },
  backgroundImage: { width: '100%', height: '100%' },
  bookmark: { position: 'absolute', top: 14, right: 16, zIndex: 10 },
  centerTextOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 },
  imageSentence: { fontSize: 20, fontWeight: '500', color: '#111827', textAlign: 'center', lineHeight: 32 },
  author: { color: '#E5E7EB', fontSize: 12, fontWeight: '500', marginTop: 12, textAlign: 'center' },
  textCardContent: { paddingTop: 26, paddingHorizontal: 24, paddingBottom: 16 },
  textSentence: { color: '#1F2937', lineHeight: 30, fontWeight: '500', marginBottom: 20 },
  textCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  metaText: { fontSize: 13, color: '#9CA3AF', flex: 1, marginRight: 10 },
  metaAuthor: { fontWeight: '700', color: '#1F2937' },
  textDropdownPosition: { top: undefined, bottom: 45, right: 16 },
  dropdown: { position: 'absolute', top: 56, right: 18, backgroundColor: '#FFFFFF', borderRadius: 14, zIndex: 999, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 5 },
  dropdownItem: { paddingHorizontal: 18, paddingVertical: 14 },
  dropdownText: { fontSize: 15, color: '#DC2626', fontWeight: '600' },
});
