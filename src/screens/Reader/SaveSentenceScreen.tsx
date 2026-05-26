import { sentenceService } from '../../services/sentenceService';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSentenceStore } from '../../store/sentenceStore';
import { mockBackgrounds } from '../../constants/mockBackgrounds';

export default function SaveSentenceScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { selectedSentence } = route.params || {};
  useEffect(() => {
    console.log(" 저장 화면이 받은 데이터 객체:", selectedSentence);
  }, []);
  const sentenceText = selectedSentence?.text || "선택된 문장이 없습니다."; 

  const addSentence = useSentenceStore((state) => state.addSentence);

  const [selectedBackground, setSelectedBackground] = useState(0);
  const [selectedFont, setSelectedFont] = useState('KoPub');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [fontSize, setFontSize] = useState(24);

  const handleSave = async () => {
    const groupId = Date.now();
    console.log(" 저장 버튼 클릭 시점 데이터 확인:", {
    author: selectedSentence?.author,
    title: selectedSentence?.bookTitle
  });
    try {
      //  1. 로컬 이미지 카드 저장 (Zustand)
      
      addSentence({
        id: groupId,
        groupId: groupId,
        
        text: sentenceText,
        background: selectedBackground,
        font: selectedFont,
        textAlign,
        fontSize,
        type: 'image',
        createdAt: new Date().toISOString(),
        author: selectedSentence?.author || '앙투안 드 생텍쥐페리', // 책 저자 보존
        bookTitle: selectedSentence?.bookTitle || '어린 왕자',      // 책 제목 보존
      });

      //  2. 로컬 TEXT 카드 저장 (Zustand)
      addSentence({
        id: groupId + 1,
        groupId: groupId,
        text: sentenceText,
        background: selectedBackground,
        font: selectedFont,
        textAlign,
        fontSize,
        type: 'text',
        createdAt: new Date().toISOString(),
        author: selectedSentence?.author || '앙투안 드 생텍쥐페리',
        bookTitle: selectedSentence?.bookTitle || '어린 왕자',
      });

      //  3. 백엔드 실시간 API 규격 매핑 저장 전송 (POST /reading/{sessionId}/saved-sentences)
      const sessionId = selectedSentence?.sessionId || 1;
      
      // 배경 이미지 리소스를 문자열 URL 형태로 유연하게 백엔드 가드 전달
      const backendImageUrl = (mockBackgrounds[selectedBackground] as any)?.url || `BG_IMAGE_${selectedBackground}`;

      await sentenceService.saveSentence(
        sessionId,
        {
          selectedText: sentenceText,
          imageUrl: backendImageUrl,
          fontFamily: selectedFont === 'KoPub' ? 'KOPUB_BATANG' :
                      selectedFont === 'NotoSans' ? 'NOTO_SANS' : 'NANUM_MYEONGJO',
          fontSize: fontSize,
          startOffset: selectedSentence.startOffset,
          endOffset: selectedSentence.endOffset,
        }
      );

      console.log(' 백엔드 서버 및 로컬 문장 카드 동시 저장 완료');

      //  다시 독서 리더 뷰어로 복귀
      navigation.goBack();

    } catch (error) {
      console.error('문장 저장 최종 에러 발생:', error);
      // 실패해도 화면 흐름이 튕기거나 UX가 무너지지 않도록 예외 처리 후 부드럽게 복귀
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>문장 저장하기</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 미리보기 카드 */}
          <View style={styles.previewCard}>
            <Image
              source={mockBackgrounds[selectedBackground]?.image}
              style={styles.previewImage}
              resizeMode="cover"
            />
            {/* 글자색 검은색 고정 및 그림자 완벽 제거 */}
            <View style={[styles.previewTextContainer, { alignItems: textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center' }]}>
              <Text
                style={[
                  styles.previewText,
                  {
                    textAlign,
                    fontSize,
                    lineHeight: fontSize * 1.6,
                    fontFamily: selectedFont,
                  },
                ]}
              >
                "{sentenceText}"
              </Text>
            </View>
          </View>

          {/* 배경 스타일 슬라이더 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>배경 스타일</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {mockBackgrounds.map((background, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.backgroundButton,
                    selectedBackground === index && styles.activeBackground,
                  ]}
                  onPress={() => setSelectedBackground(index)}
                >
                  <Image
                    source={background.image}
                    style={styles.backgroundThumbnail}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* 옵션 영역 */}
          <View style={styles.optionRow}>
            
            {/* 글꼴 선택 */}
            <View style={styles.fontSection}>
              <Text style={styles.sectionTitle}>글꼴</Text>
              <View style={styles.fontCard}>
                {[
                  { label: 'Kopub 바탕체', value: 'KoPub' },
                  { label: '본고딕', value: 'NotoSans' },
                  { label: '나눔명조', value: 'Nanum' },
                ].map((font) => (
                  <TouchableOpacity
                    key={font.value}
                    style={[
                      styles.fontButton,
                      selectedFont === font.value && styles.activeFontButton,
                    ]}
                    onPress={() => setSelectedFont(font.value)}
                  >
                    <Text style={[
                      styles.fontButtonText,
                      selectedFont === font.value && styles.activeFontButtonText
                    ]}>
                      {font.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* 정렬 및 크기 */}
            <View style={styles.controlSection}>
              <Text style={styles.sectionTitle}>정렬 및 크기</Text>
              <View style={styles.controlCard}>
                
                {/* 가로줄 정렬 아이콘 팩 */}
                <View style={styles.alignContainer}>
                  {[
                    { icon: 'format-align-left', value: 'left' },     
                    { icon: 'format-align-center', value: 'center' }, 
                    { icon: 'format-align-right', value: 'right' },   
                  ].map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      style={[
                        styles.alignButton,
                        textAlign === item.value && styles.activeAlignButton,
                      ]}
                      onPress={() => setTextAlign(item.value as any)}
                    >
                      <MaterialCommunityIcons
                        name={item.icon as any}
                        size={22}
                        color={textAlign === item.value ? '#2563EB' : '#9CA3AF'}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 글자 크기 조절 */}
                <View style={styles.fontSizeContainer}>
                  <TouchableOpacity
                    style={styles.sizeButton}
                    onPress={() => setFontSize(Math.max(16, fontSize - 2))}
                  >
                    <Ionicons name="remove" size={20} color="#374151" />
                  </TouchableOpacity>
                  
                  <Text style={styles.fontSizeText}>{fontSize}</Text>
                  
                  <TouchableOpacity
                    style={styles.sizeButton}
                    onPress={() => setFontSize(Math.min(40, fontSize + 2))}
                  >
                    <Ionicons name="add" size={20} color="#374151" />
                  </TouchableOpacity>
                </View>

              </View>
            </View>

          </View>
        </ScrollView>

        {/* 저장 버튼 */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FC', 
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  previewCard: {
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 32,
    overflow: 'hidden',
    position: 'relative',
    height: 340,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  previewText: {
    color: '#111827', 
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 12,
  },
  backgroundButton: {
    width: 72,
    height: 72,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeBackground: {
    borderColor: '#2563EB',
  },
  backgroundThumbnail: {
    width: '100%',
    height: '100%',
  },
  optionRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 24,
    justifyContent: 'space-between',
  },
  fontSection: {
    width: '47%',
  },
  controlSection: {
    width: '47%',
  },
  fontCard: {
    backgroundColor: '#EEF2FF', 
    borderRadius: 24,
    padding: 8,
    minHeight: 160,
  },
  fontButton: {
    height: 44,
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 14,
    backgroundColor: 'transparent',
  },
  activeFontButton: {
    backgroundColor: '#FFFFFF', 
    borderWidth: 1.5,
    borderColor: '#2563EB',
  },
  fontButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  activeFontButtonText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  controlCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 24,
    padding: 8,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  alignContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', 
    borderRadius: 16,
    padding: 4,
    justifyContent: 'space-between',
  },
  alignButton: {
    flex: 1,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeAlignButton: {
    backgroundColor: '#DBEAFE', 
  },
  fontSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  sizeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontSizeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  saveButton: {
    height: 56,
    backgroundColor: '#2563EB',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});