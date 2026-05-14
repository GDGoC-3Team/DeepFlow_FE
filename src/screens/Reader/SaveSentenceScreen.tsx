import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';

import { mockReadingPages } from '../../constants/mockReading';
import { mockBackgrounds } from '../../constants/mockBackground';

export default function SaveSentenceScreen() {
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const { selectedSentence } = route.params;

  const [selectedBackground, setSelectedBackground] =
    useState(0);

  const [fontSize, setFontSize] =
    useState(28);

  const [textAlign, setTextAlign] =
    useState<'left' | 'center' | 'right'>('center');

  const selectedText =
    mockReadingPages[
      selectedSentence.page - 1
    ]?.sentences[
      selectedSentence.sentenceIndex
    ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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

      {/* 미리보기 카드 */}
      <View style={styles.previewCard}>
        <Image
          source={
            mockBackgrounds[selectedBackground]
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
                lineHeight: fontSize * 1.45,
              },
            ]}
          >
            {selectedText}
          </Text>
        </View>
      </View>

      {/* 옵션 패널 */}
      <View style={styles.optionPanel}>
        {/* 배경 선택 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            배경 선택
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {mockBackgrounds.map(
              (
                background: any,
                index: number
              ) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setSelectedBackground(index)
                  }
                >
                  <Image
                    source={background}
                    style={[
                      styles.backgroundThumbnail,

                      selectedBackground ===
                        index &&
                        styles.selectedThumbnail,
                    ]}
                  />
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </View>

        {/* 정렬 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            정렬
          </Text>

          <View style={styles.alignButtons}>
            <TouchableOpacity
              style={[
                styles.alignButton,
                textAlign === 'left' &&
                  styles.activeButton,
              ]}
              onPress={() =>
                setTextAlign('left')
              }
            >
              <Text style={styles.alignText}>
                좌
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.alignButton,
                textAlign === 'center' &&
                  styles.activeButton,
              ]}
              onPress={() =>
                setTextAlign('center')
              }
            >
              <Text style={styles.alignText}>
                중
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.alignButton,
                textAlign === 'right' &&
                  styles.activeButton,
              ]}
              onPress={() =>
                setTextAlign('right')
              }
            >
              <Text style={styles.alignText}>
                우
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 글자 크기 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            글자 크기
          </Text>

          <View style={styles.fontButtons}>
            <TouchableOpacity
              style={styles.fontButton}
              onPress={() =>
                setFontSize(
                  Math.max(18, fontSize - 2)
                )
              }
            >
              <Text style={styles.fontButtonText}>
                −
              </Text>
            </TouchableOpacity>

            <Text style={styles.fontSizeText}>
              {fontSize}
            </Text>

            <TouchableOpacity
              style={styles.fontButton}
              onPress={() =>
                setFontSize(
                  Math.min(42, fontSize + 2)
                )
              }
            >
              <Text style={styles.fontButtonText}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 저장 버튼 */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>
            저장하기
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },

  scrollContent: {
    paddingBottom: 60,
  },

  header: {
    height: 64,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
  },

  closeButton: {
    fontSize: 24,
    color: '#111827',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },

  previewCard: {
    width: '90%',
    height: 500,

    alignSelf: 'center',

    borderRadius: 32,

    overflow: 'hidden',

    marginTop: 8,
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

    paddingHorizontal: 32,
  },

  previewText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  optionPanel: {
    width: '90%',

    alignSelf: 'center',

    backgroundColor: '#FFFFFF',

    borderRadius: 28,

    marginTop: 24,

    padding: 22,
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',

    color: '#111827',

    marginBottom: 14,
  },

  backgroundThumbnail: {
    width: 76,
    height: 100,

    borderRadius: 18,

    marginRight: 12,
  },

  selectedThumbnail: {
    borderWidth: 3,
    borderColor: '#2563EB',
  },

  alignButtons: {
    flexDirection: 'row',
  },

  alignButton: {
    width: 56,
    height: 56,

    borderRadius: 18,

    backgroundColor: '#F3F4F6',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },

  activeButton: {
    backgroundColor: 'rgba(37,99,235,0.12)',

    borderWidth: 1,
    borderColor: '#2563EB',
  },

  alignText: {
    fontSize: 15,
    fontWeight: '600',

    color: '#111827',
  },

  fontButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  fontButton: {
    width: 56,
    height: 56,

    borderRadius: 18,

    backgroundColor: '#F3F4F6',

    justifyContent: 'center',
    alignItems: 'center',
  },

  fontButtonText: {
    fontSize: 26,
    color: '#111827',
  },

  fontSizeText: {
    marginHorizontal: 20,

    fontSize: 18,
    fontWeight: '600',

    color: '#111827',
  },

  saveButton: {
    height: 58,

    backgroundColor: '#2563EB',

    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 8,
  },

  saveButtonText: {
    color: '#FFFFFF',

    fontSize: 17,
    fontWeight: '700',
  },
});
