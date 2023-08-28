import { graphql } from 'msw';
import { GET_PRODUCT, GET_PRODUCTS } from '../graphql/products';
import { mockItem } from '../data/item';

export const productHandlers = [
  graphql.query(GET_PRODUCTS, (_, res, ctx) => {
    return res(
      ctx.data({
        products: mockItem,
      })
    );
  }),

  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const found = mockItem.find((item) => item.id === req.variables.id);
    if (found) return res(ctx.data(found));
    return res();
  }),
];
