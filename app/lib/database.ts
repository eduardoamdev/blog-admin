import { Client, ClientConfig } from "pg";

const dbConfig: ClientConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || ""),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const dbClient: Client = new Client(dbConfig);

let isConnected: boolean = false;

export async function connectToDB(): Promise<void> {
  try {
    if (!isConnected) {
      await dbClient.connect();

      isConnected = true;
    } else {
      console.log("Already connected to database");
    }
  } catch (error: Error | any) {
    console.log(
      `There is the following database connection error: ${error.message}`
    );
  }
}
