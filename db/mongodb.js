import { MongoClient, ServerApiVersion } from "mongodb";

const username = 'your_username';
const password = 'your_password';
const url = "mongodb://mongo:OwrNCuJQsdbjMBJDwxneYrbainGMwkxO@mongodb.railway.internal:27017";
const dbName = 'football';

let client

export const getDb = async () => {
  let db;
  if (db) return db;
  try {
    client = await MongoClient.connect(url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
    return db;
  } catch (err) {
    throw err
  }
};

export const closeDb = async () => {
  if (client) {
    await client.close();
    console.log(`Disconnected from database: ${dbName}`);
    client = null; // Reset client variable after closing
  }
};
