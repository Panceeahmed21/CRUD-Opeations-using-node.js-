import mysql2 from "mysql2";
export const query = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shopping",
});
