
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