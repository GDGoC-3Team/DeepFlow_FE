import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProfileTab from '../../components/mypage/ProfileTab';
import SavedSentenceTab from '../../components/mypage/SavedSentenceTab'; 
import ReadingRecordTab from '../../components/mypage/ReadingRecordTab';
import { SettingTab } from '../../components/mypage/SettingTab'; 
import { homeService } from '../../services/homeService'; 
import { API_CONFIG } from '../../config/apiConfig'; 

export default function MyPageScreen() {
  const [selectedTab, setSelectedTab] = useState<'profile' | 'saved' | 'record' | 'setting'>('profile');
  const navigation = useNavigation<any>();

  const [nickname, setNickname] = useState<string>('독서하는고래');
  const [email, setEmail] = useState<string>('reader@example.com');
  const [streakDays, setStreakDays] = useState<number>(7);
  const [totalReadingTime, setTotalReadingTime] = useState<number>(120);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (API_CONFIG.USE_MOCK) {
          setNickname('독서하는고래');
          setEmail('reader@example.com');
          setStreakDays(7); 
          setTotalReadingTime(120);
          return; 
        }

        const userRes = await homeService.getUserMe();
        if (userRes && userRes.success) {
          setNickname(userRes.data.nickname);
          setEmail(userRes.data.email);
        }

        const statsRes = await homeService.getUserStats(); 
        if (statsRes && statsRes.success) {
          setStreakDays(statsRes.data.streakDays);
          setTotalReadingTime(statsRes.data.totalReadingTime);
        }
      } catch (error) {
        console.error(' 마이페이지 정보 로딩 실패:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backWrapper} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>마이페이지</Text>
      </View>

      <View style={styles.tabRow}>
        {/* 탭 버튼들 */}
        {['profile', 'saved', 'record', 'setting'].map((tab) => (
          <TouchableOpacity key={tab} style={styles.tabButton} onPress={() => setSelectedTab(tab as any)}>
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab === 'profile' ? '프로필 설정' : tab === 'saved' ? '저장한 문장' : tab === 'record' ? '독서 기록' : '설정'}
            </Text>
            {selectedTab === tab && <View style={styles.indicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {selectedTab === 'profile' && <ProfileTab nickname={nickname} email={email} streakDays={streakDays} totalReadingTime={totalReadingTime} />}
        {selectedTab === 'saved' && <SavedSentenceTab />}
        {selectedTab === 'record' && <ReadingRecordTab />}
        {selectedTab === 'setting' && <SettingTab />}
      </View>
    </SafeAreaView>
  );
}

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