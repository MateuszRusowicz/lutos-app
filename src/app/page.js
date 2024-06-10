"use client";

import Image from "next/image";
import styles from "./page.module.css";
// import { useState, useEffect } from "react";
// import axios from "axios";
import { songs } from "./context-hook/useSongsState";
import SongsForm from "./components/songsForm";
import Link from "next/link";
import Composition from "./components/composition";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  //up to date list of songs
  // const [songs, setSongs] = useState([]);

  // useEffect(() => {
  //   fetchSongs();
  // }, []);

  // const fetchSongs = async function () {
  //   try {
  //     const res = await axios.get("/api/songs");
  //     setSongs(res.data);
  //   } catch (error) {
  //     console.error("error fetching songs:", error);
  //   }
  // };

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/images/lutos_logo_przez.png"
          alt="Lutos Logo"
          width={180}
          height={180}
        />
        <p>music management tool of new generation</p>
      </div>

      <SongsForm
        open={openModal}
        close={() => {
          setOpenModal(false);
        }}
      />

      <div className={styles.grid}>
        <button
          onClick={() => {
            setOpenModal(true);
          }}
          className={styles.card}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          <h2>Add</h2>
          <p>Add new compositions to your project</p>
        </button>

        <Link href="/schedule" className={styles.card}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            />
          </svg>

          <h2>Schedule</h2>
          <p>Create your rehearsal schedule</p>
        </Link>
      </div>
      {songs.map((s, index) => {
        console.log(s);
        return (
          <Composition
            key={index}
            title={s.title}
            composer={s.composer}
            musicians={s.musicians}
          />
        );
      })}
    </main>
  );
}
