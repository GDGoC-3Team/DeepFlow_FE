import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ReaderScreen from '../screens/Reader/ReaderScreen';
import SaveSentenceScreen from '../screens/Reader/SaveSentenceScreen';
import ResultScreen from '../screens/Result/ResultScreen';
import { useLayoutEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function ReadingStackNavigator({navigation, route}: any) {
  
  useLayoutEffect(() => {
    
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'ReaderMain';

    
    if (routeName === 'ReaderMain' || routeName === 'SaveSentence' || routeName === 'Result') {
      navigation.setOptions({
        tabBarStyle: { display: 'none' }, 
      });
    } else {
      
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