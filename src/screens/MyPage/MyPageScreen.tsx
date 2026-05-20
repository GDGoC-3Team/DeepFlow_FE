import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { sentenceService } from '../../services/sentenceService';
import { useSentenceStore } from '../../store/sentenceStore';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import ProfileTab from '../../components/mypage/ProfileTab';
import SavedSentenceTab from '../../components/mypage/SavedSentenceTab';
import ReadingRecordTab from '../../components/mypage/ReadingRecordTab';
import { SettingTab } from '../../components/mypage/SettingTab'; 
import { Ionicons } from '@expo/vector-icons';

// 🎯 [아키텍처 분리] homeService 대신 찢어놓은 userService를 완벽히 바인딩!
import { userService } from '../../services/userService'; 

export function MyPageScreen() { // 💡 내비게이터 붉은 줄을 방지하기 위한 구조 명시

  const [selectedTab, setSelectedTab] =
    useState<
      'profile' |
      'saved' |
      'record' |
      'setting'
    >('profile');
  const navigation = useNavigation<any>();

  const [nickname, setNickname] = useState<string>('독서하는고래');
  const [email, setEmail] = useState<string>('reader@example.com');
  
  // 💡 Swagger 8페이지(/reading/habbit) 실측 지표 수급용 상태 변수
  const [streakDays, setStreakDays] = useState<number>(0);
  const [displayBlocks, setDisplayBlocks] = useState<number>(0);

  const [totalReadingTime, setTotalReadingTime] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. /users/me 호출로 기본 유저 정보 연동
        const userRes = await userService.getUserMe();
        if (userRes && userRes.success) {
          setNickname(userRes.data.nickname);
          setEmail(userRes.data.email);
        }

        // 2. 🎯 [Swagger 8페이지 싱크 완료] 진짜 백엔드 필드명인 streak_days와 display_blocks로 매핑 수급!
        const statsRes = await userService.getUserStats();
        if (statsRes && statsRes.success) {
          setStreakDays(statsRes.data.streak_days || 0);
          setDisplayBlocks(statsRes.data.display_blocks || 0);
        }
        console.log('[실서버] 저장한 문장 목록 동기화 시작');
        const savedListFromServer = await sentenceService.getMySentences('all', 'latest');
        if (savedListFromServer && savedListFromServer.length > 0) {
          const dualProcessedSentences: any[] = [];

          savedListFromServer.forEach((item: any) => {
            // 🖼️ 1. 이미지 칸 전용 칩
            dualProcessedSentences.push({
              ...item,
              id: item.id * 10000, 
              originalId: item.id, // ✨ 서버 DB 삭제용 진짜 원본 ID 저장!
              type: 'image',   
              text: item.content || item.text, 
              author: item.author,
              font: 'Kopub',
              imageUrl: item.imageUrl || "https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png"
            });

            // 📝 2. 텍스트 칸 전용 칩
            dualProcessedSentences.push({
              ...item,
              id: item.id * 10000,
              originalId: item.id, // ✨ 텍스트 버전에도 똑같은 진짜 ID 매핑!
              type: 'text',    
              text: item.content || item.text,
              author: item.author,
              font: 'Kopub',
              imageUrl: '' 
            });
          });

          // Zustand 상자에 강제 업데이트
          useSentenceStore.setState({ savedSentences: dualProcessedSentences });
        } else {
          useSentenceStore.setState({ savedSentences: [] });
        }

      } catch (error) {
        console.error('❌ 마이페이지 통합 데이터 동기화 최종 실패:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backWrapper}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#111827"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>마이페이지</Text>
      </View>

      {/* 상단 탭 */}
      <View style={styles.tabRow}>
        {['profile', 'saved', 'record', 'setting'].map((tab) => {
          const tabLabels: Record<string, string> = {
            profile: '프로필 설정',
            saved: '저장한 문장',
            record: '독서 기록',
            setting: '설정',
          };
          return (
            <TouchableOpacity
              key={tab}
              style={styles.tabButton}
              onPress={() => setSelectedTab(tab as any)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                {tabLabels[tab]}
              </Text>
              {selectedTab === tab && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 탭 내용 */}
      <View style={styles.content}>
        {selectedTab === 'profile' && (
          // 💡 ProfileTab 컴포넌트에 실시간 백엔드 가변 스펙 데이터 패스!
          <ProfileTab 
            nickname={nickname} 
            email={email} 
            streakDays={streakDays} 
            displayBlocks={displayBlocks}
            totalReadingTime={totalReadingTime}
          />
        )}
        {selectedTab === 'saved' && <SavedSentenceTab />}
        {selectedTab === 'record' && <ReadingRecordTab />}
        {selectedTab === 'setting' && <SettingTab />}
      </View>

    </SafeAreaView>
  );
}

// 🎯 TabNavigator 임포트 오류("기본 내보내기가 없습니다") 꿀밤 에러 영구 격파 치트키!
export default MyPageScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FC' },
  header: { height: 72, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', position: 'relative' },
  backWrapper: { position: 'absolute', left: 20, top: 0, bottom: 0, justifyContent: 'center' },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#111827' },
  tabRow: { flexDirection: 'row', backgroundColor: '#FFFFFF' },
  tabButton: { flex: 1, alignItems: 'center', paddingTop: 14, paddingBottom: 12, position: 'relative' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#9CA3AF' },
  activeTabText: { color: '#2563EB' },
  indicator: { position: 'absolute', bottom: 0, width: '100%', height: 3, backgroundColor: '#2563EB' },
  content: { flex: 1 },
});