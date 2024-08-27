const {Pool} = require('pg');
require('dotenv').config();

const pool=new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', async (client) => {
  console.log('New client connected to PostgreSQL');
  try {
    await client.query('SET search_path TO public');
    const res = await client.query('SELECT current_database(), current_schema()');
    console.log('Connected to database:', res.rows[0].current_database);
    console.log('Current schema:', res.rows[0].current_schema);
  } catch (err) {
    console.error('Error checking database and schema:', err);
  }
});

module.exports={
  query: async (text, params) => {
    const client = await pool.connect();
    try {
      await client.query('SET search_path TO public');
      console.log('Executing query:', { text, params });
      return await client.query(text, params);
    } finally {
      client.release();
    }
  },
};
