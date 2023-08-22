import GlobalLayout from './pages/_layout';
import Index from './pages/index';
import ProductsList from './pages/products/index';
import ProductsDetail from './pages/products/[id]';
import CartList from './pages/cart/index';

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <Index />, index: true },
      { path: '/products', element: <ProductsList />, index: true },
      { path: '/products/:id', element: <ProductsDetail /> },
      { path: '/cart', element: <CartList />, index: true },
    ],
  },
];

export const pages = [
  { route: '/' },
  { route: '/products' },
  { route: '/products/:id' },
  { route: '/cart' },
];
