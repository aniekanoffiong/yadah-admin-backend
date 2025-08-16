import { AppDataSource } from './data-source';

async function runMigrations() {
  await AppDataSource.initialize();
  console.log('DataSource initialized');
  const migrations = await AppDataSource.runMigrations();
  console.log('Migrations run:', migrations.map(m => m.name));
  await AppDataSource.destroy();
  console.log('DataSource destroyed');
}

runMigrations()
  .then(() => console.log('Migrations run successfully'))
  .catch((err) => console.error('Migration error:', err));
