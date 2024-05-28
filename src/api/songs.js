import { openDb } from "../../utils/db";

export default async function songsHandler(req, res) {
  const db = await openDb();

  if (req.method === "POST") {
    const { title, composer, musicians } = req.body;

    const result = await db.run(
      "INSERT INTO Songs (title, composer) VALUES (?, ?)",
      [title, composer]
    );
    const songId = result.lastID;

    for (const performer of performers) {
      const performerResult = await db.run(
        "INSERT INTO Performers (name) VALUES (?) ON CONFLICT(name) DO NOTHING",
        [performer]
      );
      const performerId =
        performerResult.lastID ||
        (await db.get("SELECT id FROM Performers WHERE name = ?", [performer]))
          .id;
      await db.run(
        "INSERT INTO Song_Performers (song_id, performer_id) VALUES (?, ?)",
        [songId, performerId]
      );
    }

    res.status(201).json({ message: "added successfully" });
  } else if (req.method === "GET") {
    const songs = await db.all("select * from songs");
    res.json(songs);
  } else {
    res.status(405).json({ message: "Method not allowed, use POST or GET" });
  }
}
