import { graphql } from 'msw';
import { GET_CART, ADD_CART, UPDATE_CART, DELETE_CART } from '../graphql/cart';
import { mockItem } from '../data/item';
import { CartTypeIndexSignature } from '../types/cartType';

let cartData: CartTypeIndexSignature = {};

export const cartHandlers = [
  graphql.query(GET_CART, (_, res, ctx) => {
    return res(ctx.data(cartData));
  }),

  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const newCartData = { ...cartData };
    const id = req.variables.id;
    const targetProduct = mockItem.find((item) => item.id === req.variables.id);

    if (!targetProduct) throw new Error('상품이 없습니다');

    const newItem = {
      ...targetProduct,
      amount: (newCartData[id]?.amount || 0) + 1,
    };
    newCartData[id] = newItem;
    cartData = newCartData;

    return res(ctx.data(newItem));
  }),

  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    const newData = { ...cartData };
    const { id, amount } = req.variables;

    if (!newData[id]) throw new Error('없는 데이터입니다');

    const newItem = {
      ...newData[id],
      amount,
    };
    newData[id] = newItem;
    cartData = newData;
    return res(ctx.data(newItem));
  }),

  graphql.mutation(DELETE_CART, ({ variables: { id } }, res, ctx) => {
    const newData = { ...cartData };
    delete newData[id];
    cartData = newData;
    return res(ctx.data(id));
  }),
];
