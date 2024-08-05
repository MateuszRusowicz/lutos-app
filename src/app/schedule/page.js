"use client";
import Composition from "../components/composition";
import { useSongsState } from "../context-hook/useSongsState.js";
import { useState } from "react";
import styles from "./schedule.module.css";

export default function Schedule() {
  const { songs, authState } = useSongsState();
  const [pickedSongs, setPickedSongs] = useState([]);
  const [clashing, setClashing] = useState(false);

  console.log(authState, songs);

  const handleAdd = function (id, index) {
    const musiciansArr = songs[index].musicians
      .toLowerCase()
      .split(",")
      .map((e) => e.trim());

    let musicianAlreadyChosen = false;
    let clashingSong = null;

    // CHECKS IF MUSICIANS HAVE BEEN ALREADY CHOSEN
    musiciansArr.some((m) => {
      for (let i = 0; i < songs.length; i++) {
        if (pickedSongs.includes(songs[i].id)) {
          const musiciansToCheckArr = songs[i].musicians
            .toLowerCase()
            .split(",")
            .map((e) => e.trim());

          if (musiciansToCheckArr.some((e) => e === m)) {
            musicianAlreadyChosen = true;
            clashingSong = songs[i].id;
            break;
          }
        }
      }
    });

    if (musicianAlreadyChosen) {
      setClashing(clashingSong);
      setTimeout(() => setClashing(null), 200);
    } else {
      setPickedSongs((prev) => [...prev, id]);
    }
  };

  const handleRemove = function (id) {
    setPickedSongs((prev) => prev.filter((songId) => songId !== id));
  };

  // RENDER COMPONENT HTML
  if (authState === "loading") return <>Loading</>;
  else if (authState === "unathenticated") return <>Sign in</>;
  else if (authState === "authenticated")
    return (
      <>
        <h1 className={styles.scheduleHeader}>Schedule</h1>
        <main className={styles.scheduleMain}>
          <div
            className={`${styles.scheduleSection} ${styles.selectedSection}`}
          >
            <h2>selected works</h2>
            <ul>
              {songs.map((s) => {
                if (pickedSongs.includes(s.id)) {
                  return (
                    <li
                      key={s.id}
                      className={s.id === clashing ? styles.nameClash : ""} // if the song is clashing if will turn red for a while
                    >
                      <Composition
                        onSelect={() => handleRemove(s.id)}
                        title={s.title}
                        composer={s.composer}
                        musicians={s.musicians}
                      />
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
                      <Composition
                        onSelect={() => handleAdd(s.id, index)}
                        title={s.title}
                        composer={s.composer}
                        musicians={s.musicians}
                      />
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </main>
      </>
    );
}
