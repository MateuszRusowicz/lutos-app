import Composition from "../components/composition";
import { useSongsState } from "../context-hook/useSongsState";

export default function Schedule() {
  const { songs } = useSongsState();

  return (
    <>
      <h1>schedule</h1>
      <main>
        <div>
          <h2>selected works</h2>
          <ul>
            <li>
              <Composition />
            </li>
          </ul>
        </div>
        <div>
          <h2>available works</h2>
          <ul>
            {songs.map((s) => {
              <li>
                <Composition
                  key={s.id}
                  title={s.title}
                  composer={s.composer}
                  musicians={s.musicians}
                />
                ;
              </li>;
            })}
          </ul>
        </div>
      </main>
      <aside>
        <h2>fitting works</h2>
        <ul>
          <Composition />
        </ul>
      </aside>
    </>
  );
}
