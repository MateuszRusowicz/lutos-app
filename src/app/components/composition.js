import styles from "./composition.module.css";

export default function Composition({ title, composer, musicians, onSelect }) {
  return (
    <>
      <button className={styles.card} onClick={onSelect}>
        <h4>{composer}</h4>
        <h3>{title}</h3>
        <p>{musicians}</p>
      </button>
    </>
  );
}
