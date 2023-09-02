import ModalPortal from '../../Portal';

interface PaymentModalPropsType {
  show: boolean;
  proceed: () => void;
  cancel: () => void;
}

const PaymentModal = ({ show, proceed, cancel }: PaymentModalPropsType) => {
  return show ? (
    <ModalPortal>
      <div className={`modal ${show ? 'show' : ''}`}>
        <div className="modal__inner">
          <p>정말 결제할까요?</p>
          <div>
            <button onClick={proceed}>예</button>
            <button onClick={cancel}>아니오</button>
          </div>
        </div>
      </div>
    </ModalPortal>
  ) : null;
};

export default PaymentModal;
