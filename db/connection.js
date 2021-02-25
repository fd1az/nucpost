import { MongoClient } from 'mongodb';

global.mongo = global.mongo || {};

export const connectDB = async () => {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
    });

    await global.mongo.client.connect();
    console.log('Conectado a la DB');
  }

  const db = global.mongo?.client?.db('nucpost');
  return { db, dbClient: global.mongo.client };
};
