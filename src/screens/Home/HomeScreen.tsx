// 📝 src/screens/Home/HomeScreen.tsx (순정 원복 및 깔끔본)

import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  FlatList,
} from 'react-native';

import HomeHeader from '../../components/home/HomeHeader';
import QuoteCard from '../../components/home/QuoteCard'; // 💡 복구된 소중한 컴포넌트 호출
import { API_CONFIG } from '../../config/apiConfig';
import { homeService, HomeSentenceItem } from '../../services/homeService';

export default function HomeScreen() {
  const [quotes, setQuotes] = useState<HomeSentenceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchHomeData = async () => {
    try {
      setLoading(true);

      if (API_CONFIG.USE_MOCK) {
        // 원래 쓰시던 목 데이터 피드 구성
        const mockFeedItems: HomeSentenceItem[] = [
          {
            id: 1,
            bookTitle: "마르셀 프루스트",
            content: "모든 위대한 책은 두 번 읽어야 한다. 한 번은 우리가 읽는 것이고, 다른 한 번은 책이 우리를 읽는 것이다.",
            author: "Marcel Proust",
            imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop"
          },
          {
            id: 2,
            bookTitle: "Deepflow 명언",
            content: "책은 결코 인간을 배신하지 않는다. 인간이 책을 배신할 뿐이다.",
            author: "Deepflow",
            imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop"
          }
        ];
        setQuotes(mockFeedItems);
        return;
      }

      const feedData = await homeService.getHomeFeed();
      setQuotes(feedData.items);
    } catch (error) {
      console.error('홈 피드 수급 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F8FC' }}>
      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#004AC6" />
        </View>
      ) : (
        <FlatList
          data={quotes}
          keyExtractor={(item, index) => `${item.content}-${index}`}
          ListHeaderComponent={<HomeHeader />}
          renderItem={({ item }) => (
            <QuoteCard
              id={item.id}
              title={item.bookTitle}
              quote={item.content}
              author={item.author}
              imageUrl={item.imageUrl}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}