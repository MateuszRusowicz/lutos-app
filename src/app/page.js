"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useRef, useEffect } from "react";
import { useSongsState } from "./context-hook/useSongsState";
import SongsForm from "./components/songsForm";
import Link from "next/link";
import Composition from "./components/composition";
import axios from "axios";
import { ScheduleIcon, PlusIcon } from "../../public/images/svgs";
import LoginComponent from "./components/LoginComponent";
import { UserOutlined } from "@ant-design/icons";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const { songs, fetchSongs, authState, setAuthState } = useSongsState();
  const asideScrollRef = useRef(null);

  // Fetch songs when authState changes to "authenticated"
  useEffect(() => {
    if (authState[0] === "authenticated") {
      fetchSongs();
    }
  }, [authState, fetchSongs]);

  // -------------------------HANDLING DELETE SONG FROM DB / LOGOUT USER ----------------------------
  const handleDeleteSong = async function (id) {
    const isConfirmed = confirm(
      "This will delete the song from database. Are you sure you want to continue?"
    );
    if (!isConfirmed) {
      return;
    }

    try {
      const deletedSong = await axios.delete("/api/songs", { data: { id } });
      if (deletedSong.status === 200) fetchSongs();
      return console.log("deleted", deletedSong.data); //-------------------DODAJ ERROR HANDLING PRZY USUWANIU PIOSENKI
    } catch (err) {
      console.error("error deleting song:", err);
    }
  };

  const handleLogOut = function () {
    const isConfirmed = confirm(
      "This will log you out. Are you sure you want to continue?"
    );
    if (!isConfirmed) {
      return;
    }
    setAuthState(["unauthenticated", 0]);
  };

  // ----------------------- SCROLLING COMPOSITIONS LIST INTO VIEW WHEN ADDING NEW COMPOSITON-------------------------
  useEffect(() => {
    if (openModal && asideScrollRef.current) {
      asideScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [openModal]);

  // ------------------------Rendering frontend based on authentification status --------------------------------------
  if (authState[0] === "unauthenticated") {
    return <LoginComponent />;
  } else if (authState[0] === "authenticated") {
    return (
      <>
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

          {/* --------------- Modal Form to Add songs, originally hidden  -------------------*/}
          <SongsForm
            open={openModal}
            close={() => {
              setOpenModal(false);
            }}
          />
          {/* ---------------------- Buttons ----------------------------------------------- */}
          <div className={styles.grid}>
            <button
              onClick={() => {
                setOpenModal(true);
              }}
              className={styles.card}
            >
              <PlusIcon />
              <h2>Add</h2>
              <p>Add new compositions to your project</p>
            </button>

            <Link href="/schedule" className={styles.card}>
              <ScheduleIcon />
              <h2>Schedule</h2>
              <p>Create your rehearsal schedule</p>
            </Link>
          </div>
        </main>
        {/* -------------------  COMPOSITIONS LIST FROM DB --------------------------------- */}
        <aside className={styles.aside} ref={asideScrollRef}>
          <h2 className={styles.compositionTitle}>
            {songs.length !== 0 && "Compositions in Database"}
          </h2>
          <div className={styles.songsGrid}>
            {songs &&
              songs.map((s) => {
                return (
                  <div key={s.id} className={styles.compositionDiv}>
                    <Composition
                      onSelect={() => handleDeleteSong(s.id)}
                      title={s.title}
                      composer={s.composer}
                      musicians={s.musicians}
                    />
                  </div>
                );
              })}
          </div>
        </aside>
        <div className={styles.logoutButtonContainer}>
          <button onClick={handleLogOut} className={styles.card}>
            <UserOutlined className={styles.icon} />
            <p>log out</p>
          </button>
        </div>
      </>
    );
  }
}
