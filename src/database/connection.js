import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

export const db = new Pool({
  connectionString: process.env.DATABASE_CONNECTION,
});
