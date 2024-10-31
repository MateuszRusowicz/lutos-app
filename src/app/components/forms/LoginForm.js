import styles from "./LoginForm.module.css";
import { Form, Input, Button } from "antd";

export default function LoginForm({ fields, handleSubmit }) {
  return (
    <Form
      className={styles.formGroup}
      onFinish={handleSubmit}
      layout="vertical"
    >
      <h2 className={styles.title}>{fields.title}</h2>
      {fields.inputFields.map((e) => {
        return (
          <Form.Item key={e} name={e.split(" ")[0]} label={e}>
            <Input style={{ width: "100%" }} />
          </Form.Item>
        );
      })}
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.submitButton}
        >
          submit
        </Button>
      </div>
    </Form>
  );
}
