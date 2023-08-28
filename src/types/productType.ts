export interface ProductType {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface ProductsType {
  products: ProductType[];
}
