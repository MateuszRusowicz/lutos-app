"use client";
import { SongsContextProvider } from "../context-hook/useSongsState.js";
import MenuApp from "../components/Menu.js";

export default function scheduleLayout({ children }) {
  return (
    <>
      <menu>
        <MenuApp />
      </menu>
      <SongsContextProvider>
        <div>{children}</div>
      </SongsContextProvider>
    </>
  );
}
