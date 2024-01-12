import { Sequelize } from "sequelize";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require"
});

pool.on("error", (err) => {
  console.error("Database connection error:", err);
});

pool.on("connect", () => {
  console.log("Connected to the database (pg)");
});

pool.on("remove", () => {
  console.log("Connection removed (pg)");
});

const db = new Sequelize({
  dialect: "postgres",
  dialectModule: pkg, 
  pool: {
    max: 9,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db
  .authenticate()
  .then(() => {
    console.log("Connected to the database (Sequelize)");
  })
  .catch((err) => {
    console.error("Unable to connect to the database (Sequelize):", err);
  });

export { pool, db };


