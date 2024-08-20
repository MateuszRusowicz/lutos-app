"use client";

import {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const SongsContext = createContext();

export const useSongsState = () => {
  return useContext(SongsContext);
};

export const SongsContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]); // w zasadzie to nigdzie nie używam setSongs bo idą bezpośrednio z DB i używam fetch songs, ale chyba potrzebuję to use State, co?
  const [authState, setAuthState] = useState(["authenticated", 1]); //zawsze zalogowany użytkownik tylko do testów, normalnie powinno być "unanthenticated"

  const fetchSongs = useCallback(async function () {
    try {
      const res = await axios.get("/api/songs", { params: { userId: 1 } });
      setSongs(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  // DO TESTÓW INNA FUNKCJA
  // const fetchSongs = useCallback(
  //   async function () {
  //     const loggedUserId = authState[1];
  //     try {
  //       const res = await axios.get("/api/songs", {
  //         params: { userId: loggedUserId },
  //       });
  //       setSongs(res.data);
  //     } catch (error) {
  //       console.error("error fetching songs:", error); //---------------------DODAJ ERROR HANDLING
  //     }
  //   },
  //   [authState]
  // );

  // useEffect(() => {
  //   if (authState === "authenticated") fetchSongs();
  // }, [authState, fetchSongs]);

  return (
    <SongsContext.Provider
      value={{ songs, setSongs, fetchSongs, authState, setAuthState }}
    >
      {children}
    </SongsContext.Provider>
  );
};
