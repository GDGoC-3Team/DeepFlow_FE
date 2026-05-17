import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({

  KoPub: require(
    './src/assets/fonts/KoPub.ttf'
  ),

  NotoSans: require(
    './src/assets/fonts/NotoSans.ttf'
  ),

  Nanum: require(
    './src/assets/fonts/Nanum.ttf'
  ),

});
if (!fontsLoaded) {
  return null;
}
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}