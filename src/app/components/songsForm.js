import { useState } from "react";
import Modal from "react-modal";
import styles from "./songsForm.module.css";
import axios from "axios";
import { useSongsState } from "../context-hook/useSongsState";

export default function SongsForm({ open, close }) {
  //state for each input and custom hook from context api
  const [composer, setComposer] = useState("");
  const [title, setTitle] = useState("");
  const [musicians, setMusicians] = useState("");
  const { fetchSongs } = useSongsState();
  const [confirmationModal, setConfirmationModal] = useState(false);

  const handleSubmit = async function (e) {
    e.preventDefault();
    const musiciansArr = musicians
      .toLowerCase()
      .trim()
      .split(",")
      .filter((m) => m !== "");

    //render spinner add

    try {
      const postedSong = await axios.post("/api/songs", {
        title,
        composer,
        musicians: musiciansArr,
      });
      console.log("posted:", postedSong.data);

      setConfirmationModal(true);
      setTimeout(() => setConfirmationModal(false), 500);
    } catch (err) {
      console.error("error posting data", err);
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
      {confirmationModal && (
        <Modal
          isOpen={confirmationModal}
          appElement={document.getElementById("root")}
          overlayClassName={styles.modalOverlay}
          className={styles.modalContent}
        >
          <h3>Successfully added to database</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Modal>
      )}
    </>
  );
}
