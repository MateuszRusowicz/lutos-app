import { ErrorIcon, SpinnerIcon } from "../../../public/images/svgs";
import { useState } from "react";
import Modal from "react-modal";

export default function AsyncProcessModal({ status }, children) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal isOpen={isOpen} onRequestClose={setIsOpen(false)}>
      {status === "spinner" ? <SpinnerIcon /> : <ErrorIcon />}
      {children}
    </Modal>
  );
}
