import Composition from "../components/composition";

export default function Schedule() {
  return (
    <>
      <h1>schedule</h1>
      <main>
        <h2>selected works</h2>
        <ul>
          <Composition />
        </ul>
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
