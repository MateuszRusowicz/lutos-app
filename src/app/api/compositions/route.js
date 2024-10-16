import { openDb } from "../../utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const db = await openDb();
  const { title, composer, musiciansId, userId } = await req.json();

  const result = await db.run(
    "INSERT INTO compositions (title, composer, user_id) VALUES (?, ?,?)",
    [title, composer, userId]
  );
  const compositionId = result.lastID;
  for (const id of musiciansId) {
    await db.run(
      "INSERT INTO compositions_musicians (composition_id, musician_id) VALUES (?, ?)",
      [compositionId, id]
    );
  }

  return NextResponse.json(
    { message: "db added successfully" },
    { status: 201 }
  );
}

export async function GET(req) {
  const db = await openDb();
  const userId = 1; //tutaj coś jest źle, powinno być req.query.userId ale to też nie działa...
  const songs = await db.all(
    "select compositions.id as id, title, composer, compositions.user_id, group_concat(musicians.first_name || ' ' ||musicians.last_name, ', ') as musicians from compositions join compositions_musicians on compositions.id=compositions_musicians.composition_id join musicians on compositions_musicians.musician_id=musicians.id where compositions.user_id = ? group by compositions.id;",
    [userId]
  );

  return NextResponse.json(songs);
}

export async function DELETE(req) {
  const db = await openDb();
  const { id } = await req.json();

  await db.run("delete from compositions where id = ?", [id]);
  await db.run("delete from compositions_musicians where composition_id = ?", [
    id,
  ]);

  return NextResponse.json(
    { message: "db delete successful" },
    { status: 200 }
  );
}
