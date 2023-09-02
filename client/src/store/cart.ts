import { atom } from 'recoil';
import { CartType } from '../types/cartType';

export const checkedCartState = atom<CartType[]>({
  key: 'cartState',
  default: [],
});
