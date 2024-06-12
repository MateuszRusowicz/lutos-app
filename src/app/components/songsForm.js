import { useState } from "react";
import Modal from "react-modal";
import styles from "./songsForm.module.css";
import axios from "axios";
import { useSongsState } from "../context-hook/useSongsState";

export default function SongsForm({ open, close }) {
  const [composer, setComposer] = useState("");
  const [title, setTitle] = useState("");
  const [musicians, setMusicians] = useState("");
  const { songs, setSongs, fetchSongs } = useSongsState();

  const handleSubmit = async function (e) {
    e.preventDefault();
    const musiciansArr = musicians
      .toLowerCase()
      .trim()
      .split(",")
      .filter((m) => m !== "");

    try {
      const postedSong = await axios.post("/api/songs", {
        title,
        composer,
        musicians: musiciansArr,
      });
      console.log("posted:", postedSong.data);
    } catch (err) {
      console.error("error posting data", err);
    }

    //fetch songs i useState
    close();
    fetchSongs();
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={close}
      contentLabel="add new song"
      overlayClassName={styles.modalOverlay}
      className={styles.modalContent}
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
  );
}
