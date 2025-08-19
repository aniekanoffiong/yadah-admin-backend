import { AppDataSource } from "./data-source";

async function dropAllMigrations() {
  const connection = await AppDataSource.initialize();
  await connection.dropDatabase()
  connection.destroy();
}

dropAllMigrations()
  .then(() => console.log('All migrations dropped successfully'))
  .catch((err) => console.error('Error dropping migrations:', err));