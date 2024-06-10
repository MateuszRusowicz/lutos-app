import { useState, createContext, useContext, useEffect } from "react";

const SongsContext = createContext();

export const useSongsState = () => {
  useContext(SongsContext);
};

export const SongsContextProvider = ({ children }) => {
  const [songs, setSongs] = useState();

  const updateSongs = useEffect(() => {
    const fetchSongs = async function () {
      try {
        const res = await axios.get("/api/songs");
        setSongs(res.data);
      } catch (error) {
        console.error("error fetching songs:", error);
      }
    };

    fetchSongs();
  }, [setSongs]);

  return (
    <SongsContext.Provider value={{ songs, setSongs, updateSongs }}>
      {children}
    </SongsContext.Provider>
  );
};
