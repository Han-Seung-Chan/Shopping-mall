import { ProductType } from './productType';

export type CartType = {
  id: string;
  amount: number;
  product: ProductType;
};

export interface CartTypeIndexSignature {
  [key: string]: CartType;
}
