import styles from "./CompositionForm.module.css";
import { useSongsState } from "../../context-hook/useSongsState";
import { Form, Input, Select, Button } from "antd";

export default function TestForm({ handleSubmit, formContent, stateUpdate }) {
  const { musicians } = useSongsState();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const state = {
    composer: "",
    title: "",
    musiciansId: [],
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <h2 className={styles.title}>Insert new add here title</h2>

      {Object.keys(state).map((k) => {
        return k !== "musiciansId" ? (
          <Form.Item key={k} label={k} name={k}>
            <Input style={{ width: "100%" }} />
          </Form.Item>
        ) : (
          <Form.Item key={k} label={k} name={k}>
            <Select
              showSearch
              style={{ width: "100%" }}
              mode="multiple"
              optionFilterProp="label"
              options={musicians.map((m) => ({
                value: m.id,
                label: m.fullName,
              }))}
            />
          </Form.Item>
        );
      })}
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}

//             <Select
//               style={{ width: "100%" }}
//               showSearch
//               mode="multiple"
//               optionFilterProp="label"
//               options={musicians.map((m) => ({
//                 value: m.id,
//                 label: m.fullName,
//               }))}
//             />
{
  /* <label htmlFor={k}>musicians</label>
                <select
                  name="musiciansID[]"
                  id={k}
                  // value={state[k]}
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
                > */
}
{
  /* {musicians.map((el) => (
                    <option key={el.fullName} value={el.id}>
                      {el.fullName}
                    </option>
                  ))}
                </select> */
}
//               </li>
//             );
//           } else {
//             return (
//               <li key={k}>
//                 <label htmlFor={k}>{k}</label>
//                 <input
//                   value={state[k]}
//                   onChange={(e) =>
//                     stateUpdate({ ...state, [k]: e.target.value })
//                   }
//                   type="text"
//                   id={k}
//                   name={k}
//                   required
//                 />
//               </li>
//             );
//           }
//         })}
//       </ul>
//       <div className={styles.buttonGroup}>
//         <button type="submit" className={styles.submitButton}>
//           Submit
//         </button>
//       </div>
//     </form>
//   );
