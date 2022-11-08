import { Client } from 'pg';

export const client = new Client({
  database: process.env.DATABASE,
});
