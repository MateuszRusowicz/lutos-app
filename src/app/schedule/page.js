"use client";
import Composition from "../components/composition";
import { useSongsState } from "../context-hook/useSongsState.js";
import { useState } from "react";
import styles from "./schedule.module.css";

export default function Schedule() {
  const { songs } = useSongsState();
  const [pickedSongs, setPickedSongs] = useState([]);

  const handleAdd = function (id, index) {
    const musiciansArr = songs[index].musicians
      .toLowerCase()
      .split(",")
      .map((e) => e.trim());

    let musicianAlreadyChosen = false;

    musiciansArr.some((m) => {
      for (let i = 0; i < songs.length; i++) {
        if (pickedSongs.includes(songs[i].id)) {
          const musiciansToCheckArr = songs[i].musicians
            .toLowerCase()
            .split(",")
            .map((e) => e.trim());

          if (musiciansToCheckArr.some((e) => e === m))
            musicianAlreadyChosen = true;
          return true;
        }
      }
    });

    musicianAlreadyChosen
      ? console.log("error:musician already chosen")
      : setPickedSongs((prev) => [...prev, id]);
  };

  const handleRemove = function (id) {
    setPickedSongs((prev) => prev.filter((songId) => songId !== id));
  };

  return (
    <>
      <h1 className={styles.scheduleHeader}>Schedule</h1>
      <main className={styles.scheduleMain}>
        <div className={`${styles.scheduleSection} ${styles.selectedSection}`}>
          <h2>selected works</h2>
          <ul>
            {songs.map((s) => {
              if (pickedSongs.includes(s.id)) {
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => handleRemove(s.id)}
                      className={styles.scheduleButton}
                    >
                      <Composition
                        title={s.title}
                        composer={s.composer}
                        musicians={s.musicians}
                      />
                    </button>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className={styles.scheduleSection}>
          <h2>available works</h2>
          <ul>
            {songs.map((s, index) => {
              if (!pickedSongs.includes(s.id)) {
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => handleAdd(s.id, index)}
                      className={styles.scheduleButton}
                    >
                      <Composition
                        title={s.title}
                        composer={s.composer}
                        musicians={s.musicians}
                      />
                    </button>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </main>
      <aside className={styles.scheduleAside}>
        <h2>fitting works</h2>
        <ul>
          <li></li>
        </ul>
      </aside>
    </>
  );
}
