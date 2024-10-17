import styles from "./CompositionForm.module.css";
import { useSongsState } from "../../context-hook/useSongsState";

export default function CompositionForm({
  handleSubmit,
  formContent,
  state,
  stateUpdate,
}) {
  const { musicians } = useSongsState();

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={styles.title}>Insert new {formContent}</h2>
      <ul className={styles.formGroup}>
        {Object.keys(state).map((k) => {
          if (k === "musiciansId") {
            return (
              <li key={k}>
                <label htmlFor={k}>musicians</label>
                <select
                  name={k}
                  id={k}
                  value={state[k]}
                  multiple
                  onChange={(e) =>
                    stateUpdate({
                      ...state,
                      [k]: Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      ),
                    })
                  }
                >
                  {musicians.map((el) => (
                    <option key={el.fullName} value={el.fullName}>
                      {el.fullName}
                    </option>
                  ))}
                </select>
              </li>
            );
          } else {
            return (
              <li key={k}>
                <label htmlFor={k}>{k}</label>
                <input
                  value={state[k]}
                  onChange={(e) =>
                    stateUpdate({ ...state, [k]: e.target.value })
                  }
                  type="text"
                  id={k}
                  name={k}
                  required
                />
              </li>
            );
          }
        })}
      </ul>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
}
