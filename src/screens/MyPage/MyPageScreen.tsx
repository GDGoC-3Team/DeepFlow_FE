// // // import { useState } from 'react';
// // // import { useNavigation } from '@react-navigation/native';

// // // import {
// // //   SafeAreaView,
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   TouchableOpacity,
// // // } from 'react-native';

// // // import ProfileTab from '../../components/mypage/ProfileTab';
// // // import SavedSentenceTab from '../../components/mypage/SavedSentenceTab';
// // // import ReadingRecordTab from '../../components/mypage/ReadingRecordTab';
// // // import { Ionicons } from '@expo/vector-icons';

// // // export default function MyPageScreen() {

// // //   const [selectedTab, setSelectedTab] =
// // //     useState<
// // //       'profile' |
// // //       'saved' |
// // //       'record' |
// // //       'setting'
// // //     >('profile');
// // //   const navigation = useNavigation<any>();

// // //   return (

// // //     <SafeAreaView style={styles.container}>

// // //       {/* 헤더 */}
// // //       <View style={styles.header}>

// // //         <TouchableOpacity
// // //           style={styles.backWrapper}
// // //           onPress={() => navigation.goBack()}
// // //         >
// // //           <Ionicons
// // //             name="arrow-back"
// // //             size={24}
// // //             color="#111827"
// // //           />
// // //         </TouchableOpacity>

// // //         <Text style={styles.headerTitle}>
// // //           마이페이지
// // //         </Text>

// // //       </View>

// // //       {/* 상단 탭 */}
// // //       <View style={styles.tabRow}>

// // //         {/* 프로필 설정 */}
// // //         <TouchableOpacity
// // //           style={styles.tabButton}
// // //           onPress={() =>
// // //             setSelectedTab('profile')
// // //           }
// // //         >

// // //           <Text
// // //             style={[
// // //               styles.tabText,

// // //               selectedTab === 'profile' &&
// // //                 styles.activeTabText,
// // //             ]}
// // //           >
// // //             프로필 설정
// // //           </Text>

// // //           {
// // //             selectedTab === 'profile' && (
// // //               <View style={styles.indicator} />
// // //             )
// // //           }

// // //         </TouchableOpacity>

// // //         {/* 저장한 문장 */}
// // //         <TouchableOpacity
// // //           style={styles.tabButton}
// // //           onPress={() =>
// // //             setSelectedTab('saved')
// // //           }
// // //         >

// // //           <Text
// // //             style={[
// // //               styles.tabText,

// // //               selectedTab === 'saved' &&
// // //                 styles.activeTabText,
// // //             ]}
// // //           >
// // //             저장한 문장
// // //           </Text>

// // //           {
// // //             selectedTab === 'saved' && (
// // //               <View style={styles.indicator} />
// // //             )
// // //           }

// // //         </TouchableOpacity>

// // //         {/* 독서 기록 */}
// // //         <TouchableOpacity
// // //           style={styles.tabButton}
// // //           onPress={() =>
// // //             setSelectedTab('record')
// // //           }
// // //         >

// // //           <Text
// // //             style={[
// // //               styles.tabText,

// // //               selectedTab === 'record' &&
// // //                 styles.activeTabText,
// // //             ]}
// // //           >
// // //             독서 기록
// // //           </Text>

// // //           {
// // //             selectedTab === 'record' && (
// // //               <View style={styles.indicator} />
// // //             )
// // //           }

// // //         </TouchableOpacity>

// // //         {/* 설정 */}
// // //         <TouchableOpacity
// // //           style={styles.tabButton}
// // //           onPress={() =>
// // //             setSelectedTab('setting')
// // //           }
// // //         >

// // //           <Text
// // //             style={[
// // //               styles.tabText,

// // //               selectedTab === 'setting' &&
// // //                 styles.activeTabText,
// // //             ]}
// // //           >
// // //             설정
// // //           </Text>

// // //           {
// // //             selectedTab === 'setting' && (
// // //               <View style={styles.indicator} />
// // //             )
// // //           }

// // //         </TouchableOpacity>

// // //       </View>

// // //       {/* 탭 내용 */}
// // //       <View style={styles.content}>

// // //         {
// // //           selectedTab === 'profile' && (
// // //             <ProfileTab />
// // //           )
// // //         }

// // //         {
// // //           selectedTab === 'saved' && (
// // //             <SavedSentenceTab />
// // //           )
// // //         }

// // //         {
// // //           selectedTab === 'record' && (
// // //             <ReadingRecordTab />
// // //           )
// // //         }

// // //         {
// // //           selectedTab === 'setting' && (
// // //             <View style={styles.settingContainer}>

// // //               <Text style={styles.settingText}>
// // //                 설정 페이지 준비중
// // //               </Text>

// // //             </View>
// // //           )
// // //         }

// // //       </View>

// // //     </SafeAreaView>

// // //   );
// // // }

// // // const styles = StyleSheet.create({

// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#F7F8FC',
// // //   },

// // //   header: {
// // //     height: 72,

// // //     justifyContent: 'center',
    
// // //     alignItems: 'center',
    

// // //     backgroundColor: '#FFFFFF',
// // //     position: 'relative',
   
// // //   },
// // //   backWrapper: {
// // //   position: 'absolute',

// // //   left: 20,

// // //   top: 0,
// // //   bottom: 0,

// // //   justifyContent: 'center',
// // // },
// // //   backButton: {
// // //   fontSize: 28,

// // //   color: '#111827',

// // //   marginRight: 16,
// // // },
   
  

// // //   headerTitle: {
// // //     fontSize: 24,

// // //     fontWeight: '700',

// // //     color: '#111827',
// // //   },

// // //   tabRow: {
// // //     flexDirection: 'row',

// // //     backgroundColor: '#FFFFFF',

    
// // //   },

// // //   tabButton: {
// // //     flex: 1,

// // //     alignItems: 'center',

// // //     paddingTop: 14,
// // //     paddingBottom: 12,

// // //     position: 'relative',
// // //   },

// // //   tabText: {
// // //     fontSize: 14,

// // //     fontWeight: '600',

// // //     color: '#9CA3AF',
// // //   },

// // //   activeTabText: {
// // //     color: '#2563EB',
// // //   },

// // //   indicator: {
// // //     position: 'absolute',

// // //     bottom: 0,

// // //     width: '100%',
// // //     height: 3,

// // //     backgroundColor: '#2563EB',
// // //   },

// // //   content: {
// // //     flex: 1,
// // //   },

// // //   settingContainer: {
// // //     flex: 1,

// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },

// // //   settingText: {
// // //     fontSize: 18,

// // //     color: '#6B7280',

// // //     fontWeight: '600',
// // //   },

// // // });
// // import { useState, useEffect } from 'react';
// // import { useNavigation } from '@react-navigation/native';

// // import {
// //   SafeAreaView,
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// // } from 'react-native';

// // import ProfileTab from '../../components/mypage/ProfileTab';
// // import SavedSentenceTab from '../../components/mypage/SavedSentenceTab';
// // import ReadingRecordTab from '../../components/mypage/ReadingRecordTab';
// // import {SettingTab} from '../../components/mypage/SettingTab'; // 💡 구조에 대기 중인 설정 탭 임포트
// // import { Ionicons } from '@expo/vector-icons';
// // import { homeService } from '../../services/homeService'; // 💡 유저 정보 연동용

// // export default function MyPageScreen() {

// //   const [selectedTab, setSelectedTab] =
// //     useState<
// //       'profile' |
// //       'saved' |
// //       'record' |
// //       'setting'
// //     >('profile');
// //   const navigation = useNavigation<any>();

// //   // 💡 자식 탭 컴포넌트들에게 공유할 동적 사용자 정보 상태 추가
// //   const [nickname, setNickname] = useState<string>('독서하는고래');
// //   const [email, setEmail] = useState<string>('reader@example.com');

// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       try {
// //         const userRes = await homeService.getUserMe();
// //         if (userRes && userRes.success) {
// //           setNickname(userRes.data.nickname);
// //           setEmail(userRes.data.email);
// //         }
// //       } catch (error) {
// //         console.error('마이페이지 유저 정보 로딩 실패:', error);
// //       }
// //     };
// //     fetchUserData();
// //   }, []);

// //   return (

// //     <SafeAreaView style={styles.container}>

// //       {/* 헤더 */}
// //       <View style={styles.header}>

// //         <TouchableOpacity
// //           style={styles.backWrapper}
// //           onPress={() => navigation.goBack()}
// //         >
// //           <Ionicons
// //             name="arrow-back"
// //             size={24}
// //             color="#111827"
// //           />
// //         </TouchableOpacity>

// //         <Text style={styles.headerTitle}>
// //           마이페이지
// //         </Text>

// //       </View>

// //       {/* 상단 탭 */}
// //       <View style={styles.tabRow}>

// //         {/* 프로필 설정 */}
// //         <TouchableOpacity
// //           style={styles.tabButton}
// //           onPress={() =>
// //             setSelectedTab('profile')
// //           }
// //         >

// //           <Text
// //             style={[
// //               styles.tabText,

// //               selectedTab === 'profile' &&
// //                 styles.activeTabText,
// //             ]}
// //           >
// //             프로필 설정
// //           </Text>

// //           {
// //             selectedTab === 'profile' && (
// //               <View style={styles.indicator} />
// //             )
// //           }

// //         </TouchableOpacity>

// //         {/* 저장한 문장 */}
// //         <TouchableOpacity
// //           style={styles.tabButton}
// //           onPress={() =>
// //             setSelectedTab('saved')
// //           }
// //         >

// //           <Text
// //             style={[
// //               styles.tabText,

// //               selectedTab === 'saved' &&
// //                 styles.activeTabText,
// //             ]}
// //           >
// //             저장한 문장
// //           </Text>

// //           {
// //             selectedTab === 'saved' && (
// //               <View style={styles.indicator} />
// //             )
// //           }

// //         </TouchableOpacity>

// //         {/* 독서 기록 */}
// //         <TouchableOpacity
// //           style={styles.tabButton}
// //           onPress={() =>
// //             setSelectedTab('record')
// //           }
// //         >

// //           <Text
// //             style={[
// //               styles.tabText,

// //               selectedTab === 'record' &&
// //                 styles.activeTabText,
// //             ]}
// //           >
// //             독서 기록
// //           </Text>

// //           {
// //             selectedTab === 'record' && (
// //               <View style={styles.indicator} />
// //             )
// //           }

// //         </TouchableOpacity>

// //         {/* 설정 */}
// //         <TouchableOpacity
// //           style={styles.tabButton}
// //           onPress={() =>
// //             setSelectedTab('setting')
// //           }
// //         >

// //           <Text
// //             style={[
// //               styles.tabText,

// //               selectedTab === 'setting' &&
// //                 styles.activeTabText,
// //             ]}
// //           >
// //             설정
// //           </Text>

// //           {
// //             selectedTab === 'setting' && (
// //               <View style={styles.indicator} />
// //             )
// //           }

// //         </TouchableOpacity>

// //       </View>

// //       {/* 탭 내용 */}
// //       <View style={styles.content}>

// //         {
// //           selectedTab === 'profile' && (
// //             // 💡 백엔드 실시간 프로필 데이터 Props 전달
// //             <ProfileTab />
// //           )
// //         }

// //         {
// //           selectedTab === 'saved' && (
// //             <SavedSentenceTab />
// //           )
// //         }

// //         {
// //           selectedTab === 'record' && (
// //             <ReadingRecordTab />
// //           )
// //         }

// //         {
// //           selectedTab === 'setting' && (
// //             // 💡 다현님 폴더 구조 내에 이미 구현되어 있는 SettingTab 컴포넌트로 대체 연동
// //             <SettingTab />
// //           )
// //         }

// //       </View>

// //     </SafeAreaView>

// //   );
// // }

// // const styles = StyleSheet.create({

// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F7F8FC',
// //   },

// //   header: {
// //     height: 72,

// //     justifyContent: 'center',
    
// //     alignItems: 'center',
    

// //     backgroundColor: '#FFFFFF',
// //     position: 'relative',
   
// //   },
// //   backWrapper: {
// //   position: 'absolute',

// //   left: 20,

// //   top: 0,
// //   bottom: 0,

// //   justifyContent: 'center',
// // },
// //   backButton: {
// //   fontSize: 28,

// //   color: '#111827',

// //   marginRight: 16,
// // },
   
  

// //   headerTitle: {
// //     fontSize: 24,

// //     fontWeight: '700',

// //     color: '#111827',
// //   },

// //   tabRow: {
// //     flexDirection: 'row',

// //     backgroundColor: '#FFFFFF',

    
// //   },

// //   tabButton: {
// //     flex: 1,

// //     alignItems: 'center',

// //     paddingTop: 14,
// //     paddingBottom: 12,

// //     position: 'relative',
// //   },

// //   tabText: {
// //     fontSize: 14,

// //     fontWeight: '600',

// //     color: '#9CA3AF',
// //   },

// //   activeTabText: {
// //     color: '#2563EB',
// //   },

// //   indicator: {
// //     position: 'absolute',

// //     bottom: 0,

// //     width: '100%',
// //     height: 3,

// //     backgroundColor: '#2563EB',
// //   },

// //   content: {
// //     flex: 1,
// //   },

// //   settingContainer: {
// //     flex: 1,

// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },

// //   settingText: {
// //     fontSize: 18,

// //     color: '#6B7280',

// //     fontWeight: '600',
// //   },

// // });
// import { useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';

// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';

// import ProfileTab from '../../components/mypage/ProfileTab';
// import SavedSentenceTab from '../../components/mypage/SavedSentenceTab';
// import ReadingRecordTab from '../../components/mypage/ReadingRecordTab';
// import { SettingTab } from '../../components/mypage/SettingTab'; // 💡 구조에 대기 중인 설정 탭 임포트
// import { Ionicons } from '@expo/vector-icons';
// import { homeService } from '../../services/homeService'; // 💡 유저 정보 연동용

// export default function MyPageScreen() {

//   const [selectedTab, setSelectedTab] =
//     useState<
//       'profile' |
//       'saved' |
//       'record' |
//       'setting'
//     >('profile');
//   const navigation = useNavigation<any>();

//   // 💡 자식 탭 컴포넌트들에게 공유할 동적 사용자 정보 상태 추가
//   const [nickname, setNickname] = useState<string>('독서하는고래');
//   const [email, setEmail] = useState<string>('reader@example.com');
  
//   // 💡 [추가] 백엔드 실측 연속 독서 일수 및 통계 수급을 위한 전역 상태 마련
//   const [streakDays, setStreakDays] = useState<number>(3);
//   const [totalReadingTime, setTotalReadingTime] = useState<number>(0);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // 1. 기본 유저 프로필 조회
//         const userRes = await homeService.getUserMe();
//         if (userRes && userRes.success) {
//           setNickname(userRes.data.nickname);
//           setEmail(userRes.data.email);
//         }

//         // 2. 💡 [추가] Swagger 7페이지 실시간 연속 독서 일수 스트릭 조회
//         const statsRes = await homeService.getUserStats();
//         if (statsRes && statsRes.success) {
//           setStreakDays(statsRes.data.streakDays);
//           setTotalReadingTime(statsRes.data.totalReadingTime);
//         }
//       } catch (error) {
//         console.error('마이페이지 통합 유저 정보 로딩 실패:', error);
//       }
//     };
//     fetchUserData();
//   }, []);

//   return (

//     <SafeAreaView style={styles.container}>

//       {/* 헤더 */}
//       <View style={styles.header}>

//         <TouchableOpacity
//           style={styles.backWrapper}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons
//             name="arrow-back"
//             size={24}
//             color="#111827"
//           />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>
//           마이페이지
//         </Text>

//       </View>

//       {/* 상단 탭 */}
//       <View style={styles.tabRow}>

//         {/* 프로필 설정 */}
//         <TouchableOpacity
//           style={styles.tabButton}
//           onPress={() =>
//             setSelectedTab('profile')
//           }
//         >

//           <Text
//             style={[
//               styles.tabText,

//               selectedTab === 'profile' &&
//                 styles.activeTabText,
//             ]}
//           >
//             프로필 설정
//           </Text>

//           {
//             selectedTab === 'profile' && (
//               <View style={styles.indicator} />
//             )
//           }

//         </TouchableOpacity>

//         {/* 저장한 문장 */}
//         <TouchableOpacity
//           style={styles.tabButton}
//           onPress={() =>
//             setSelectedTab('saved')
//           }
//         >

//           <Text
//             style={[
//               styles.tabText,

//               selectedTab === 'saved' &&
//                 styles.activeTabText,
//             ]}
//           >
//             저장한 문장
//           </Text>

//           {
//             selectedTab === 'saved' && (
//               <View style={styles.indicator} />
//             )
//           }

//         </TouchableOpacity>

//         {/* 독서 기록 */}
//         <TouchableOpacity
//           style={styles.tabButton}
//           onPress={() =>
//             setSelectedTab('record')
//           }
//         >

//           <Text
//             style={[
//               styles.tabText,

//               selectedTab === 'record' &&
//                 styles.activeTabText,
//             ]}
//           >
//             독서 기록
//           </Text>

//           {
//             selectedTab === 'record' && (
//               <View style={styles.indicator} />
//             )
//           }

//         </TouchableOpacity>

//         {/* 설정 */}
//         <TouchableOpacity
//           style={styles.tabButton}
//           onPress={() =>
//             setSelectedTab('setting')
//           }
//         >

//           <Text
//             style={[
//               styles.tabText,

//               selectedTab === 'setting' &&
//                 styles.activeTabText,
//             ]}
//           >
//             설정
//           </Text>

//           {
//             selectedTab === 'setting' && (
//               <View style={styles.indicator} />
//             )
//           }

//         </TouchableOpacity>

//       </View>

//       {/* 탭 내용 */}
//       <View style={styles.content}>

//         {
//           selectedTab === 'profile' && (
//             // 💡 [최종 바인딩] ProfileTab 내부에 실시간 스트릭 데이터와 닉네임을 Props로 명확하게 전달합니다!
//             <ProfileTab 
//               nickname={nickname} 
//               email={email} 
//               streakDays={streakDays} 
//               totalReadingTime={totalReadingTime}
//             />
//           )
//         }

//         {
//           selectedTab === 'saved' && (
//             <SavedSentenceTab />
//           )
//         }

//         {
//           selectedTab === 'record' && (
//             <ReadingRecordTab />
//           )
//         }

//         {
//           selectedTab === 'setting' && (
//             <SettingTab />
//           )
//         }

//       </View>

//     </SafeAreaView>

//   );
// }

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: '#F7F8FC',
//   },

//   header: {
//     height: 72,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     position: 'relative',
//   },
//   backWrapper: {
//     position: 'absolute',
//     left: 20,
//     top: 0,
//     bottom: 0,
//     justifyContent: 'center',
//   },
//   backButton: {
//     fontSize: 28,
//     color: '#111827',
//     marginRight: 16,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#111827',
//   },

//   tabRow: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//   },

//   tabButton: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 14,
//     paddingBottom: 12,
//     position: 'relative',
//   },

//   tabText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#9CA3AF',
//   },

//   activeTabText: {
//     color: '#2563EB',
//   },

//   indicator: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     height: 3,
//     backgroundColor: '#2563EB',
//   },

//   content: {
//     flex: 1,
//   },

//   settingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   settingText: {
//     fontSize: 18,
//     color: '#6B7280',
//     fontWeight: '600',
//   },

// });
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProfileTab from '../../components/mypage/ProfileTab';
import SavedSentenceTab from '../../components/mypage/SavedSentenceTab'; // 💡 소중한 독립 탭 정상 호출
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
        console.error('❌ 마이페이지 정보 로딩 실패:', error);
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