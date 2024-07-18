import Modal from "react-modal";
import { useState } from "react";
import styles from "./LoginComponent.module.css";
import axios from "axios";
import { useSongsState } from "../context-hook/useSongsState";
import { ErrorIcon, SpinnerIcon } from "../../../public/images/svgs";
import Image from "next/image";

export default function LoginComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reenteredNewPassword, setReenteredNewPassword] = useState("");
  const [question, setQuestion] = useState("");
  const { setAuthState } = useSongsState();
  const [status, setStatus] = useState();

  // LOGIN FUNCTION
  const handleLogIn = async function (e) {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await axios.post("/api/login", { email, password });
      if (response.status === 200) {
        const id = response.data.id;
        setAuthState(["authenticated", id]);
        setEmail("");
        setPassword("");
      } else {
        throw new Error("error fetching data", response);
      }
    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  };

  // ADDING NEW USER FUNCTION
  const handleNewUser = async function (e) {
    e.preventDefault();
    if (newPassword !== reenteredNewPassword) {
      return alert("New Password must match re-entered New Password!");
    } else {
      setStatus("loading");
      try {
        const response = await axios.post("/api/registerNewUser", {
          email: newEmail,
          password: newPassword,
          question,
        });
        if (response.status === 200) {
          const id = response.data.id;
          console.log("successfully added new user to database", response);
          setAuthState(["authenticated", id]);
          setNewEmail("");
          setNewPassword("");
          setReenteredNewPassword("");
          setQuestion("");
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

  // RENDERING COMPONENT
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
        <h1 className={styles.title}>Log In</h1>
        <form onSubmit={handleLogIn}>
          <ul className={styles.formGroup}>
            <li>
              <label htmlFor="email">User Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="me@gmail.com"
                required
              />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                required
              />
            </li>
            <li className={styles.buttonGroup}>
              <button type="submit" className={styles.submitButton}>
                Enter
              </button>
            </li>
          </ul>
        </form>
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
          <h2 className={styles.title}>Create New Account</h2>
          <form onSubmit={handleNewUser}>
            <ul className={styles.formGroup}>
              <li>
                <label htmlFor="email">enter your email</label>
                <input
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </li>
              <li>
                <label htmlFor="newPassword">Password</label>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  required
                />
              </li>
              <li>
                <label htmlFor="reenteredNewPassword">
                  Re-enter your password
                </label>
                <input
                  value={reenteredNewPassword}
                  onChange={(e) => setReenteredNewPassword(e.target.value)}
                  type="password"
                  id="reenteredNewPassword"
                  name="reenteredNewPassword"
                  required
                />
              </li>
              <li>
                <label htmlFor="question">
                  Question to help remind the password
                </label>
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  type="text"
                  id="question"
                  name="question"
                />
              </li>
              <li className={styles.buttonGroup}>
                <button type="submit" className={styles.submitButton}>
                  Submit
                </button>
              </li>
            </ul>
          </form>
        </Modal>
      </div>
    );
  }
}
