import { SyntheticEvent } from 'react';
import { useRecoilValue } from 'recoil';
import ItemData from '../cart/itemData';
import { checkedCartState } from '../../store/cart';

interface PayResultPropsType {
  submitTitle: string;
  handleSubmit: (e: SyntheticEvent) => void;
}

const PayResult = ({ submitTitle, handleSubmit }: PayResultPropsType) => {
  const checkedItems = useRecoilValue(checkedCartState);
  const totalPrice = checkedItems.reduce(
    (res, { product: { price }, amount }) => {
      res += price * amount;
      return res;
    },
    0
  );
  return (
    <div className="cart-result">
      <ul>
        {checkedItems.map(
          ({ product: { imageUrl, price, title }, amount, id }) => (
            <li key={id}>
              <ItemData imageUrl={imageUrl} price={price} title={title} />
              <p>수량: {amount}</p>
              <p>금액: {price * amount}</p>
            </li>
          )
        )}
      </ul>
      <p>총예상결제액: {totalPrice}</p>
      <button onClick={handleSubmit}>{submitTitle}</button>
    </div>
  );
};

export default PayResult;
