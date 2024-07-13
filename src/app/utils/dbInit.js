import { openDb } from "./db.js";

const dbSetup = async function () {
  const db = await openDb();
  await db.exec(`
  create table if not exists compositions(
    id integer primary key,
    composer varchar(100) not null,
    title varchar(100) not null
    user_id integer,
    foreign key (user_id) references users(id)
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
  );
  create table if not exist users(
  id primary key integer,
  email varchar(50) not null,
  password varchar(50) not null,
  question varchar (150),)`);
  console.log("performed successfully");
};

dbSetup();
