"use client";
import Composition from "../components/composition";
import { useSongsState } from "../context-hook/useSongsState.js";
import { useState } from "react";

export default function Schedule() {
  const { songs } = useSongsState();
  const [pickedSongs, setPickedSongs] = useState([]);

  const handleAdd = function (id) {
    setPickedSongs((prev) => [...prev, id]);
  };

  const handleRemove = function (id) {
    setPickedSongs((prev) => prev.filter((songId) => songId !== id));
  };

  return (
    <>
      <h1>schedule</h1>
      <main>
        <div>
          <h2>selected works</h2>
          <ul>
            {songs.map((s) => {
              if (pickedSongs.includes(s.id)) {
                return (
                  <li key={s.id}>
                    <button onClick={() => handleRemove(s.id)}>
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
        <div>
          <h2>available works</h2>
          <ul>
            {songs.map((s) => {
              if (!pickedSongs.includes(s.id)) {
                return (
                  <li key={s.id}>
                    <button onClick={() => handleAdd(s.id)}>
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
      <aside>
        <h2>fitting works</h2>
        <ul>
          <li></li>
        </ul>
      </aside>
    </>
  );
}
