import { Pool } from "pg";
import "dotenv/config"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

export function helloWorld(req, res) {
  //   let message = req.query.message || req.body.message || "Hello World!";
  // let data = await getComments();
  // resp
  getComments().then((data) => res.status(200).send(data.rows));
  // res.status(200).send(data.rows);
}

async function getComments() {
  const pool = new Pool({
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

getComments().then((data) => console.log(data.rows));
