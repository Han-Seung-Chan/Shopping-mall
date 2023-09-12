export interface ProductType {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  createdAt: number;
}

export interface ProductsType {
  products: ProductType[];
}

// 지정한 타입을 뺀 나머지 타입.
export type MutableProduct = Omit<ProductType, 'id' | 'createdAt'>;
