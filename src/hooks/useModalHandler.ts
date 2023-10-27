import { useState } from "react";

export interface ModalHandler {
  isModalOpen: boolean;
  showModal: () => void;
  closeModal: () => void;
}

function useModalHandler(): ModalHandler {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, showModal, closeModal };
}

export default useModalHandler;
