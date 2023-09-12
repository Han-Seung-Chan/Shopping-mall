import GlobalLayout from './pages/_layout';
import Index from './pages/index';
import ProductsListPage from './pages/products/list';
import ProductsDetailPage from './pages/products/[id]';
import CartList from './pages/cart/index';
import PaymentPage from './pages/payment/index';
import AdminIndex from './pages/admin/index';
export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <Index />, index: true },
      { path: '/products', element: <ProductsListPage />, index: true },
      { path: '/products/:id', element: <ProductsDetailPage /> },
      { path: '/cart', element: <CartList />, index: true },
      { path: '/payment', element: <PaymentPage />, index: true },
      { path: '/admin', element: <AdminIndex />, index: true },
    ],
  },
];

export const pages = [
  { route: '/' },
  { route: '/products' },
  { route: '/products/:id' },
  { route: '/cart' },
  { route: '/payment' },
  { route: '/admin' },
];
