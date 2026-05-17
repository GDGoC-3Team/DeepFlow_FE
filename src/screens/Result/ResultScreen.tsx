import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function ResultScreen() {

  const navigation =
    useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >

        {/* 헤더 */}
        <View style={styles.header}>

          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
          >
            <Ionicons
              name="chevron-back"
              size={26}
              color="#111827"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            독서 결과
          </Text>

        </View>

        {/* 집중도 분석 */}
        <View style={styles.section}>

          <View style={styles.sectionHeader}>

            <Text style={styles.sectionTitle}>
              집중도 분석
            </Text>

            <View style={styles.legendRow}>

              <View style={styles.legendDot} />

              <Text style={styles.legendText}>
                체류 시간
              </Text>

            </View>

          </View>

          <View style={styles.chartCard}>

            <View style={styles.chartContainer}>

              {
                [0.55, 0.62, 1, 0.35, 0.72]
                  .map((height, index) => (

                    <View
                      key={index}
                      style={styles.barWrapper}
                    >

                      <View
                        style={[
                          styles.bar,

                          {
                            height:
                              120 * height,

                            opacity:
                              index === 2
                                ? 1
                                : 0.55,
                          },
                        ]}
                      />

                      <Text style={styles.barLabel}>
                        {index + 1}p
                      </Text>

                      <Text style={styles.barTime}>
                        {
                          [
                            '420초',
                            '450초',
                            '720초',
                            '500초',
                            '610초',
                          ][index]
                        }
                      </Text>

                    </View>

                  ))
              }

            </View>

          </View>

        </View>

        {/* 집중 흔들린 구간 */}
        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            집중이 흔들린 구간
          </Text>

          <View style={styles.warningCard}>

            <View style={styles.warningTop}>

              <Ionicons
                name="alert-circle"
                size={22}
                color="#DC2626"
              />

              <Text style={styles.warningTitle}>
                4페이지 주의 필요
              </Text>

            </View>

            <Text style={styles.warningText}>
              4페이지는 텍스트 양에 비해
              읽는 시간이 너무 짧았습니다.
              중요한 내용을 놓쳤을 가능성이
              있으니 다시 한 번
              훑어보시는 것을 추천드려요.
            </Text>

          </View>

        </View>

        {/* 표시된 문장들 */}
        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            표시된 문장들
          </Text>

          {/* 카드 1 */}
          <View style={styles.highlightCard}>

            <View style={styles.pageBadge}>

              <Text style={styles.pageBadgeText}>
                PAGE 3
              </Text>

            </View>

            <Text style={styles.highlightSentence}>

              성공은 결국 우연이 아니다.
              우리는 사소한 일에 목숨을 걸고,
              정작 중요한 일은 뒷전으로
              미루는 경향이 있다.

            </Text>

          </View>

          {/* 카드 2 */}
          <View style={styles.highlightCard}>

            <View style={styles.pageBadge}>

              <Text style={styles.pageBadgeText}>
                PAGE 5
              </Text>

            </View>

            <Text style={styles.highlightSentence}>

              진정한 창의성은 한계 속에서
              피어난다. 몰입은 자아를 잊게 만들며,
              그 과정 속에서 진정한 의미를
              발견하게 한다.

            </Text>

            <TouchableOpacity
              style={styles.moreButton}
            >

              <Ionicons
                name="ellipsis-horizontal"
                size={20}
                color="#9CA3AF"
              />

            </TouchableOpacity>

          </View>

        </View>

        {/* 버튼 */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() =>
            navigation.navigate('Home')
          }
        >

          <Text style={styles.homeButtonText}>
            홈으로 돌아가기
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },

  header: {
    height: 64,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 20,

    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  headerTitle: {
    fontSize: 22,

    fontWeight: '700',

    color: '#111827',

    marginLeft: 10,
  },

  section: {
    marginTop: 28,
    paddingHorizontal: 20,
  },

  sectionHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 28,

    fontWeight: '700',

    color: '#111827',
  },

  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  legendDot: {
    width: 10,
    height: 10,

    borderRadius: 5,

    backgroundColor: '#2563EB',

    marginRight: 6,
  },

  legendText: {
    fontSize: 14,

    color: '#9CA3AF',
  },

  chartCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 28,

    paddingVertical: 28,
    paddingHorizontal: 18,

    shadowColor: '#000',

    shadowOpacity: 0.04,
    shadowRadius: 10,

    elevation: 2,
  },

  chartContainer: {
    height: 180,

    flexDirection: 'row',

    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },

  barWrapper: {
    alignItems: 'center',
  },

  bar: {
    width: 24,

    borderRadius: 10,

    backgroundColor: '#2563EB',

    marginBottom: 12,
  },

  barLabel: {
    fontSize: 15,

    color: '#6B7280',

    marginBottom: 2,
  },

  barTime: {
    fontSize: 12,

    color: '#9CA3AF',
  },

  warningCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 28,

    padding: 24,

    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },

  warningTop: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 14,
  },

  warningTitle: {
    fontSize: 22,

    fontWeight: '700',

    color: '#111827',

    marginLeft: 8,
  },

  warningText: {
    fontSize: 17,

    lineHeight: 30,

    color: '#6B7280',
  },

  highlightCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 28,

    padding: 24,

    marginBottom: 20,

    position: 'relative',
  },

  pageBadge: {
    alignSelf: 'flex-start',

    backgroundColor: '#EEF2FF',

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 999,
  },

  pageBadgeText: {
    fontSize: 13,

    fontWeight: '700',

    color: '#2563EB',
  },

  highlightSentence: {
    marginTop: 18,

    fontSize: 28,

    lineHeight: 44,

    color: '#111827',

    backgroundColor:
      'rgba(37,99,235,0.1)',
  },

  moreButton: {
    position: 'absolute',

    right: 20,
    bottom: 20,
  },

  homeButton: {
    height: 64,

    backgroundColor: '#2563EB',

    borderRadius: 22,

    marginHorizontal: 20,

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,
    marginBottom: 40,
  },

  homeButtonText: {
    fontSize: 18,

    fontWeight: '700',

    color: '#FFFFFF',
  },

});