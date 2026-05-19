import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ReaderScreen from '../screens/Reader/ReaderScreen';
import SaveSentenceScreen from '../screens/Reader/SaveSentenceScreen';
import ResultScreen from '../screens/Result/ResultScreen';
import { useLayoutEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function ReadingStackNavigator({navigation, route}: any) {
  // 💡 [핵심 숨김 로직] 현재 활성화된 독서 하위 화면에 따라 하단 탭바 스타일을 동적으로 껐다 켭니다.
  useLayoutEffect(() => {
    // 현재 스택 내부에서 포커스된 화면의 이름을 가져옵니다. (없으면 기본값인 ReaderMain)
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'ReaderMain';

    // 독서 메인, 문장 저장 편집화면, 결과 성적표 화면 중 하나라도 켜져 있으면 하단 탭바를 전면 차단합니다!
    if (routeName === 'ReaderMain' || routeName === 'SaveSentence' || routeName === 'Result') {
      navigation.setOptions({
        tabBarStyle: { display: 'none' }, // 👈 탭바를 화면에서 완전히 숨겨버리는 마법의 속성
      });
    } else {
      // 그 외의 예외 상황이 발생하면 다시 보이게 복원 (방어막)
      navigation.setOptions({
        tabBarStyle: { display: 'flex' },
      });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ReaderMain"
        component={ReaderScreen}
      />

      <Stack.Screen
        name="SaveSentence"
        component={SaveSentenceScreen}
        options={{
            headerShown: false,
        }}
      />

      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{
            headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}