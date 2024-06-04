import styles from "./composition.module.css";

export default function Composition({ title, composer, musicians }) {
  return (
    <>
      <div className={styles.card}>
        <button className={styles.btn}>X</button>
        <h4>{composer}</h4>
        <h3>{title}</h3>
        <p>{...musicians}</p>
      </div>
    </>
  );
}
