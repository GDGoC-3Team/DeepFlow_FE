// export const mockQuotes = [
//   {
//     id: 1,
//     title: '오늘의 문장 1',
//     quote: '모든 위대한 책은 두 번 읽어야 한다.',
//     author: 'MARCEL PROUST',
//   },

//   {
//     id: 2,
//     title: '오늘의 문장 2',
//     quote: '책은 인간을 배신하지 않는다.',
//     author: 'UNKNOWN',
//   },

//   {
//     id: 3,
//     title: '오늘의 문장 3',
//     quote: '독서는 삶을 깊게 만든다.',
//     author: 'GOETHE',
//   },

//   {
//     id: 4,
//     title: '오늘의 문장 4',
//     quote: '문장은 마음에 남는다.',
//     author: 'HEMINGWAY',
//   },

//   {
//     id: 5,
//     title: '오늘의 문장 5',
//     quote: '좋은 책은 친구와 같다.',
//     author: 'ARISTOTLE',
//   },

//   {
//     id: 6,
//     title: '오늘의 문장 6',
//     quote: '생각은 문장에서 시작된다.',
//     author: 'KAFKA',
//   },

//   {
//     id: 7,
//     title: '오늘의 문장 7',
//     quote: '우리는 읽으며 성장한다.',
//     author: 'TOLSTOY',
//   },

//   {
//     id: 8,
//     title: '오늘의 문장 8',
//     quote: '글은 시간을 남긴다.',
//     author: 'ORWELL',
//   },

//   {
//     id: 9,
//     title: '오늘의 문장 9',
//     quote: '마음은 책을 닮아간다.',
//     author: 'NIETZSCHE',
//   },

//   {
//     id: 10,
//     title: '오늘의 문장 10',
//     quote: '독서는 또 다른 여행이다.',
//     author: 'DOSTOEVSKY',
//   },
// ];

// 🔑 인증 관련 가짜 응답 데이터
export const mockUserResponse = {
  id: 1,
  email: "reader@example.com",
  nickname: "독서하는고래"
};

// 🏠 홈 피드 관련 가짜 응답 데이터 (디자인 맞춤형 규격)
export const mockSentenceFeedResponse = {
  date: "2026-05-19",
  items: [
    {
      content: "책은 마음을 비추는 거울이다.",
      imageUrl: "https://storage.googleapis.com/deepflow/sentences/example.jpg",
      bookTitle: "어린 왕자",
      author: "앙투안 드 생텍쥐페리"
    }
  ]
};