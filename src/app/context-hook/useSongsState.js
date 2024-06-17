"use client";

import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const SongsContext = createContext();

export const useSongsState = () => {
  return useContext(SongsContext);
};

export const SongsContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);

  const fetchSongs = async function () {
    try {
      const res = await axios.get("../api/songs");
      setSongs(res.data);
    } catch (error) {
      console.error("error fetching songs:", error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [setSongs]);

  return (
    <SongsContext.Provider value={{ songs, setSongs, fetchSongs }}>
      {children}
    </SongsContext.Provider>
  );
};
