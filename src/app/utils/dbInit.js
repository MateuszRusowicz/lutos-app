import { openDb } from "./db.js";

const dbSetup = async function () {
  const db = await openDb();
  await db.exec(`
  create table if not exists compositions(
    id integer primary key,
    composer varchar(100) not null,
    title varchar(100) not null
  );
  create table if not exists musicians(
    id integer primary key,
    name varchar(100) unique not null
  );
  create table if not exists compositions_musicians(
    composition_id integer,
    musician_id integer,
    foreign key (composition_id) references compositions(id),
    foreign key (musician_id) references musicians(id)
  );`);
  console.log("performed successfully");
};

dbSetup();
