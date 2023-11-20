import pg from 'pg'
const { Pool } = pg
import dotenv from "dotenv"

dotenv.config();

const {PG_USER, PG_HOST, PG_NAME, PG_PASSWORD, PG_PORT} = process.env;

const devConfig = {
  user: PG_USER,
  host: PG_HOST,
  database: PG_NAME,
  password: PG_PASSWORD,
  port: PG_PORT
}

// const proConfig = {
//   connectionString: process.env.DATABASE_URL,

//   ssl: {
//     rejectUnauthorized: false
//   }
// }

const pool = new Pool(
  devConfig
)


export default  {
  query: async (text, params) => {
      return await pool.query(text, params)   
  }
}