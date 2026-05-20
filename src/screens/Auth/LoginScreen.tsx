// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { Image } from 'expo-image';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // 구글 로그인 관련 라이브러리 임포트
// import * as WebBrowser from 'expo-web-browser';
// import * as AuthSession from 'expo-auth-session';
// import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

// import { auth } from '../../services/firebase';
// import { authService } from '../../services/authService';
// import { setAuthToken } from '../../services/api';

// // 웹 브라우저가 정상적으로 닫히고 앱으로 돌아오도록 설정
// WebBrowser.maybeCompleteAuthSession();

// export default function LoginScreen({ navigation }: any) {
//   const [loading, setLoading] = useState<boolean>(false);

//   // 구글 OAuth 요청 Hook 설정
//   const [request, response, promptAsync] = AuthSession.useAuthRequest(
//     {
//       clientId: '398539442106-r1voitlgsgus3ujnos9mtld3fme4ektv.apps.googleusercontent.com',
//       scopes: ['profile', 'email'],
//       // 🔄 변경 전: redirectUri: AuthSession.makeRedirectUri({ scheme: 'deepflow' }),
//       // ✅ 변경 후: Expo 공식 인증서버를 거쳐 가도록 대행 주소를 명시적으로 세팅합니다.
//       redirectUri: 'https://auth.expo.io/@anonymous/deepflow'

      
//     },
//     {
//       authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
//       tokenEndpoint: 'https://oauth2.googleapis.com/token',
//       revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
//     }
//   );

//   // 내 앱이 생성한 진짜 리디렉션 주소를 터미널에 찍어보는 코드
// console.log("🔥 진짜 리디렉션 주소:", AuthSession.makeRedirectUri({ scheme: 'deepflow', preferLocalhost: true }));

//   // 구글 웹 팝업이 성공적으로 닫혔을 때 이벤트를 감지하는 useEffect
//   useEffect(() => {
//     if (response?.type === 'success' && response.authentication?.idToken) {
//       const { idToken } = response.authentication;
//       processFirebaseAndBackendLogin(idToken);
//     } else if (response?.type === 'error' || response?.type === 'cancel') {
//       setLoading(false);
//     }
//   }, [response]);

//   // 파이어베이스 인증 ➡️ 백엔드 인증을 연달아 처리하는 핵심 로직
//   const processFirebaseAndBackendLogin = async (googleIdToken: string) => {
//     try {
//       // [STEP 1] 구글 토큰을 가지고 Firebase 로그인 수행
//       const credential = GoogleAuthProvider.credential(googleIdToken);
//       const userCredential = await signInWithCredential(auth, credential);
//       const firebaseUser = userCredential.user;

//       // [STEP 2] 백엔드가 시큐리티로 검증할 '진짜 Firebase ID 토큰' 발급받기
//       const firebaseIdToken = await firebaseUser.getIdToken();
      
//       // 💡 핵심: 백엔드가 401을 주지 않도록 Axios 헤더에 토큰을 무조건 장착합니다!
//       setAuthToken(firebaseIdToken);

//       // [STEP 3] 우리 백엔드 서버 /auth/login 호출
//       const userNickname = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User';
//       const serverUserData = await authService.login(userNickname, 'mock-fcm-token');

//       // [STEP 4] 로컬 저장 및 화면 진입
//       await AsyncStorage.setItem('userId', String(serverUserData.id));
//       await AsyncStorage.setItem('userNickname', serverUserData.nickname);
//       await AsyncStorage.setItem('userToken', firebaseIdToken); // 추후 자동로그인용

//       Alert.alert('성공', `${serverUserData.nickname}님 환영합니다!`);
      
//       // 아까 RootNavigator 임시 우회를 안 풀었을 수 있으니 명시적으로 MainTabs 이동
//       navigation.replace('MainTabs');

//     } catch (error: any) {
//       console.error('진짜 로그인 연동 실패:', error);
//       Alert.alert('로그인 실패', error.message || '인증 오류가 발생했습니다.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.topSection}>
//         <Image
//           source={require('../../../assets/logo.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//         <Text style={styles.title}>Deepflow</Text>
//       </View>

//       <TouchableOpacity 
//         style={[styles.googleButton, loading && styles.disabledButton]}
//         onPress={async () => {
//           setLoading(true);
//           await promptAsync({
//             windowFeatures: { width: 500, height: 600},
//           });
//         }}
//         disabled={loading || !request}
//       >
//         {loading ? (
//           <ActivityIndicator color="#111827" />
//         ) : (
//           <Text style={styles.googleText}>Continue with Google</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F8FC',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 80,
//   },
//   topSection: {
//     alignItems: 'center',
//     marginTop: 60,
//   },
//   logo: {
//     width: 180,
//     height: 180,
//   },
//   title: {
//     marginTop: 10,
//     fontSize: 38,
//     fontWeight: '700',
//     color: '#004AC6',
//   },
//   googleButton: {
//     width: '85%',
//     height: 62,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     elevation: 3,
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
//   googleText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//   },
// ====================================================});
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { Image } from 'expo-image';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import * as WebBrowser from 'expo-web-browser';
// import * as AuthSession from 'expo-auth-session';
// import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

// import { auth } from '../../services/firebase';
// import { authService } from '../../services/authService';
// import { setAuthToken } from '../../services/api';

// WebBrowser.maybeCompleteAuthSession();

// export default function LoginScreen({ navigation }: any) {
//   const [loading, setLoading] = useState<boolean>(false);

//   const [request, response, promptAsync] = AuthSession.useAuthRequest(
//     {
//       clientId: '398539442106-r1voitlgsgus3ujnos9mtld3fme4ektv.apps.googleusercontent.com',
//       scopes: ['profile', 'email'],
//       // 🔒 다현님의 진짜 Expo ID인 dahyeonan 장부 주소로 고정 완료!
//       redirectUri: 'https://auth.expo.io/@dahyeonan/deepflow',
//     },
//     {
//       authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
//       tokenEndpoint: 'https://oauth2.googleapis.com/token',
//       revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
//     }
//   );

//   useEffect(() => {
//     if (response) {
//       console.log('🔄 실시간 구글 리스폰스 수신 종류:', response.type);
      
//       if (response.type === 'success' && response.authentication?.idToken) {
//         const { idToken } = response.authentication;
//         processFirebaseAndBackendLogin(idToken);
//       } 
//       else if (response.type === 'cancel' || response.type === 'dismiss') {
//         const dynamicResponse = response as any;
//         const hiddenToken = dynamicResponse.authentication?.idToken || dynamicResponse.params?.id_token;
        
//         if (hiddenToken) {
//           console.log('🎯 cancel 억까 필터링 통과! 숨겨진 토큰으로 로그인을 강제 집행합니다.');
//           processFirebaseAndBackendLogin(hiddenToken);
//         } else {
//           setLoading(false);
//         }
//       } 
//       else {
//         setLoading(false);
//       }
//     }
//   }, [response]);

//   const processFirebaseAndBackendLogin = async (googleIdToken: string) => {
//     try {
//       const credential = GoogleAuthProvider.credential(googleIdToken);
//       const userCredential = await signInWithCredential(auth, credential);
//       const firebaseUser = userCredential.user;

//       const firebaseIdToken = await firebaseUser.getIdToken();
//       setAuthToken(firebaseIdToken);

//       const userNickname = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User';
//       const serverUserData = await authService.login(userNickname, 'mock-fcm-token');

//       await AsyncStorage.setItem('userId', String(serverUserData.id));
//       await AsyncStorage.setItem('userNickname', serverUserData.nickname);
//       await AsyncStorage.setItem('userToken', firebaseIdToken);

//       Alert.alert('성공', `${serverUserData.nickname}님 환영합니다!`);
//       navigation.replace('MainTabs');
//     } catch (error: any) {
//       console.error('진짜 로그인 연동 실패:', error);
//       Alert.alert('로그인 실패', error.message || '인증 오류가 발생했습니다.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.topSection}>
//         <Image
//           source={require('../../../assets/logo.png')}
//           style={styles.logo}
//           contentFit="contain"
//         />
//         <Text style={styles.title}>Deepflow</Text>
//       </View>

//       <TouchableOpacity 
//         style={[styles.googleButton, loading && styles.disabledButton]}
//         onPress={async () => {
//           setLoading(true);
//           await promptAsync();
//         }}
//         disabled={loading || !request}
//       >
//         {loading ? (
//           <ActivityIndicator color="#111827" />
//         ) : (
//           <Text style={styles.googleText}>Continue with Google</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F8FC',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 80,
//   },
//   topSection: {
//     alignItems: 'center',
//     marginTop: 60,
//   },
//   logo: {
//     width: 180,
//     height: 180,
//   },
//   title: {
//     marginTop: 10,
//     fontSize: 38,
//     fontWeight: '700',
//     color: '#004AC6',
//   },
//   googleButton: {
//     width: '85%',
//     height: 62,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     elevation: 3,
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
//   googleText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//   },
// });

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Image } from 'expo-image';

export default function LoginScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
          contentFit="contain"
        />

        <Text style={styles.title}>Deepflow</Text>
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => navigation.replace('MainTabs')}
      >
        <Text style={styles.googleText}>
          Continue with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 180,
    height: 180,
  },
  title: {
    marginTop: 10,
    fontSize: 38,
    fontWeight: '700',
    color: '#004AC6',
  },
  googleButton: {
    width: '85%',
    height: 62,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  googleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
});