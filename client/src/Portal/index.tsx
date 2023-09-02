import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalPropsType {
  children: ReactNode;
}

const ModalPortal = ({ children }: ModalPortalPropsType) => {
  return createPortal(children, document.getElementById('modal')!);
};

export default ModalPortal;
