import { useState, useEffect } from 'react';
import { useSentenceStore, } from '../../store/sentenceStore';

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  MaterialIcons,
} from '@expo/vector-icons';

import { mockReadingPages }
from '../../constants/mockReading';

import { mockBackgrounds }
from '../../constants/mockBackgrounds';


export default function SaveSentenceScreen() {

  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  useEffect(() => {
    navigation.getParent()?.setOptions({
        tabBarStyle: {
            display: 'none',
        },
    });

    return () => {
        navigation.getParent()?.setOptions({
        tabBarStyle: {
            height: 82,
        },
        });
    };
    }, []);
  const { selectedSentence } =
    route.params;

  const selectedText =
    mockReadingPages[
      selectedSentence.page - 1
    ]?.sentences[
      selectedSentence.sentenceIndex
    ];

  const [
    selectedBackground,
    setSelectedBackground,
  ] = useState(0);

  const [
    textAlign,
    setTextAlign,
  ] = useState<
    'left' | 'center' | 'right'
  >('center');

  const [
    fontSize,
    setFontSize,
  ] = useState(24);

  const [
    selectedFont,
    setSelectedFont,
  ] = useState('Kopub 바탕체');

  const addSentence =
  useSentenceStore(
    (state) => state.addSentence
  );

  return (
    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >

        {/* 헤더 */}
        <View style={styles.header}>

          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text style={styles.closeButton}>
              ✕
            </Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            문장 저장하기
          </Text>

          <View style={{ width: 24 }} />

        </View>

        {/* Preview */}
        <View style={styles.previewCard}>

          <Image
            source={
              mockBackgrounds[selectedBackground]
                .image
            }
            style={styles.previewImage}
            resizeMode="cover"
          />

          <View style={styles.overlay}>

            <Text
              style={[
                styles.previewText,

                {
                  textAlign,
                  fontSize,
                  lineHeight: fontSize * 1.5,

                  fontFamily:
                    selectedFont === 'Kopub 바탕체'
                    ? 'KoPub'
                    : selectedFont === '본고딕'
                    ? 'NotoSans'
                    : 'Nanum',

                  color:
                    mockBackgrounds[
                        selectedBackground
                    ].isDark
                        ? '#FFFFFF'
                        : '#111827',
                },
              ]}
            >
              {selectedText}
            </Text>

          </View>

        </View>

        {/* 옵션 패널 */}
        <View style={styles.optionPanel}>

          {/* 배경 스타일 */}
          <View
            style={
              styles.backgroundSection
            }
          >

            <Text style={styles.sectionTitle}>
              배경 스타일
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
            >

              {
                mockBackgrounds.map(
                  (
                    background: any,
                    index: number
                  ) => (

                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        setSelectedBackground(
                          index
                        )
                      }
                    >
                      <Image
                        source={background.image}
                        style={[
                          styles.backgroundThumbnail,

                          selectedBackground ===
                            index &&
                            styles.selectedThumbnail,
                        ]}
                      />
                    </TouchableOpacity>

                  )
                )
              }

            </ScrollView>

          </View>

          {/* 아래 옵션 */}
          <View style={styles.optionRow}>

            {/* 글꼴 */}
            <View style={styles.optionColumn}>

              <Text style={styles.sectionTitle}>
                글꼴
              </Text>

              <View style={styles.fontCard}>

                {
                  [
                    'Kopub 바탕체',
                    '본고딕',
                    '나눔명조',
                  ].map((font) => (

                    <TouchableOpacity
                      key={font}
                      style={[
                        styles.fontOptionButton,

                        selectedFont === font &&
                            styles.selectedFontButton,
                      ]}
                      onPress={() =>
                        setSelectedFont(font)
                      }
                    >

                      <Text
                        style={[
                            styles.fontOptionText,
                            
                            selectedFont === font &&
                                styles.selectedFontText,
                            ]}
                      >
                        {font}
                      </Text>

                    </TouchableOpacity>

                  ))
                }

              </View>

            </View>

            {/* 정렬 및 크기 */}
            <View style={styles.optionColumn}>

              <Text style={styles.sectionTitle}>
                정렬 및 크기
              </Text>

              <View style={styles.controlCard}>

                {/* 정렬 */}
                <View
                  style={
                    styles.alignContainer
                  }
                >

                  {/* 왼쪽 */}
                  <TouchableOpacity
                    style={[
                      styles.alignItem,

                      textAlign ===
                        'left' &&
                        styles.activeAlignItem,
                    ]}
                    onPress={() =>
                      setTextAlign(
                        'left'
                      )
                    }
                  >
                    <MaterialIcons
                      name="format-align-left"
                      size={22}
                      color={
                        textAlign ===
                        'left'
                          ? '#2563EB'
                          : '#9CA3AF'
                      }
                    />
                  </TouchableOpacity>

                  {/* 가운데 */}
                  <TouchableOpacity
                    style={[
                      styles.alignItem,

                      textAlign ===
                        'center' &&
                        styles.activeAlignItem,
                    ]}
                    onPress={() =>
                      setTextAlign(
                        'center'
                      )
                    }
                  >
                    <MaterialIcons
                      name="format-align-center"
                      size={22}
                      color={
                        textAlign ===
                        'center'
                          ? '#2563EB'
                          : '#9CA3AF'
                      }
                    />
                  </TouchableOpacity>

                  {/* 오른쪽 */}
                  <TouchableOpacity
                    style={[
                      styles.alignItem,

                      textAlign ===
                        'right' &&
                        styles.activeAlignItem,
                    ]}
                    onPress={() =>
                      setTextAlign(
                        'right'
                      )
                    }
                  >
                    <MaterialIcons
                      name="format-align-right"
                      size={22}
                      color={
                        textAlign ===
                        'right'
                          ? '#2563EB'
                          : '#9CA3AF'
                      }
                    />
                  </TouchableOpacity>

                </View>

                {/* 글자 크기 */}
                <View
                  style={
                    styles.fontSizeContainer
                  }
                >

                  <TouchableOpacity
                    style={
                      styles.circleButton
                    }
                    onPress={() =>
                      setFontSize(
                        Math.max(
                          18,
                          fontSize - 2
                        )
                      )
                    }
                  >
                    <Text
                      style={
                        styles.circleText
                      }
                    >
                      −
                    </Text>
                  </TouchableOpacity>

                  <Text
                    style={
                      styles.fontSizeText
                    }
                  >
                    {fontSize}
                  </Text>

                  <TouchableOpacity
                    style={
                      styles.circleButton
                    }
                    onPress={() =>
                      setFontSize(
                        Math.min(
                          42,
                          fontSize + 2
                        )
                      )
                    }
                  >
                    <Text
                      style={
                        styles.circleText
                      }
                    >
                      +
                    </Text>
                  </TouchableOpacity>

                </View>

              </View>

            </View>

          </View>

          {/* 저장 버튼 */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
                addSentence({
                    id: Date.now(),
                    text: selectedText,
                    background: selectedBackground,
                    font: selectedFont,
                    textAlign,
                    fontSize,
                    
                });
                navigation.goBack();
            }}
          >
            <Text
              style={styles.saveButtonText}
            >
              저장
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

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

    paddingHorizontal: 24,

    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  closeButton: {
    fontSize: 24,
    color: '#374151',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },

  previewCard: {
    width: '90%',
    height: 330,

    alignSelf: 'center',

    marginTop: 28,

    borderRadius: 32,

    overflow: 'hidden',
  },

  previewImage: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 32,
  },

  previewText: {
    fontWeight: '700',
  },

  optionPanel: {
    paddingHorizontal: 24,
    marginTop: 28,
  },

  backgroundSection: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',

    color: '#6B7280',

    marginBottom: 14,
  },

  backgroundThumbnail: {
    width: 72,
    height: 72,

    borderRadius: 20,

    marginRight: 12,
  },

  selectedThumbnail: {
    borderWidth: 3,
    borderColor: '#2563EB',
  },

  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },

  optionColumn: {
    flex: 1,
  },

  fontCard: {
    backgroundColor: '#EFF4FF',

    borderRadius: 28,

    paddingHorizontal: 16,
    paddingVertical: 18,
    minHeight: 210,
  },

  fontOptionButton: {
  height: 56,

  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingHorizontal: 18,

  marginBottom: 8,
},

  

  fontOptionText: {
    fontSize: 17,
    color: '#0B1C30',
    fontWeight: '500',
    includeFontPadding: false,
    flexShrink: 1,
  },

  selectedFontButton: {
  width: '100%',
  minHeight: 56,

  borderWidth: 2,
  borderColor: '#2563EB',

  borderRadius: 18,

  backgroundColor: '#FFFFFF',
},
selectedFontText: {
  color: '#111827',

  fontWeight: '600',
},

  

  controlCard: {
    backgroundColor: '#EFF4FF',

    borderRadius: 28,

    padding: 16,
    minHeight: 210,
    justifyContent: 'space-between',
  },

  alignContainer: {
    height: 58,

    borderRadius: 18,

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-around',

    marginBottom: 16,
  },

  alignItem: {
    width: 42,
    height: 42,

    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',
  },

  activeAlignItem: {
    backgroundColor:
      'rgba(37,99,235,0.12)',
  },

  fontSizeContainer: {
    height: 76,

    borderRadius: 22,

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-around',
  },

  circleButton: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: '#EEF2FF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  circleText: {
    fontSize: 28,
    color: '#374151',
  },

  fontSizeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  saveButton: {
    height: 62,

    borderRadius: 22,

    backgroundColor: '#2563EB',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 36,
  },

  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',

    color: '#FFFFFF',
  },

});




