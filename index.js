import * as pg from "pg";
import "dotenv/config"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { Datastore } from "@google-cloud/datastore";

export function helloWorld(req, res) {
  // Creates a client
  //   let message = req.query.message || req.body.message || "Hello World!";
  // let data = await getComments();

  saveMessage().then(() => {
    // getComments().then((data) => res.status(200).send(data.rows));
    res.status(200).send("test");
  });

  // res.status(200).send(data.rows);
}

async function getComments() {
  const pool = new pg.Pool({
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASS,
    port: DB_PORT,
    host: DB_HOST,
  });

  const data = await pool.query(
    "select * from comments c order by id desc limit 1000;"
  );
  //   console.info(res.rows);
  return data;
}

async function saveMessage() {
  const datastore = new Datastore();
  const kind = "MessageRecord";

  // The name/ID for the new entity
  const name = "sampletask1";

  // The Cloud Datastore key for the new entity
  const msgKey = datastore.key([kind, null]);
  // const taskKey = datastore.key;

  // Prepares the new entity
  const msgRec = {
    key: msgKey,
    data: {
      EventTyme: Date.now(),
      From: "Andrii NodeJS",
      Message: "test message",
    },
  };

  await datastore.save(msgRec);
  console.log(`Saved ${msgRec.key.name}: ${msgRec.EventTyme}`);
}

// getComments().then((data) => console.log(data.rows));
