import { openDb } from "../../utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const db = await openDb();
  const { firstName, lastName, instrument, userId } = await req.json();

  const result = await db.run(
    "INSERT INTO musicians (first_name,last_name,instrument, user_id) VALUES (?,?, ?,?)",
    [firstName, lastName, instrument, userId]
  );

  return NextResponse.json(
    { message: "db added successfully" },
    { status: 201 }
  );
}

export async function GET(req) {
  const db = await openDb();
  const userId = 1; //tutaj coś jest źle, powinno być req.query.userId ale to też nie działa...
  const musicians = await db.all("select * from musicians where user_id = ?", [
    userId,
  ]);

  return NextResponse.json(musicians);
}

export async function DELETE(req) {
  const db = await openDb();
  const { id } = await req.json();

  await db.run("delete from musicians where id = ?", [id]);
  await db.run("delete from compositions_musicians where musician_id = ?", [
    id,
  ]);

  return NextResponse.json(
    { message: "db delete successful" },
    { status: 200 }
  );
}
