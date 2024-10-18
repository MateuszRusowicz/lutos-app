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
  //state for each input and custom hook from context api
  const [compositionData, setCompositionData] = useState({
    composer: "",
    title: "",
    musiciansId: [],
  });
  const [musiciansData, setMusiciansData] = useState({
    firstName: "",
    lastName: "",
    instrument: "",
  });
  const { fetchSongs, authState } = useSongsState();
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

  const submitComposition = async function (e) {
    e.preventDefault();

    //add render spinner
    setProcessModal({ open: true, status: "waitingSpinner" });
    try {
      await axios.post("/api/compositions", {
        ...compositionData,
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
    //fetch songs i reset input state
    close();
    fetchSongs();
    setCompositionData({
      composer: "",
      title: "",
      musiciansId: "",
    });
    setMusiciansData({
      firstName: "",
      lastName: "",
      instrument: "",
    });
  };

  const submitMusician = async function (e) {
    e.preventDefault();

    const formattedFirstName = musiciansData.firstName.toLowerCase().trim();
    const formattedLastName = musiciansData.lastName.toLowerCase().trim();

    setProcessModal({ open: true, status: "waitingSpinner" });
    try {
      await axios.post("/api/musicians", {
        firstName: formattedFirstName,
        lastName: formattedLastName,
        instrument: musiciansData.instrument,
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
  };
  const handleSubmit =
    formContent === "composition" ? submitComposition : submitMusician;

  // -----------------------------RENDERING THE MODAL FORM
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
            state={
              formContent === "composition" ? compositionData : musiciansData
            }
            stateUpdate={
              formContent === "composition"
                ? setCompositionData
                : setMusiciansData
            }
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
