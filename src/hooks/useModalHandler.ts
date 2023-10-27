import { useState } from "react";

function useModalHandler() {
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
