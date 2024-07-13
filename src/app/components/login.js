import Modal from "react-modal";
import { useState } from "react";

export default function LoginComponent() {
  const [openModal, setOpenModal] = useState(false);

  const handleLogIn = function () {
    // sprawdza dane z db
    //zmienia w kontekście zalogowanie wraz z id!
  };
  const handleNewUser = function () {
    // publikuje w db i zwraca informacje o sukcesie lub braku (error handling) wraca do ekranu login
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleLogIn}>
        <ul>
          <li>
            <label htmlFor="email">User Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="me@gmail.com"
              required
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </li>
          <button type="submit">Enter</button>
        </ul>
      </form>
      {/* -------------------------CREATING NEW ACCOUNT---------------------- */}
      <button onCLick={() => setOpenModal(true)}>Create new account</button>
    </>
  );
}
