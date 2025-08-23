import { openDb } from "../../../utils/db";
import { NextResponse } from "next/server";

export async function DELETE(req,{params}) {
  const db = await openDb();
  const id=params.id

  await db.run("delete from compositions where id = ?", [id]);
  await db.run("delete from compositions_musicians where composition_id = ?", [
    id,
  ]);

  return NextResponse.json(
    { message: "db delete successful" },
    { status: 200 }
  );
}