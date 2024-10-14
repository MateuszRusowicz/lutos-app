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

export default function ModalForm({ open, close, formContent }) {
  //state for each input and custom hook from context api
  const [composer, setComposer] = useState("");
  const [title, setTitle] = useState("");
  const [musicians, setMusicians] = useState("");
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

  const handleSubmit = async function (e) {
    e.preventDefault();
    const musiciansArr = musicians
      .toLowerCase()
      .trim()
      .split(",")
      .filter((m) => m !== "");

    //render spinner add

    setProcessModal({ open: true, status: "waitingSpinner" });
    try {
      await axios.post("/api/songs", {
        title,
        composer,
        musicians: musiciansArr,
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
    setComposer("");
    setTitle("");
    setMusicians("");
  };

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
          <form onSubmit={handleSubmit}>
            <h2 className={styles.title}>Insert new composition</h2>
            <ul className={styles.formGroup}>
              <li>
                <label htmlFor="composer">Composer</label>
                <input
                  value={composer}
                  onChange={(e) => setComposer(e.target.value)}
                  type="text"
                  id="composer"
                  name="composer"
                  placeholder="W.A. Mozart"
                  required
                />
              </li>
              <li>
                <label htmlFor="title">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="String quartet"
                  required
                />
              </li>
              <li>
                <label htmlFor="musicians">Musicians</label>
                <input
                  value={musicians}
                  onChange={(e) => setMusicians(e.target.value)}
                  type="text"
                  id="musicians"
                  name="musicians"
                  placeholder="Hans von Bulow, Joseph Joachim (coma-separated)"
                  required
                />
              </li>
            </ul>
            <div className={styles.buttonGroup}>
              <button className={styles.closeButton} onClick={close}>
                Close
              </button>
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </div>
          </form>
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
