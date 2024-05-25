"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import axios from "axios";

let songs = {};

export default function Home() {
  const [composer, setComposer] = useState();
  const [title, setTitle] = useState();
  const [musicians, setMusicians] = useState();

  const handleSubmit = function (e) {
    e.preventDefault();
    const musiciansArr = musicians
      .toLowerCase()
      .trim()
      .split(",")
      .filter((m) => m !== "");
    let element = { title, composer, musiciansArr };
    console.log(element);
    // songs.push(element);
  };

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

      <form onSubmit={handleSubmit}>
        <h2>Insert new composition</h2>
        <ul>
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
        <p>
          <button>Reset</button>
          <button>Submit</button>
        </p>
      </form>

      <div className={styles.grid}>
        <a href="#" className={styles.card}>
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
        </a>

        <a href="#" className={styles.card}>
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
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <h2>Browse</h2>
          <p>Browse your compositions' list</p>
        </a>

        <a href="#" className={styles.card}>
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
        </a>
      </div>
    </main>
  );
}