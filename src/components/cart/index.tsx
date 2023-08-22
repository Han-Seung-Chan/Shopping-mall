import { CartType } from '../../graphql/cart';
import CartItem from './Item';

interface CartListPropsType {
  items: CartType[];
}

const CartList = ({ items }: CartListPropsType) => {
  return (
    <ul>
      {items.map((item) => (
        <CartItem {...item} key={item.id} />
      ))}
    </ul>
  );
};

export default CartList;
