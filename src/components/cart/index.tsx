import { useRef, SyntheticEvent } from 'react';
import { CartType } from '../../types/cartType';
import CartItem from './Item';

interface CartListPropsType {
  items: CartType[];
}

const CartList = ({ items }: CartListPropsType) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleCheckboxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = e.target as HTMLInputElement;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll('select-item').length;
    const checkboxes = formRef.current.querySelectorAll<HTMLInputElement>(
      '.cart-item__checkbox'
    );

    if (targetInput.classList.contains('select-all')) {
      // select-all 선택시
      const allChecked = targetInput.checked;
      checkboxes.forEach((inputElem) => {
        inputElem.checked = allChecked;
      });
    } else {
      // 개별아이템 선택시
      const allChecked = selectedCount === items.length;
      formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked =
        allChecked;
    }
  };

  return (
    <div>
      <form ref={formRef} onChange={handleCheckboxChanged}>
        <label>
          <input className="select-all" name="select-all" type="checkbox" />
          전체선택
        </label>
        <ul className="cart">
          {items.map((item) => (
            <CartItem {...item} key={item.id} />
          ))}
        </ul>
      </form>
    </div>
  );
};

export default CartList;
