import styles from "./CompositionForm.module.css";
import { useSongsState } from "../../context-hook/useSongsState";
import { Form, Input, Select, Button } from "antd";

export default function TestForm({
  handleSubmit,
  formContent,
  stateUpdate,
  state,
}) {
  const { musicians } = useSongsState();

  const formatted = (input) => {
    const words = input.toLowerCase().split(" ");
    if (words.length === 1) {
      return words;
    } else {
      return words[0] + words[1].charAt(0).toUpperCase() + words[1].slice(1);
    }
  };

  return (
    <Form
      onFinish={(values) => {
        handleSubmit(values);
      }}
      layout="vertical"
      className={styles.formGroup}
    >
      <h2 className={styles.title}>Insert new {formContent.name}</h2>

      {formContent.fields.map((k) => {
        return k !== "musicians" ? (
          <Form.Item
            key={k}
            label={k}
            name={formatted(k)}
            className={styles.formGroup}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
        ) : (
          <Form.Item
            key={k}
            label={k}
            name="musiciansId"
            className={styles.formGroup}
          >
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

      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.submitButton}
        >
          Submit
        </Button>
        <Button className={styles.closeButton}>Cancel</Button>
      </div>
    </Form>
  );
}
