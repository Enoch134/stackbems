import { Sequelize } from "sequelize";
import pkg from "pg";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { POSTGRES_URL, NODE_ENV } = process.env;

if (!POSTGRES_URL) {
  throw new Error("Database URL is missing in the environment variables.");
}

const sequelizeOptions = {
  dialect: "postgres",
  dialectModule: pkg,
  pool: {
    max: 9,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

if (NODE_ENV === "production") {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  };
}

const db = new Sequelize(POSTGRES_URL, sequelizeOptions);

db.authenticate()
  .then(() => {
    console.log("Connected to the database (Sequelize)");
  })
  .catch((err) => {
    console.error("Unable to connect to the database (Sequelize):", err);
  });



export { db };
