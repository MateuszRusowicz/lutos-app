import { openDb } from "../../utils/db.js";
import { NextResponse } from "next/server.js";

export async function POST(req) {
  const db = await openDb();
  const { email, password, question } = await req.json();

  const userExisting = await db.run("select * from users where email =?", [
    email,
  ]);

  if (userExisting) {
    return NextResponse.json({
      error: "user already registered in database",
      status: 407,
    });
  } else {
    const result = await db.run(
      "insert into users (email, password,question) values (?,?,?)",
      [email, password, question]
    );
    const userId = result.lastID;

    return NextResponse.json({
      message: "new user registered successfully",
      status: 200,
      id: userId,
    });
  }
}

export async function GET(req) {
  const db = await openDb();
  const { email, password } = await req.json();

  const user = await db.get("select * from users where email=?", [email]);
  if (!user) {
    return NextResponse.json({ error: "user not found", status: 404 });
  }
  if (user.password !== password) {
    return NextResponse.json({ error: "incorrect password", status: 401 });
  } else {
    return NextResponse.json({
      message: "user credentials correct",
      status: 200,
    });
  }
}
