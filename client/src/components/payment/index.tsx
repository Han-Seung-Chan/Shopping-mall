import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import PaymentModal from './Modal';
import PayResult from '../PayResult';
import { EXECUTE_PAY } from '../../graphql/payment';
import { graphqlFetcher } from '../../queryClient';
import { checkedCartState } from '../../store/cart';

const Payment = () => {
  const navigate = useNavigate();
  const [modalShown, toggleModal] = useState(false);
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);

  const { mutate: executePay } = useMutation((payInfos: string[]) =>
    graphqlFetcher(EXECUTE_PAY, payInfos)
  );

  const showModal = () => toggleModal(true);

  const cancel = () => toggleModal(false);

  const proceed = () => {
    const payInfos = checkedCartData.map(({ id }) => id);
    executePay(payInfos);
    setCheckedCartData([]);

    alert('결제 완료되었습니다.');
    navigate('/products', { replace: true });
  };

  return (
    <div>
      <PayResult submitTitle="결제하기" handleSubmit={showModal} />
      <PaymentModal show={modalShown} proceed={proceed} cancel={cancel} />
    </div>
  );
};

export default Payment;
