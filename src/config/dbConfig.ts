import mysql from "mysql";

export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306
});

connection.connect((err: any) => {
  if (err) throw err;
  console.log("Connected to MySQL Server!");
});

export default connection;
