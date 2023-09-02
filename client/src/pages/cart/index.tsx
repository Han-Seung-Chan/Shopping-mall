import { useQuery } from 'react-query';
import CartList from '../../components/cart';
import { GET_CART } from '../../graphql/cart';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import { CartType } from '../../types/cartType';

const queryOption = {
  staleTime: 0,
  cacheTime: 1000,
};

const Cart = () => {
  const { data } = useQuery(
    QueryKeys.CART,
    () => graphqlFetcher(GET_CART),
    queryOption
  );
  const cartItems = Object.values(data || {}) as CartType[];

  return cartItems.length ? (
    <CartList items={cartItems} />
  ) : (
    <div>장바구니가 비었어요</div>
  );
};

export default Cart;
