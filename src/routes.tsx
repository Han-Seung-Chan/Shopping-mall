import GlobalLayout from './pages/_layout';
import Index from './pages/index';
import ProductsList from './pages/products/index';
import ProductsId from './pages/products/[id]';

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <Index />, index: true },
      { path: '/products', element: <ProductsList />, index: true },
      { path: '/products/:id', element: <ProductsId /> },
    ],
  },
];

export const pages = [
  { route: '/' },
  { route: '/products' },
  { route: '/products/:id' },
];
