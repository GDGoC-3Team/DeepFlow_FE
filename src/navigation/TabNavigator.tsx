import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Home/HomeScreen';
import ReadingStackNavigator from './ReadingStackNavigator';
import MyPageScreen from '../screens/MyPage/MyPageScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({

        headerShown: false,

        tabBarShowLabel: true,

        tabBarActiveTintColor: '#111827',

        tabBarInactiveTintColor: '#C4C8D0',

        tabBarStyle: {

          height: 72,

          paddingTop: 8,

          paddingBottom: 8,

          borderTopWidth: 1,

          borderTopColor: '#E5E7EB',

          backgroundColor: '#FFFFFF',

          elevation: 0,

          shadowOpacity: 0,
        },

        tabBarLabelStyle: {

          fontSize: 10,

          fontWeight: '600',

          marginTop: 2,
        },

        tabBarIcon: ({ focused, color }) => {

          let iconName:
            | 'home'
            | 'home-outline'
            | 'time'
            | 'time-outline'
            | 'person'
            | 'person-outline'
            = 'home-outline';

          if (route.name === 'Home') {

            iconName = 
              focused ? 'home' : 'home-outline';

          } else if (route.name === 'Reading') {

            iconName = 
              focused ? 'time' : 'time-outline';

          } else if (route.name === 'MyPage') {

            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={20}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Reading" component={ReadingStackNavigator} options={{ headerShown: false,}}/>
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
}