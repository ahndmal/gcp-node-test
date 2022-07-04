const { Pool } = require("pg");

async function getComments() {
  const pool = new Pool({
    user: "developer",
    database: "DB",
    password: "",
    port: 5432,
    host: "0.0.0.0",
  });

  try {
    const res = await pool.query("select * from comments c order by id desc");
    console.log(res.rows);
  } catch (error) {
    console.error(error);
  }
}

getComments();
