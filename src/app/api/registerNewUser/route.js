import { openDb } from "../../utils/db.js";
import { NextResponse } from "next/server.js";

export async function POST(req) {
  const db = await openDb();
  const { email, password, question } = await req.json();

  const userExisting = await db.get("select * from users where email =?", [
    email,
  ]);

  if (userExisting) {
    return NextResponse.json({
      error: "user already registered in database",
      status: 407,
    });
  } else {
    await db.run(
      "insert into users (email, password,question) values (?,?,?)",
      [email, password, question]
    );
    const user = await db.get("select * from users where email=?", [email]);
    const userId = user.id;

    return NextResponse.json({
      message: "new user registered successfully",
      status: 200,
      id: userId,
    });
  }
}
