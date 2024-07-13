"use client";

import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const SongsContext = createContext();

export const useSongsState = () => {
  return useContext(SongsContext);
};

export const SongsContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]); // w zasadzie to nigdzie nie używam setSongs bo idą bezpośrednio z DB i używam fetch songs, ale chyba potrzebuję to use State, co?
  const [authState, setAuthState] = useState("unathenticated"); // loading, authenticated, id!!!
  const fetchSongs = async function () {
    try {
      const res = await axios.get("/api/songs");
      setSongs(res.data);
    } catch (error) {
      console.error("error fetching songs:", error); //---------------------DODAJ ERROR HANDLING
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [setSongs]);

  return (
    <SongsContext.Provider value={{ songs, setSongs, fetchSongs, authState }}>
      {children}
    </SongsContext.Provider>
  );
};
