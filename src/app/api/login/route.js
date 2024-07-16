import { openDb } from "../../utils/db.js";
import { NextResponse } from "next/server.js";

export async function POST(req) {
  const db = await openDb();
  const { email, password } = await req.json();

  const user = await db.get("select * from users where email=?", [email]);
  const userId = user.id;

  if (!user) {
    return NextResponse.json({ error: "user not found", status: 404 });
  }
  if (user.password !== password) {
    return NextResponse.json({ error: "incorrect password", status: 401 });
  } else {
    return NextResponse.json({
      message: "user credentials correct",
      status: 200,
      id: userId,
    });
  }
}
