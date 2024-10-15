import styles from "./CompositionForm.module.css";

export default function CompositionForm({
  handleSubmit,
  formContent,
  state,
  stateUpdate,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className={styles.title}>Insert new {formContent}</h2>
      <ul className={styles.formGroup}>
        {Object.keys(state).map((k) => (
          <li key={k}>
            <label htmlFor={k}>{k}</label>
            <input
              value={state[k]}
              onChange={(e) => stateUpdate({ ...state, [k]: e.target.value })}
              type="text"
              id={k}
              name={k}
              required
            />
          </li>
        ))}
      </ul>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
}
