import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ReaderScreen from '../screens/Reader/ReaderScreen';
import SaveSentenceScreen from '../screens/Reader/SaveSentenceScreen';
import ResultScreen from '../screens/Result/ResultScreen';

const Stack = createNativeStackNavigator();

export default function ReadingStackNavigator() {
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
      />
    </Stack.Navigator>
  );
}