import { useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import ProfileTab from './ProfileTab';
import SavedSentenceTab from './SavedSentenceTab';
import ReadingRecordTab from './ReadingRecordTab';
import SettingTab from './SettingTab';

export default function MyPageScreen() {

  const [selectedTab, setSelectedTab] =
    useState('profile');

  const renderContent = () => {

    switch (selectedTab) {

      case 'profile':
        return <ProfileTab />;

      case 'saved':
        return <SavedSentenceTab />;

      case 'record':
        return <ReadingRecordTab />;

      case 'setting':
        return <SettingTab />;

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* 헤더 */}
      <View style={styles.header}>

        <Text style={styles.title}>
          마이페이지
        </Text>

      </View>

      {/* 탭 */}
      <View style={styles.tabRow}>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() =>
            setSelectedTab('profile')
          }
        >
          <Text
            style={[
              styles.tabText,

              selectedTab === 'profile' &&
                styles.activeTabText,
            ]}
          >
            프로필 설정
          </Text>

          {
            selectedTab === 'profile' && (
              <View style={styles.indicator} />
            )
          }

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() =>
            setSelectedTab('saved')
          }
        >
          <Text
            style={[
              styles.tabText,

              selectedTab === 'saved' &&
                styles.activeTabText,
            ]}
          >
            저장한 문장
          </Text>

          {
            selectedTab === 'saved' && (
              <View style={styles.indicator} />
            )
          }

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() =>
            setSelectedTab('record')
          }
        >
          <Text
            style={[
              styles.tabText,

              selectedTab === 'record' &&
                styles.activeTabText,
            ]}
          >
            독서 기록
          </Text>

          {
            selectedTab === 'record' && (
              <View style={styles.indicator} />
            )
          }

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() =>
            setSelectedTab('setting')
          }
        >
          <Text
            style={[
              styles.tabText,

              selectedTab === 'setting' &&
                styles.activeTabText,
            ]}
          >
            설정
          </Text>

          {
            selectedTab === 'setting' && (
              <View style={styles.indicator} />
            )
          }

        </TouchableOpacity>

      </View>

      {/* 컨텐츠 */}
      <View style={styles.content}>
        {renderContent()}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },

  header: {
    height: 72,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  tabRow: {
    flexDirection: 'row',

    backgroundColor: '#FFFFFF',

    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  tabButton: {
    flex: 1,

    alignItems: 'center',

    paddingVertical: 14,
  },

  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },

  activeTabText: {
    color: '#2563EB',
    fontWeight: '700',
  },

  indicator: {
    width: '100%',
    height: 2,

    backgroundColor: '#2563EB',

    marginTop: 12,
  },

  content: {
    flex: 1,
  },

});