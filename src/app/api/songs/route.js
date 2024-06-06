import { openDb } from "../../utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const db = await openDb();
  const { title, composer, musicians } = await req.json();

  const result = await db.run(
    "INSERT INTO compositions (title, composer) VALUES (?, ?)",
    [title, composer]
  );
  const compositionId = result.lastID;

  for (const musician of musicians) {
    const musiciansResult = await db.run(
      "INSERT INTO musicians (name) VALUES (?) ON CONFLICT(name) DO NOTHING",
      [musician]
    );
    const musicianId =
      musiciansResult.lastID ||
      (await db.get("SELECT id FROM musicians WHERE name = ?", [musician])).id;
    await db.run(
      "INSERT INTO compositions_musicians (composition_id, musician_id) VALUES (?, ?)",
      [compositionId, musicianId]
    );
  }

  return NextResponse.json({ message: "added successfully" }, { status: 201 });
}

export async function GET() {
  const db = await openDb();
  const songs = await db.all(
    "select title, composer, group_concat(musicians.name, ', ') as musicians from compositions join compositions_musicians on compositions.id=compositions_musicians.composition_id join musicians on compositions_musicians.musician_id=musicians.id group by compositions.id;"
  );

  return NextResponse.json(songs);
}
