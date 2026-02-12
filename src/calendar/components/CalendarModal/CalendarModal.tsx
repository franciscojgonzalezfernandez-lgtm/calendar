import { useState } from "react";
import Modal from "react-modal";
import "./CalendarModal.css";
import { CalendarForm } from "./CalendarForm";
import { useUiStore } from "../../../hooks";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, openDateModal, closeDateModal } = useUiStore();

  function openModal() {
    openDateModal();
  }

  function closeModal() {
    closeDateModal();
  }
  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <CalendarForm />
    </Modal>
  );
};
