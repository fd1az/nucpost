import { connectDB } from '../db/connection';

export default async function database(req, res, next) {
  const { db, dbClient } = await connectDB();
  req.db = db;
  req.dbClient = dbClient;

  next();
}
