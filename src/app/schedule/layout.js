"use client";

import MenuApp from "../components/Menu.js";

export default function schuduleLayout({ children }) {
  return (
    <>
      <menu>
        <MenuApp />
      </menu>
      <div>{children}</div>
    </>
  );
}
