import { openDb } from "../../../utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const db = await openDb();
  const { title, composer, musicians } = await req.json();

  const result = await db.run(
    "INSERT INTO Songs (title, composer) VALUES (?, ?)",
    [title, composer]
  );
  const songId = result.lastID;

  for (const musician of musicians) {
    const musicianResult = await db.run(
      "INSERT INTO Performers (name) VALUES (?) ON CONFLICT(name) DO NOTHING",
      [musician]
    );
    const musicianId =
      musicianResult.lastID ||
      (await db.get("SELECT id FROM Performers WHERE name = ?", [musician])).id;
    await db.run(
      "INSERT INTO Song_Performers (song_id, performer_id) VALUES (?, ?)",
      [songId, musicianId]
    );
  }

  return NextResponse.json({ message: "added successfully" }, { status: 201 });
}

export async function GET() {
  const db = await openDb();
  const songs = await db.all("SELECT * FROM Songs");
  return NextResponse.json(songs);
}
