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
              // NEED TO BE REBUILT: MAP OF SEARCHABLE BUTTONS THAT ADD ID TO ARRAY UPON BEING CLICKED
              <li key={k}>
                <label htmlFor={k}>musicians</label>
                <select
                  name="musiciansID[]"
                  id={k}
                  multiple
                  onChange={(e) =>
                    stateUpdate({
                      ...state,
                      musiciansId: Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      ),
                    })
                  }
                >
                  {musicians.map((el) => (
                    <option key={el.fullName} value={el.id}>
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
