import { config } from "dotenv";
import pg from "pg";
import bcrypt from "bcryptjs";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

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

const rl = readline.createInterface({ input, output });

const init = async () => {
  try {
    const username = await rl.question("Ingresa tu nombre de usuario: ");

    rl.stdoutMuted = true;

    const password = await rl.question("Ingresa tu nombre de contraseña: ");

    console.log(`\nNombre de usuario: ${username}`);

    console.log(`Contraseña: ${"*".repeat(password.length)}`);

    const salt = await bcrypt.genSalt(10);

    const hashPass = await bcrypt.hash(password.toString(), salt);

    await dbClient.connect();

    await dbClient.query(
      `insert into admin.users (username, password) values ('${username}', '${hashPass}')`
    );

    console.log(`User with username ${username} has been created successfully`);

    process.exit(0);
  } catch (error) {
    console.error("There is the following error:", error);

    process.exit(1);
  }
};

init();
