import Modal from "react-modal";
import { useState } from "react";
import styles from "./LoginComponent.module.css";
import axios from "axios";
import { useSongsState } from "../context-hook/useSongsState";
import { ErrorIcon, SpinnerIcon } from "../../../public/images/svgs";
import Image from "next/image";
import LoginForm from "./forms/LoginForm";

export default function LoginComponent() {
  const [openModal, setOpenModal] = useState(false);
  const { setAuthState } = useSongsState();
  const [status, setStatus] = useState();

  const loginFields = { title: "Log In", inputFields: ["email", "password"] };
  const registerFields = {
    title: "Register",
    inputFields: [
      "email",
      "password",
      "re-enter password",
      "auxiliary question",
    ],
  };

  // LOGIN FUNCTION
  const handleLogIn = async function (values) {
    setStatus("loading");

    try {
      const response = await axios.post("/api/login", {
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        const id = response.data.id;
        setAuthState(["authenticated", id]);
      } else {
        throw new Error("incorrect data");
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
      console.error(err);
    }
  };

  // REGISTERING NEW USER FUNCTION
  const handleNewUser = async function (values) {
    if (values.password !== values.re - entered) {
      return alert("New Password must match re-entered New Password!");
    } else {
      setStatus("loading");
      try {
        const response = await axios.post("/api/registerNewUser", {
          email: values.email,
          password: values.password,
          question: values.auxiliary,
        });
        if (response.status === 200) {
          const id = response.data.id;
          console.log("successfully added new user to database", response);
          setAuthState(["authenticated", id]);
          setOpenModal(false);
        } else {
          throw new Error("Error registiring new user");
        }
      } catch (err) {
        setStatus("error");
        console.error(err);
      }
    }
  };

  // ----------------------RENDERING COMPONENT----------------------------
  if (status === "loading") {
    return (
      <div className={styles.container}>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/images/lutos_logo_przez.png"
            alt="Lutos Logo"
            width={180}
            height={180}
          />
          <SpinnerIcon /> <h3>loading...</h3>
        </div>
      </div>
    );
  } else if (status === "error") {
    return (
      <div className={styles.container}>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/images/lutos_logo_przez.png"
            alt="Lutos Logo"
            width={180}
            height={180}
          />
          <ErrorIcon />
          <h3>Error logging user</h3>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/images/lutos_logo_przez.png"
            alt="Lutos Logo"
            width={180}
            height={180}
          />
          <p>music management tool of new generation</p>
        </div>
        <LoginForm fields={loginFields} handleSubmit={handleLogIn} />

        {/* -------------------------CREATING NEW ACCOUNT---------------------- */}
        <div className={styles.buttonGroup}>
          <button
            className={styles.buttonNewAccount}
            onClick={() => setOpenModal(true)}
          >
            Create new account
          </button>
        </div>
        <Modal
          isOpen={openModal}
          onRequestClose={() => {
            setOpenModal(false);
          }}
          contentLabel="New User"
          appElement={document.getElementById("root")}
          overlayClassName={styles.modalOverlay}
          className={styles.modalContent}
        >
          <LoginForm fields={registerFields} handleSubmit={handleNewUser} />
        </Modal>
      </div>
    );
  }
}
