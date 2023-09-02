import { cartHandlers } from './cart';
import { productHandlers } from './product';

export const handlers = [...productHandlers, ...cartHandlers];
