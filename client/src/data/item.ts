export const mockItem = (() =>
  Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1 + '',
    imageUrl: `https://i.pravatar.cc/200?img=${i + 1}`,
    price: Number(`${50000 + i * 1000}`),
    title: `임시상품${i + 1}`,
    description: `임시상세내용${i + 1}`,
    createdAt: new Date(1645735501883 + i * 1000 * 60 * 60 * 10).toString(),
  })))();
