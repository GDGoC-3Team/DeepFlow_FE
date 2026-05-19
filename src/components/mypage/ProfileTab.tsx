import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
// 💡 1. 자식이 받아올 파라미터(Props)들의 타입을 명확하게 등록합니다.
type ProfileTabProps = {
  nickname: string;
  email: string;
  streakDays: number;
  totalReadingTime: number;
};
export default function ProfileTab({
  nickname,
  email,
  streakDays,
  totalReadingTime,
}: ProfileTabProps) {

  const activeBarsCount = Math.min(7, streakDays);
  const inactiveBarsCount = Math.max(0, 7 - activeBarsCount);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}
    >

      {/* 프로필 카드 */}
      <View style={styles.profileCard}>

        <Text style={styles.memberText}>
          DEEPFLOW MEMBER
        </Text>

        <Text style={styles.name}>
          김수정
        </Text>

        <Text style={styles.email}>
          crystalkim@gmail.com
        </Text>

      </View>

      {/* 독서 카드 */}
      <View style={styles.recordCard}>

        <View style={styles.recordTop}>

          <View>

            <Text style={styles.recordLabel}>
              연속 독서
            </Text>

            <Text style={styles.dayText}>
              5
              <Text style={styles.dayUnit}>
                일
              </Text>
            </Text>

            <Text style={styles.recordSub}>
              깊은 몰입의 시간
            </Text>

          </View>

          <View style={{ alignItems: 'flex-end' }}>

            <Text style={styles.recordLabel}>
              최고 기록
            </Text>

            <Text style={styles.bestDay}>
              12일
            </Text>

          </View>

        </View>

        <View style={styles.barRow}>

          {[1, 2, 3, 4, 5].map((item) => (
            <View
              key={item}
              style={styles.activeBar}
            />
          ))}

          <View style={styles.inactiveBar} />
          <View style={styles.inactiveBar} />

        </View>

      </View>

      {/* 문구 */}
      <Text style={styles.quote}>
        "Keep flowing with the sentences that move you."
      </Text>

      {/* 로그아웃 */}
      <TouchableOpacity style={styles.logoutButton}>

        <Ionicons
          name="log-out-outline"
          size={22}
          color="#DC2626"
        />

        <Text style={styles.logoutText}>
          로그아웃
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },

  profileCard: {
    backgroundColor: '#2563EB',

    paddingHorizontal: 20,
    paddingVertical: 28,
  },

  memberText: {
    fontSize: 12,
    color: '#BFDBFE',

    marginBottom: 10,
  },

  name: {
    fontSize: 36,
    fontWeight: '700',

    color: '#FFFFFF',
  },

  email: {
    fontSize: 16,
    color: '#DBEAFE',

    marginTop: 8,
  },

  recordCard: {
    backgroundColor: '#FFFFFF',

    marginTop: 20,
    marginHorizontal: 20,

    borderRadius: 28,

    padding: 24,
  },

  recordTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  recordLabel: {
    fontSize: 16,
    color: '#6B7280',

    marginBottom: 8,
  },

  dayText: {
    fontSize: 52,
    fontWeight: '700',

    color: '#2563EB',
  },

  dayUnit: {
    fontSize: 22,
    color: '#6B7280',
  },

  recordSub: {
    fontSize: 14,
    color: '#9CA3AF',

    marginTop: 6,
  },

  bestDay: {
    fontSize: 40,
    fontWeight: '700',

    color: '#111827',
  },

  barRow: {
    flexDirection: 'row',

    marginTop: 28,
  },

  activeBar: {
    flex: 1,

    height: 10,

    backgroundColor: '#2563EB',

    borderRadius: 999,

    marginRight: 6,
  },

  inactiveBar: {
    flex: 1,

    height: 10,

    backgroundColor: '#DBEAFE',

    borderRadius: 999,

    marginRight: 6,
  },

  quote: {
    marginTop: 90,

    textAlign: 'center',

    fontSize: 24,
    fontStyle: 'italic',

    color: '#9CA3AF',

    lineHeight: 38,

    paddingHorizontal: 40,
  },

  logoutButton: {
    height: 64,

    borderWidth: 1,
    borderColor: '#FCA5A5',

    borderRadius: 20,

    marginHorizontal: 20,

    marginTop: 120,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutText: {
    fontSize: 18,
    fontWeight: '700',

    color: '#DC2626',

    marginLeft: 8,
  },

});