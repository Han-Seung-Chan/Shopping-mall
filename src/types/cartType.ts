export interface CartType {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  amount: number;
}

export interface CartTypeIndexSignature {
  [key: string]: CartType;
}
