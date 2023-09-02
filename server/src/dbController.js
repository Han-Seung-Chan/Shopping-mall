import fs from 'fs';
import { resolve } from 'path';

export const CART = 'cart';
export const PRODUCTS = 'products';

const basePath = resolve();

const filenames = {
  [CART]: resolve(basePath, 'src/db/cart.json'),
  [PRODUCTS]: resolve(basePath, 'src/db/products.json'),
};

export const readDB = (target) => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], 'utf-8'));
  } catch (err) {
    console.error(err);
  }
};

export const writeDB = (target, data) => {
  try {
    fs.writeFileSync(filenames[target], JSON.stringify(data, null, '  '));
  } catch (err) {
    console.error(err);
  }
};
