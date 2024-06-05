import { Client, ClientConfig } from "pg";

const dbConfig: ClientConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || ""),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const dbClient = new Client(dbConfig);

export const connectToDB = async () => {
  try {
    await dbClient.connect();
    console.log("Connected to database");
  } catch (error: any) {
    console.error(
      `There is the following database connection error: ${error.message}`
    );
  }
};
