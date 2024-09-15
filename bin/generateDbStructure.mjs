import { config } from "dotenv";
import pg from "pg";

config();

const { Client } = pg;

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || ""),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const dbClient = new Client(dbConfig);

async function connectToDB() {
  await dbClient.connect();

  console.log("Connected to database");
}

async function createAdminSchema() {
  console.log("We are going to create the schema in case it does not exist");

  const createSchemaQuery = `
    CREATE SCHEMA IF NOT EXISTS admin;
  `;

  await dbClient.query(createSchemaQuery);
}

async function createUsersTable() {
  console.log(
    "We are going to create the table users in case it does not exist"
  );

  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS admin.users (
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    `;

  await dbClient.query(createTableQuery);
}

async function createArticlesTable() {
  console.log(
    "We are going to create the table articles in case it does not exist"
  );

  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS admin.articles (
        title VARCHAR(255) NOT NULL,
        content VARCHAR(255) NOT NULL
    );
    `;

  await dbClient.query(createTableQuery);
}

async function generateData() {
  try {
    await connectToDB();

    await createAdminSchema();

    await createUsersTable();

    await createArticlesTable();

    await dbClient.end();
  } catch (error) {
    console.log(`There is the following error: ${error.message}`);
  }
}

generateData();
