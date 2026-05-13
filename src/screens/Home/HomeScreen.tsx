import { ScrollView } from 'react-native';

import QuoteCard from '../../components/home/QuoteCard';

export default function HomeScreen() {
  return (
    <ScrollView>
      <QuoteCard />
      <QuoteCard />
      <QuoteCard />
    </ScrollView>
  );
}