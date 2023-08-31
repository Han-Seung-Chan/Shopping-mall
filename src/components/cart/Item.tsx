import { ForwardedRef, forwardRef, SyntheticEvent } from 'react';
import { useMutation } from 'react-query';
import ItemData from './itemData';
import { DELETE_CART, UPDATE_CART } from '../../graphql/cart';
import { QueryKeys, getClient, graphqlFetcher } from '../../queryClient';
import { CartType, CartTypeIndexSignature } from '../../types/cartType';

const CartItem = (
  { id, imageUrl, price, title, amount }: CartType,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = getClient();

  const getPrevCart = () =>
    queryClient.getQueryData<CartTypeIndexSignature>(QueryKeys.CART);
  const updateServerCartData = <T,>(newCart: T) =>
    queryClient.setQueryData(QueryKeys.CART, newCart);

  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount }),
    {
      onMutate: async ({ id, amount }) => {
        await queryClient.cancelQueries(QueryKeys.CART);
        const prevCart = getPrevCart();
        if (!prevCart?.[id]) return prevCart;

        const newCart = {
          ...(prevCart || {}),
          [id]: { ...prevCart[id], amount },
        };
        updateServerCartData(newCart);
        return prevCart;
      },

      onSuccess: (newValue) => {
        const prevCart = getPrevCart();
        const newCart = {
          ...(prevCart || {}),
          [id]: newValue,
        };
        updateServerCartData(newCart);
      },
    }
  );

  const { mutate: deleteCart } = useMutation(
    ({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.CART);
      },
    }
  );

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    if (amount < 1) return;
    updateCart({ id, amount });
  };

  const handleDeleteItem = () => {
    deleteCart({ id });
  };

  return (
    <li className="cart-item">
      <input
        ref={ref}
        className="cart-item__checkbox"
        type="checkbox"
        name="select-item"
      />
      <ItemData imageUrl={imageUrl} price={price} title={title} />
      <input
        className="cart-item__amount"
        type="number"
        value={amount}
        min={1}
        onChange={handleUpdateAmount}
      />
      <button
        className="cart-item__button"
        type="button"
        onClick={handleDeleteItem}
      >
        삭제
      </button>
    </li>
  );
};

export default forwardRef(CartItem);
