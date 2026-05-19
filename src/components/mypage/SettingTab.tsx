
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Switch } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import api from '../../services/api';

// type FilterType = 'latest' | 'date' | 'abc';

// // 💡 백엔드 명세 매핑용 폰트 옵션 리스트
// const FONT_OPTIONS = [
//   { label: '나눔 명조', value: 'NANUM_MYEONGJO' },
//   { label: 'KoPub 바탕', value: 'KOPUB_BATANG' },
//   { label: '노토 산스', value: 'NOTO_SANS' },
// ];

// export function SettingTab() {
//   const [loading, setLoading] = useState(true);
  
//   // 읽기 설정 상태 관리
//   const [fontSize, setFontSize] = useState<number>(18);
//   const [fontFamily, setFontFamily] = useState<string>('NANUM_MYEONGJO');
//   const [fontDisplayName, setFontDisplayName] = useState<string>('나눔 명조');
  
//   // 💡 드롭다운 열림/닫힘 상태 추가
//   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

//   // 알림 설정 상태 관리
//   const [isNotificationEnabled, setIsNotificationEnabled] = useState<boolean>(true);

//   // 🌐 1. 초기 사용자 설정 조회 (GET /settings)
//   useEffect(() => {
//     const loadSettings = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get<any, any>('/settings');
//         if (response && response.success) {
//           setFontSize(response.data.fontSize || 18); 
//           setFontFamily(response.data.fontFamily || 'NANUM_MYEONGJO'); 
          
//           // 받아온 영어 코드명에 맞춰 표시할 한글 이름 매핑
//           const matched = FONT_OPTIONS.find(f => f.value === response.data.fontFamily);
//           setFontDisplayName(matched ? matched.label : response.data.fontFamilyDisplayName || '나눔 명조'); 
//         }
//       } catch (error) {
//         console.error('설정 로드 실패:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadSettings();
//   }, []);

//   // 🔄 2. 글자 크기 변경 처리 (PATCH /settings/font-size)
//   const handleFontSizeChange = async (newSize: number) => {
//     try {
//       setFontSize(newSize);
//       await api.patch('/settings/font-size', { fontSize: newSize }); 
//       console.log(`글자 크기 ${newSize}px로 변경 완료`);
//     } catch (error) {
//       console.error('글자 크기 변경 실패:', error);
//     }
//   };

//   // 🔄 3. 글꼴 변경 처리 (PATCH /settings/font-family)
//   const handleFontFamilyChange = async (family: string, displayName: string) => {
//     try {
//       setFontFamily(family);
//       setFontDisplayName(displayName);
//       setIsDropdownOpen(false); // 💡 선택 후 드롭다운 닫기
//       await api.patch('/settings/font-family', { fontFamily: family });
//       console.log(`글꼴 ${displayName}로 변경 완료`);
//     } catch (error) {
//       console.error('글꼴 변경 실패:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#2563EB" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
//       {/* 📝 SECTION 1. 읽기 설정 */}
//       <View style={styles.sectionHeaderRow}>
//         <Ionicons name="language-outline" size={16} color="#374151" style={styles.sectionIcon} />
//         <Text style={styles.sectionHeaderTitle}>읽기 설정</Text>
//       </View>

//       <View style={[styles.settingCard, { zIndex: 999 }]}>
//         {/* 폰트 스타일 셀렉터 */}
//         <Text style={styles.label}>폰트 스타일</Text>
//         <View style={styles.dropdownContainer}>
//           <TouchableOpacity 
//             style={styles.dropdownSelector} 
//             onPress={() => setIsDropdownOpen(!isDropdownOpen)}
//           >
//             <Text style={styles.dropdownText}>{fontDisplayName}</Text>
//             <Ionicons name={isDropdownOpen ? "chevron-up" : "chevron-down"} size={18} color="#2563EB" />
//           </TouchableOpacity>

//           {/* 💡 [기능 추가] 디자인 폼을 해치지 않고 하단에 자연스럽게 떨어지는 드롭다운 목록 */}
//           {isDropdownOpen && (
//             <View style={styles.dropdownList}>
//               {FONT_OPTIONS.map((font) => (
//                 <TouchableOpacity
//                   key={font.value}
//                   style={styles.dropdownItem}
//                   onPress={() => handleFontFamilyChange(font.value, font.label)}
//                 >
//                   <Text style={[
//                     styles.dropdownItemText,
//                     fontFamily === font.value && styles.activeDropdownItemText
//                   ]}>
//                     {font.label}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           )}
//         </View>

//         {/* 글자 크기 헤더 슬라이더 노출 */}
//         <View style={styles.fontSizeHeaderRow}>
//           <Text style={styles.label}>글자 크기</Text>
//           <Text style={styles.fontSizeDisplay}>{fontSize}px</Text>
//         </View>

//         {/* 시안의 슬라이더를 4단계 버튼 스케일링으로 똑같이 가시화 구현 */}
//         <View style={styles.sliderTrackContainer}>
//           <View style={styles.sliderLine} />
//           {/* 현재 선택된 세팅 크기에 맞춰 파란색 활성화 트랙선 강조 */}
//           <View style={[styles.sliderActiveLine, { width: `${((fontSize - 14) / 8) * 100}%` }]} />
          
//           <View style={styles.sliderNodeRow}>
//             {[14, 16, 18, 22].map((size) => (
//               <TouchableOpacity
//                 key={size}
//                 style={[styles.sliderNode, fontSize === size && styles.activeSliderNode]}
//                 onPress={() => handleFontSizeChange(size)}
//               />
//             ))}
//           </View>
//         </View>
        
//         <View style={styles.sliderLabelRow}>
//           <Text style={styles.sliderSubLabel}>가</Text>
//           <Text style={[styles.sliderSubLabel, { fontSize: 24, fontWeight: '700' }]}>가</Text>
//         </View>

//         <View style={styles.dividerLine} />

//         {/* 💡 실시간 폰트 및 폰트사이즈 미리보기 프리뷰 상자 박스 완전 매핑 */}
//         <View style={styles.previewMessageBox}>
//           <Text style={[
//             styles.previewMessageText, 
//             { 
//               fontSize: fontSize, 
//               // 시스템 서체 분기 및 다현님 전용 글꼴 실시간 융합 반영
//               fontFamily: fontFamily === 'NOTO_SANS' ? undefined : 'Kopub',
//               lineHeight: fontSize * 1.5 // 폰트가 커질 때 텍스트 겹침 현상 패치
//             }
//           ]}>
//             사막은 아름다워. 어딘가에 샘을 숨기고 있으니까.
//           </Text>
//         </View>
//       </View>

//       {/* 🔔 SECTION 2. 알림 설정 */}
//       <View style={styles.sectionHeaderRow}>
//         <Ionicons name="notifications-outline" size={16} color="#374151" style={styles.sectionIcon} />
//         <Text style={styles.sectionHeaderTitle}>알림 설정</Text>
//       </View>

//       <View style={styles.settingCard}>
//         <View style={styles.toggleRow}>
//           <Text style={styles.toggleLabel}>데일리 플로우 알림</Text>
//           <Switch
//             trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
//             thumbColor="#FFFFFF"
//             ios_backgroundColor="#E5E7EB"
//             onValueChange={setIsNotificationEnabled}
//             value={isNotificationEnabled}
//           />
//         </View>

//         {/* 💡 [기능 추가] 알림 설정 스위치가 ON 일 때만 알림 시간 설정 행이 부드럽게 노출되도록 패치 */}
//         {isNotificationEnabled && (
//           <>
//             <View style={styles.dividerLine} />
//             <View style={styles.timePickerRow}>
//               <Text style={styles.toggleLabel}>알림 시간</Text>
//               <TouchableOpacity style={styles.timeBadgeContainer} activeOpacity={0.7}>
//                 <Ionicons name="time-outline" size={16} color="#2563EB" style={{ marginRight: 6 }} />
//                 <Text style={styles.timeBadgeText}>08:00 AM</Text>
//               </TouchableOpacity>
//             </View>
//           </>
//         )}
//       </View>

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F8FC',
//     paddingHorizontal: 20,
//     paddingTop: 16,
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   sectionHeaderRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//     marginTop: 8,
//   },
//   sectionIcon: {
//     marginRight: 6,
//   },
//   sectionHeaderTitle: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#374151',
//   },
//   settingCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 32,
//     padding: 24,
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.02,
//     shadowRadius: 8,
//     elevation: 2,
//     position: 'relative',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 14,
//   },
//   dropdownContainer: {
//     position: 'relative',
//     marginBottom: 28,
//     width: '100%',
//   },
//   dropdownSelector: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#EEF2FF',
//     height: 58,
//     borderRadius: 20,
//     paddingHorizontal: 20,
//   },
//   dropdownText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   dropdownList: {
//     position: 'absolute',
//     top: 64,
//     left: 0,
//     right: 0,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#EEF2FF',
//     zIndex: 9999,
//     paddingVertical: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.06,
//     shadowRadius: 10,
//     elevation: 4,
//   },
//   dropdownItem: {
//     paddingVertical: 14,
//     paddingHorizontal: 20,
//   },
//   dropdownItemText: {
//     fontSize: 15,
//     color: '#4B5563',
//     fontWeight: '500',
//   },
//   activeDropdownItemText: {
//     color: '#2563EB',
//     fontWeight: '700',
//   },
//   fontSizeHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   fontSizeDisplay: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#2563EB',
//   },
//   sliderTrackContainer: {
//     width: '100%',
//     height: 30,
//     justifyContent: 'center',
//     position: 'relative',
//     marginTop: 8,
//   },
//   sliderLine: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     height: 6,
//     backgroundColor: '#E5E7EB',
//     borderRadius: 3,
//   },
//   sliderActiveLine: {
//     position: 'absolute',
//     left: 0,
//     height: 6,
//     backgroundColor: '#3B82F6',
//     borderRadius: 3,
//   },
//   sliderNodeRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   sliderNode: {
//     width: 14,
//     height: 14,
//     borderRadius: 7,
//     backgroundColor: '#BFDBFE',
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//   },
//   activeSliderNode: {
//     width: 22,
//     height: 22,
//     borderRadius: 11,
//     backgroundColor: '#FFFFFF',
//     borderColor: '#2563EB',
//     borderWidth: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   sliderLabelRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 2,
//     marginTop: 4,
//   },
//   sliderSubLabel: {
//     fontSize: 14,
//     color: '#9CA3AF',
//   },
//   dividerLine: {
//     height: 1,
//     backgroundColor: '#E5E7EB',
//     marginVertical: 24,
//   },
//   previewMessageBox: {
//     backgroundColor: '#EEF2FF',
//     borderRadius: 20,
//     paddingVertical: 26,
//     paddingHorizontal: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: 100,
//   },
//   previewMessageText: {
//     color: '#374151',
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   toggleRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   toggleLabel: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#1F2937',
//   },
//   timePickerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   timeBadgeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#EEF2FF',
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 14,
//   },
//   timeBadgeText: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#2563EB',
//   },
// });
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView, 
  Switch,
  Modal,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider'; 
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { settingService } from '../../services/settingService'; 
import { API_CONFIG } from '../../config/apiConfig'; 

const FONT_OPTIONS = [
  { label: '나눔 명조', value: 'Nanum' },
  { label: 'KoPub 바탕', value: 'KoPub' },
  { label: '노토 산스', value: 'NotoSans' },
];

export function SettingTab() {
  const [loading, setLoading] = useState(true);
  
  // 🔤 읽기 설정 상태
  const [fontSize, setFontSize] = useState<number>(18);
  const [fontFamily, setFontFamily] = useState<string>('NANUM_MYEONGJO');
  const [fontDisplayName, setFontDisplayName] = useState<string>('나눔 명조');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // 🔔 알림 설정 상태
  const [isNotificationEnabled, setIsNotificationEnabled] = useState<boolean>(true);
  const [notificationTime, setNotificationTime] = useState<string>('08:00 AM');
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [rawDate, setRawDate] = useState<Date>(new Date(new Date().setHours(8, 0, 0, 0)));

  // 🌐 1. 초기 사용자 설정 로드
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        
        if (API_CONFIG.USE_MOCK) {
          console.log('🧪 [SettingTab] MOCK 모드 안전 진입 완료');
          const mockRes = await settingService.getSettings();
          setFontSize(mockRes.data.fontSize);
          setFontFamily(mockRes.data.fontFamily);
          setFontDisplayName(mockRes.data.fontFamilyDisplayName);
          setIsNotificationEnabled(mockRes.data.notificationEnabled);
          
          if (mockRes.data.notificationTime) {
            const [hh, mm] = mockRes.data.notificationTime.split(':');
            const hours = parseInt(hh, 10);
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 === 0 ? 12 : hours % 12;
            setNotificationTime(`${displayHours < 10 ? '0' : ''}${displayHours}:${mm} ${ampm}`);
          }
          return;
        }

        const response = await settingService.getSettings();
        if (response && response.success) {
          setFontSize(response.data.fontSize || 18); 
          setFontFamily(response.data.fontFamily || 'NANUM_MYEONGJO'); 
          const matched = FONT_OPTIONS.find(f => f.value === response.data.fontFamily);
          setFontDisplayName(matched ? matched.label : response.data.fontFamilyDisplayName || '나눔 명조'); 
          setIsNotificationEnabled(response.data.notificationEnabled);
        }
      } catch (error) {
        console.error('❌ 설정 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  // 🔄 2. 글자 크기 슬라이더 조절 핸들러
  const handleFontSizeSlider = async (value: number) => {
    try {
      const steps = [14, 16, 18, 22];
      const closestSize = steps.reduce((prev, curr) => 
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
      );
      
      setFontSize(closestSize);
      await settingService.updateFontSize(closestSize); 
    } catch (error) {
      console.error('글자 크기 변경 실패:', error);
    }
  };

  // 🔄 3. 글꼴 변경 처리
  const handleFontFamilyChange = async (family: string, displayName: string) => {
    try {
      setFontFamily(family);
      setFontDisplayName(displayName);
      setIsDropdownOpen(false); 
      await settingService.updateFontFamily(family);
    } catch (error) {
      console.error('글꼴 변경 실패:', error);
    }
  };

  // 🔄 4. 알림 스위치 토글
  const handleNotificationToggle = async (value: boolean) => {
    try {
      setIsNotificationEnabled(value);
      await settingService.updateNotificationPreference(value);
    } catch (error) {
      console.error('알림 상태 변경 실패:', error);
    }
  };

  // 🔄 5. 알림 시간 피커 처리
  const onTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(Platform.OS === 'ios'); 
    if (selectedDate) {
      setRawDate(selectedDate);
      const hours = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 === 0 ? 12 : hours % 12;
      const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setNotificationTime(`${displayHours < 10 ? '0' : ''}${displayHours}:${displayMinutes} ${ampm}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 📝 SECTION 1. 읽기 설정 */}
      <View style={styles.sectionHeaderRow}>
        <Ionicons name="language-outline" size={16} color="#374151" style={styles.sectionIcon} />
        <Text style={styles.sectionHeaderTitle}>읽기 설정</Text>
      </View>

      <View style={[styles.settingCard, { zIndex: 999 }]}>
        <Text style={styles.label}>폰트 스타일</Text>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity 
            style={styles.dropdownSelector} 
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text style={styles.dropdownText}>{fontDisplayName}</Text>
            <Ionicons name={isDropdownOpen ? "chevron-up" : "chevron-down"} size={18} color="#2563EB" />
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              {FONT_OPTIONS.map((font) => (
                <TouchableOpacity
                  key={font.value}
                  style={styles.dropdownItem}
                  onPress={() => handleFontFamilyChange(font.value, font.label)}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    fontFamily === font.value && styles.activeDropdownItemText
                  ]}>
                    {font.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.fontSizeHeaderRow}>
          <Text style={styles.label}>글자 크기</Text>
          <Text style={styles.fontSizeDisplay}>{fontSize}px</Text>
        </View>

        <View style={styles.sliderTrackContainer}>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={14}
            maximumValue={22}
            step={1}
            value={fontSize}
            onValueChange={(val) => setFontSize(val)}
            onSlidingComplete={handleFontSizeSlider}
            minimumTrackTintColor="#2563EB"
            maximumTrackTintColor="#E5E7EB"
            thumbTintColor="#2563EB"
          />
        </View>
        
        <View style={styles.sliderLabelRow}>
          <Text style={styles.sliderSubLabel}>가</Text>
          <Text style={[styles.sliderSubLabel, { fontSize: 22, fontWeight: '700', color: '#1F2937' }]}>가</Text>
        </View>

        <View style={styles.dividerLine} />

        {/* 💡 [글꼴 대칭 완치 완료] fontFamily 상태값을 스타일에 다이렉트로 바인딩하여 폰트 변화 반영! */}
        <View style={styles.previewMessageBox}>
          <Text style={[
            styles.previewMessageText, 
            { 
              fontSize: fontSize, 
              fontFamily: fontFamily, // 🎯 선택한 글꼴(NANUM_MYEONGJO, KOPUB_BATANG 등) 실시간 연동 완료!
              lineHeight: fontSize * 1.5 
            }
          ]}>
            여기에 미리보기 텍스트가 표시됩니다.
          </Text>
        </View>
      </View>

      {/* 🔔 SECTION 2. 알림 설정 */}
      <View style={styles.sectionHeaderRow}>
        <Ionicons name="notifications-outline" size={16} color="#374151" style={styles.sectionIcon} />
        <Text style={styles.sectionHeaderTitle}>알림 설정</Text>
      </View>

      <View style={styles.settingCard}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>데일리 플로우 알림</Text>
          <Switch
            trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E5E7EB"
            onValueChange={handleNotificationToggle}
            value={isNotificationEnabled}
          />
        </View>

        {isNotificationEnabled && (
          <>
            <View style={styles.dividerLine} />
            <View style={styles.timePickerRow}>
              <Text style={styles.toggleLabel}>알림 시간</Text>
              <TouchableOpacity 
                style={styles.timeBadgeContainer} 
                activeOpacity={0.7}
                onPress={() => setShowTimePicker(true)}
              >
                <Ionicons name="time-outline" size={16} color="#2563EB" style={{ marginRight: 6 }} />
                <Text style={styles.timeBadgeText}>{notificationTime}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* 시간 조절 다크 팝업 모달 */}
      {showTimePicker && (
        Platform.OS === 'ios' ? (
          <Modal transparent animationType="slide" visible={showTimePicker}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>알림 시간 선택</Text>
                <DateTimePicker
                  value={rawDate}
                  mode="time"
                  is24Hour={false}
                  display="spinner"
                  onChange={onTimeChange}
                  textColor="#FFFFFF" 
                />
                <TouchableOpacity style={styles.closeBtn} onPress={() => setShowTimePicker(false)}>
                  <Text style={styles.closeBtnText}>선택 완료</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : (
          <DateTimePicker
            value={rawDate}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onTimeChange}
          />
        )
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FC', paddingHorizontal: 20, paddingTop: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginTop: 8 },
  sectionIcon: { marginRight: 6 },
  sectionHeaderTitle: { fontSize: 14, fontWeight: '500', color: '#374151' },
  settingCard: { backgroundColor: '#FFFFFF', borderRadius: 32, padding: 24, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 2, position: 'relative' },
  label: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 14 },
  dropdownContainer: { position: 'relative', marginBottom: 20, width: '100%' },
  dropdownSelector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#EEF2FF', height: 58, borderRadius: 20, paddingHorizontal: 20 },
  dropdownText: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  dropdownList: { position: 'absolute', top: 64, left: 0, right: 0, backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 1, borderColor: '#EEF2FF', zIndex: 9999, paddingVertical: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 4 },
  dropdownItem: { paddingVertical: 14, paddingHorizontal: 20 },
  dropdownItemText: { fontSize: 15, color: '#4B5563', fontWeight: '500' },
  activeDropdownItemText: { color: '#2563EB', fontWeight: '700' },
  fontSizeHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  fontSizeDisplay: { fontSize: 16, fontWeight: '700', color: '#2563EB' },
  sliderTrackContainer: { width: '100%', height: 40, justifyContent: 'center', marginTop: 10 },
  sliderLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 6, marginTop: 2 },
  sliderSubLabel: { fontSize: 14, color: '#9CA3AF', fontWeight: '500' },
  dividerLine: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 24 },
  previewMessageBox: { backgroundColor: '#EEF2FF', borderRadius: 20, paddingVertical: 26, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', minHeight: 100 },
  previewMessageText: { color: '#374151', fontWeight: '500', textAlign: 'center' },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  toggleLabel: { fontSize: 16, fontWeight: '500', color: '#1F2937' },
  timePickerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeBadgeContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14 },
  timeBadgeText: { fontSize: 15, fontWeight: '700', color: '#2563EB' }, 
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#1F2937', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, paddingBottom: 40 },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', marginBottom: 10 },
  closeBtn: { backgroundColor: '#2563EB', borderRadius: 16, height: 54, justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  closeBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' }
});