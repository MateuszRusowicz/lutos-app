import { openDb } from "./db.js";

const resetDb = async function () {
  const db = await openDb();
  await db.exec(`drop table compositions;
  drop table musicians;
  drop table compositions_musicians
  drop table users`);
  console.log("restting successfully");
};

resetDb();
