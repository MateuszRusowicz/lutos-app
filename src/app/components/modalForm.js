"use client";
import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import styles from "./modalForm.module.css";
import axios from "axios";
import { useSongsState } from "../context-hook/useSongsState";
import {
  SpinnerIcon,
  ConfirmIcon,
  ErrorIcon,
} from "../../../public/images/svgs";
import CompositionForm from "./forms/CompostionForm";

export default function ModalForm({ open, close, formContent }) {
  const { fetchSongs, authState, fetchMusicians } = useSongsState();
  const [processModal, setProcessModal] = useState({
    open: false,
    status: null,
    message: "",
  });
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    setIsRendered(true);
  }, []);

  const timerRef = useRef(null);

  // ------------------HANDLERS---------------------------------------

  const submitComposition = async function (values) {
    //add spinner
    setProcessModal({ open: true, status: "waitingSpinner" });
    try {
      await axios.post("/api/compositions", {
        ...values,
        userId: authState[1],
      });
      setProcessModal({
        open: true,
        status: 200,
        message: "Successfully added to database",
      });
      timerRef.current = setTimeout(
        () => setProcessModal({ open: false, status: null, message: "" }),
        5000
      );
    } catch (err) {
      setProcessModal({
        open: true,
        status: 500,
        message: `Error posting data: ${err}`,
      });
      timerRef.current = setTimeout(
        () => setProcessModal({ open: false, status: null, message: "" }),
        3000
      );
    }
    //fetch songs
    close();
    fetchSongs();
  };

  const submitMusician = async function (values) {
    console.log(values);
    const formattedFirstName = values.firstName.toLowerCase().trim();
    const formattedLastName = values.lastName.toLowerCase().trim();

    setProcessModal({ open: true, status: "waitingSpinner" });
    try {
      await axios.post("/api/musicians", {
        firstName: formattedFirstName,
        lastName: formattedLastName,
        instrument: values.instrument,
        userId: authState[1],
      });
      setProcessModal({
        open: true,
        status: 200,
        message: "Successfully added to database",
      });
      timerRef.current = setTimeout(
        () => setProcessModal({ open: false, status: null, message: "" }),
        5000
      );
    } catch (err) {
      setProcessModal({
        open: true,
        status: 500,
        message: `Error posting data: ${err}`,
      });
      timerRef.current = setTimeout(
        () => setProcessModal({ open: false, status: null, message: "" }),
        3000
      );
    }

    fetchMusicians();
    close();
  };
  const handleSubmit =
    formContent.name === "composition" ? submitComposition : submitMusician;

  // -----------------------------RENDERING MODAL FORM
  return (
    <>
      {isRendered && (
        <Modal
          isOpen={open}
          onRequestClose={close}
          contentLabel="add new song"
          overlayClassName={styles.modalOverlay}
          className={styles.modalContent}
          appElement={document.getElementById("root")}
        >
          <CompositionForm
            formContent={formContent}
            handleSubmit={handleSubmit}
          />
        </Modal>
      )}
      {/* ------------------- RENDER FETCH STATUS: SPINNER/SUCCESS/ERROR------------------------------ */}
      {isRendered && (
        <Modal
          isOpen={processModal.open}
          appElement={document.getElementById("root")}
          overlayClassName={styles.modalOverlay}
          className={styles.modalContent}
          onRequestClose={() => {
            clearTimeout(timerRef.current);
            setProcessModal({ open: false, status: null, message: "" });
          }}
        >
          {processModal.status === 200 ? (
            <>
              <h3>{processModal.message}</h3>
              <ConfirmIcon />
            </>
          ) : processModal.status === 500 ? (
            <>
              <h3>{processModal.message}</h3>
              <ErrorIcon />
            </>
          ) : (
            <SpinnerIcon />
          )}
        </Modal>
      )}
    </>
  );
}
