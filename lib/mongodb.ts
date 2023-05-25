import { MongoClient } from "mongodb";

const mongoUrl = process.env.DATABASE_URL;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
} as any;

if (!mongoUrl) {
  throw new Error("Please add your MongoURL to .env.local");
}

export const connectToDatabase = async () => {
  const client = new MongoClient(mongoUrl, options);
  await client.connect();

  const db = client.db(process.env.MONGO_DB);

  return {
    client,
    db,
  };
};
