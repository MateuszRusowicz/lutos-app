import { openDb } from "./db.js";

const dbSetup = async function () {
  const db = await openDb();
  await db.exec(`
  create table if not exists compositions(
    id integer primary key,
    composer varchar(100) not null,
    title varchar(100) not null,
    user_id integer not null,
    foreign key (user_id) references users(id)
  );
  create table if not exists musicians(
    id integer primary key,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    instrument varchar(100),
    user_id integer not null,
    foreign key (user_id) references users(id),
    unique(first_name,last_name)
  );
  create table if not exists compositions_musicians(
    composition_id integer,
    musician_id integer,
    foreign key (composition_id) references compositions(id),
    foreign key (musician_id) references musicians(id)
  );
  create table if not exists users(
  id integer primary key,
  email varchar(50) not null,
  password varchar(50) not null,
  question varchar (150))`);
  console.log("performed successfully");
};

dbSetup();
