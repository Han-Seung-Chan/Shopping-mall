import { ForwardedRef, forwardRef, SyntheticEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { DELETE_CART, UPDATE_CART } from '../../graphql/cart';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import ItemData from './itemData';
import { CartType } from '../../types/cartType';

const CartItem = (
  { id, product: { imageUrl, title, price }, amount }: CartType,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = useQueryClient();

  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher<{ updateCart: CartType }>(UPDATE_CART, { id, amount }),
    {
      onMutate: async ({ id, amount }) => {
        await queryClient.cancelQueries(QueryKeys.CART);
        const { cart: prevCart } =
          queryClient.getQueryData<{ cart: CartType[] }>(QueryKeys.CART) || {};

        if (!prevCart) return null;
        const targetIndex = prevCart.findIndex(
          (cartItem) => cartItem.id === id
        );

        if (targetIndex === undefined || targetIndex < 0) return prevCart;
        const newCart = [...prevCart];
        newCart.splice(targetIndex, 1, { ...newCart[targetIndex], amount });
        queryClient.setQueryData(QueryKeys.CART, { cart: newCart });
        return prevCart;
      },
      onSuccess: ({ updateCart }) => {
        const { cart: prevCart } = queryClient.getQueryData<{
          cart: CartType[];
        }>(QueryKeys.CART) || { cart: [] };
        const targetIndex = prevCart?.findIndex(
          (cartItem) => cartItem.id === updateCart.id
        );
        const newCart = [...prevCart];
        newCart.splice(targetIndex, 1, updateCart);
        queryClient.setQueryData(QueryKeys.CART, { cart: newCart });
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

  const handleDeleteItem = () => deleteCart({ id });
  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    if (amount < 1) return;
    updateCart({ id, amount });
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
