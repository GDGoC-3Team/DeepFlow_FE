import { ScrollView, View } from 'react-native';

import HomeHeader from '../../components/home/HomeHeader';
import QuoteCard from '../../components/home/QuoteCard';

//테스트용 mock data
import { mockQuotes } from '../../constants/mockData';

export default function HomeScreen() {
  return (
    <ScrollView
      style={{ backgroundColor: '#F7F8FC' }}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />

      <View style={{ marginTop: 16 }}>
        {mockQuotes.map((item) => (
          <QuoteCard
            key={item.id}
            title={item.title}
            quote={item.quote}
            author={item.author}
          />
        ))}
      </View>
    </ScrollView>
  );
}