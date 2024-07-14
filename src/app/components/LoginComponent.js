"use client";

import Modal from "react-modal";
import { useState } from "react";
import styles from "./LoginComponent.module.css";

export default function LoginComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reenteredNewPassword, setReenteredNewPassword] = useState("");

  const handleLogIn = function () {
    // sprawdza dane z db
    //zmienia w kontekście zalogowanie wraz z id!
  };
  const handleNewUser = function () {
    if (newPassword !== reenteredNewPassword) {
      return alert("New Password must match re-entered New Password!");
    }
    // publikuje w db i zwraca informacje o sukcesie lub braku (error handling) wraca do ekranu login
  };

  return (
    <>
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
              valu={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
            />
          </li>
          <li>
            <button type="submit" className={styles.submitButton}>
              Enter
            </button>
          </li>
        </ul>
      </form>
      {/* -------------------------CREATING NEW ACCOUNT---------------------- */}
      <button onClick={() => setOpenModal(true)}>Create new account</button>
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
              <button type="submit" className={styles.submitButton}>
                Enter
              </button>
            </li>
          </ul>
        </form>
      </Modal>
    </>
  );
}
