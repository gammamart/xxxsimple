// Modal.tsx

import React from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onRequestClose}>
          <CgClose size={23} color="red" />
        </CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  color: #a8acb4;
  background-color: #282934;
  padding: 1.5rem;
  border-radius: 8px;
  position: relative;
  /* min-width: 400px; */
  /* max-width: 600px; */
  /* height: 255px; */
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;

  & > button:last-child {
    width: 100px;
    cursor: pointer;

    &:hover {
      background-color: #d0cccc;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: #333;

  &:hover {
    color: #555;
  }
`;

export default Modal;
