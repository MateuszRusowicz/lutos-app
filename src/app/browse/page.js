import Composition from "./composition";

let songs = [
  { title: "kwartet", composer: "Mozart", musicians: ["Adamina", "Mateusz"] },
  { title: "kwartet", composer: "Mozart", musicians: ["Adamina", "Mateusz"] },
  { title: "kwartet", composer: "Mozart", musicians: ["Adamina", "Mateusz"] },
];

export default function Browse() {
  return (
    <>
      <h1>browse</h1>
      <main>
        <h2>Compositions' List</h2>
        <ul>
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
      <button>add a new composition</button>
    </>
  );
}
