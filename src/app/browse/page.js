import Composition from "./composition";
import styles from "./browse.module.css";

let songs = [
  { title: "kwartet", composer: "Mozart", musicians: ["Adamina", "Mateusz"] },
  { title: "kwartet", composer: "Mozart", musicians: ["Adamina", "Mateusz"] },
  { title: "kwartet", composer: "Mozart", musicians: ["Adamina", "Mateusz"] },
];

export default function Browse() {
  return (
    <>
      <h1 className={styles.mainH1}>Browse</h1>
      <main className={styles.container}>
        <h2>Compositions' List</h2>
        <ul className={styles.grid}>
          {songs.map((s, i) => {
            return (
              <li key={i}>
                <Composition
                  title={s.title}
                  composer={s.composer}
                  musicians={s.musicians}
                />
              </li>
            );
          })}
        </ul>
      </main>
      <aside>
        <button className={styles.buttonAdd}>add a new composition</button>
      </aside>
    </>
  );
}
