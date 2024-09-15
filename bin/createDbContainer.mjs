import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function executeCommand(command) {
  const { stdout, stderr } = await execAsync(command);

  if (stderr) {
    throw new Error(stderr);
  }

  console.log(`stdout: ${stdout}`);
}

const createContainer = async () => {
  try {
    console.log("Pulling database image");

    await executeCommand("docker pull postgres");

    console.log("Running database container");

    await executeCommand(
      "docker run --name postgres-container-blog " +
        "-e POSTGRES_DB=blog " +
        "-e POSTGRES_USER=root " +
        "-e POSTGRES_PASSWORD=root " +
        "-p 5433:5432 -d postgres"
    );

    console.log("Database container pulled and running");

    process.exit(0);
  } catch (error) {
    console.error("Error setting up database container:", error);

    process.exit(1);
  }
};

createContainer();
