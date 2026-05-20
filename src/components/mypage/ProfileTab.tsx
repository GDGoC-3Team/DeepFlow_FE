// import {
//   ScrollView,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';

// import Ionicons from '@expo/vector-icons/Ionicons';
// // 💡 1. 자식이 받아올 파라미터(Props)들의 타입을 명확하게 등록합니다.
// type ProfileTabProps = {
//   nickname: string;
//   email: string;
//   streakDays: number;
//   totalReadingTime: number;
//   displayBlocks: number;
// };
// export default function ProfileTab({
//   nickname,
//   email,
//   streakDays,
//   totalReadingTime,
//   displayBlocks
// }: ProfileTabProps) {

//   const activeBarsCount = Math.min(7, streakDays);
//   const inactiveBarsCount = Math.max(0, 7 - activeBarsCount);
//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={{
//         paddingBottom: 120,
//       }}
//       showsVerticalScrollIndicator={false}
//     >

//       {/* 프로필 카드 */}
//       <View style={styles.profileCard}>

//         <Text style={styles.memberText}>
//           DEEPFLOW MEMBER
//         </Text>

//         <Text style={styles.name}>
//           김수정
//         </Text>

//         <Text style={styles.email}>
//           crystalkim@gmail.com
//         </Text>

//       </View>

//       {/* 독서 카드 */}
//       <View style={styles.recordCard}>

//         <View style={styles.recordTop}>

//           <View>

//             <Text style={styles.recordLabel}>
//               연속 독서
//             </Text>

//             <Text style={styles.dayText}>
//               5
//               <Text style={styles.dayUnit}>
//                 일
//               </Text>
//             </Text>

//             <Text style={styles.recordSub}>
//               깊은 몰입의 시간
//             </Text>

//           </View>

//           <View style={{ alignItems: 'flex-end' }}>

//             <Text style={styles.recordLabel}>
//               최고 기록
//             </Text>

//             <Text style={styles.bestDay}>
//               12일
//             </Text>

//           </View>

//         </View>

//         <View style={styles.barRow}>

//           {[1, 2, 3, 4, 5].map((item) => (
//             <View
//               key={item}
//               style={styles.activeBar}
//             />
//           ))}

//           <View style={styles.inactiveBar} />
//           <View style={styles.inactiveBar} />

//         </View>

//       </View>

//       {/* 문구 */}
//       <Text style={styles.quote}>
//         "Keep flowing with the sentences that move you."
//       </Text>

//       {/* 로그아웃 */}
//       <TouchableOpacity style={styles.logoutButton}>

//         <Ionicons
//           name="log-out-outline"
//           size={22}
//           color="#DC2626"
//         />

//         <Text style={styles.logoutText}>
//           로그아웃
//         </Text>

//       </TouchableOpacity>

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: '#F7F8FC',
//   },

//   profileCard: {
//     backgroundColor: '#2563EB',

//     paddingHorizontal: 20,
//     paddingVertical: 28,
//   },

//   memberText: {
//     fontSize: 12,
//     color: '#BFDBFE',

//     marginBottom: 10,
//   },

//   name: {
//     fontSize: 36,
//     fontWeight: '700',

//     color: '#FFFFFF',
//   },

//   email: {
//     fontSize: 16,
//     color: '#DBEAFE',

//     marginTop: 8,
//   },

//   recordCard: {
//     backgroundColor: '#FFFFFF',

//     marginTop: 20,
//     marginHorizontal: 20,

//     borderRadius: 28,

//     padding: 24,
//   },

//   recordTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },

//   recordLabel: {
//     fontSize: 16,
//     color: '#6B7280',

//     marginBottom: 8,
//   },

//   dayText: {
//     fontSize: 52,
//     fontWeight: '700',

//     color: '#2563EB',
//   },

//   dayUnit: {
//     fontSize: 22,
//     color: '#6B7280',
//   },

//   recordSub: {
//     fontSize: 14,
//     color: '#9CA3AF',

//     marginTop: 6,
//   },

//   bestDay: {
//     fontSize: 40,
//     fontWeight: '700',

//     color: '#111827',
//   },

//   barRow: {
//     flexDirection: 'row',

//     marginTop: 28,
//   },

//   activeBar: {
//     flex: 1,

//     height: 10,

//     backgroundColor: '#2563EB',

//     borderRadius: 999,

//     marginRight: 6,
//   },

//   inactiveBar: {
//     flex: 1,

//     height: 10,

//     backgroundColor: '#DBEAFE',

//     borderRadius: 999,

//     marginRight: 6,
//   },

//   quote: {
//     marginTop: 90,

//     textAlign: 'center',

//     fontSize: 24,
//     fontStyle: 'italic',

//     color: '#9CA3AF',

//     lineHeight: 38,

//     paddingHorizontal: 40,
//   },

//   logoutButton: {
//     height: 64,

//     borderWidth: 1,
//     borderColor: '#FCA5A5',

//     borderRadius: 20,

//     marginHorizontal: 20,

//     marginTop: 120,

//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   logoutText: {
//     fontSize: 18,
//     fontWeight: '700',

//     color: '#DC2626',

//     marginLeft: 8,
//   },

// });
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type ProfileTabProps = {
  nickname: string;
  email: string;
  streakDays: number;
  totalReadingTime: number;
  displayBlocks: number;
};

export default function ProfileTab({
  nickname,
  email,
  streakDays,
  totalReadingTime,
  displayBlocks
}: ProfileTabProps) {

  // 🎯 [게이지 바 동적 계산 수식]
  // 일주일(7일)을 기준으로, 채워질 파란색 바 개수를 계산합니다.
  const activeBarsCount = Math.min(7, streakDays); 
  const inactiveBarsCount = Math.max(0, 7 - activeBarsCount);

  // 7개의 칸을 만들기 위해 각각 배열로 변환
  const activeArray = Array.from({ length: activeBarsCount }, (_, i) => i);
  const inactiveArray = Array.from({ length: inactiveBarsCount }, (_, i) => i);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >

      {/* 프로필 카드 - 부모(MyPageScreen)가 가져온 실서버 정보 바인딩 */}
      <View style={styles.profileCard}>
        <Text style={styles.memberText}>DEEPFLOW MEMBER</Text>
        {/* 🎯 "김수정" 하드코딩 탈출 -> 실제 로그인 유저 닉네임 연동 */}
        <Text style={styles.name}>{nickname}</Text>
        {/* 🎯 실제 이메일 연동 */}
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* 독서 기록 스트릭 카드 */}
      <View style={styles.recordCard}>
        <View style={styles.recordTop}>
          <View>
            <Text style={styles.recordLabel}>연속 독서</Text>
            {/* 🎯 "5일" 고정 탈출 -> 서버에서 내려준 진짜 스트릭 일수 매핑 */}
            <Text style={styles.dayText}>
              {streakDays}
              <Text style={styles.dayUnit}> 일</Text>
            </Text>
            <Text style={styles.recordSub}>깊은 몰입의 시간</Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.recordLabel}>최고 기록</Text>
            
            <Text style={styles.bestDay}>{displayBlocks}일</Text>
          </View>
        </View>

        {/* 🎯 [하루 한 칸씩 채워지는 게이지 바] */}
        <View style={styles.barRow}>
          {/* 채워진 파란색 칸들 (streakDays만큼) */}
          {activeArray.map((item) => (
            <View key={`active-${item}`} style={styles.activeBar} />
          ))}

          {/* 남은 연한 파란색 칸들 */}
          {inactiveArray.map((item) => (
            <View key={`inactive-${item}`} style={styles.inactiveBar} />
          ))}
        </View>
      </View>

      {/* 하단 감성 문구 */}
      <Text style={styles.quote}>
        "Keep flowing with the sentences that move you."
      </Text>

      {/* 로그아웃 버튼 */}
      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={22} color="#DC2626" />
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FC' },
  profileCard: { backgroundColor: '#2563EB', paddingHorizontal: 20, paddingVertical: 28 },
  memberText: { fontSize: 12, color: '#BFDBFE', marginBottom: 10 },
  name: { fontSize: 36, fontWeight: '700', color: '#FFFFFF' },
  email: { fontSize: 16, color: '#DBEAFE', marginTop: 8 },
  recordCard: { backgroundColor: '#FFFFFF', marginTop: 20, marginHorizontal: 20, borderRadius: 28, padding: 24 },
  recordTop: { flexDirection: 'row', justifyContent: 'space-between' },
  recordLabel: { fontSize: 16, color: '#6B7280', marginBottom: 8 },
  dayText: { fontSize: 52, fontWeight: '700', color: '#2563EB' },
  dayUnit: { fontSize: 22, color: '#6B7280' },
  recordSub: { fontSize: 14, color: '#9CA3AF', marginTop: 6 },
  bestDay: { fontSize: 32, fontWeight: '700', color: '#111827' },
  barRow: { flexDirection: 'row', marginTop: 28 },
  activeBar: { flex: 1, height: 10, backgroundColor: '#2563EB', borderRadius: 999, marginRight: 6 },
  inactiveBar: { flex: 1, height: 10, backgroundColor: '#DBEAFE', borderRadius: 999, marginRight: 6 },
  quote: { marginTop: 90, textAlign: 'center', fontSize: 24, fontStyle: 'italic', color: '#9CA3AF', lineHeight: 38, paddingHorizontal: 40 },
  logoutButton: { height: 64, borderWidth: 1, borderColor: '#FCA5A5', borderRadius: 20, marginHorizontal: 20, marginTop: 120, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  logoutText: { fontSize: 18, fontWeight: '700', color: '#DC2626', marginLeft: 8 },
});