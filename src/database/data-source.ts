import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { join } from "path";

dotenv.config();

const isLocal = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local';

const isMigration =
  process.argv.some(arg =>
    arg.includes('migration') || arg.includes('typeorm')
  );

const host = isMigration
  ? process.env.DB_MIGRATE_HOST
  : process.env.DB_HOST;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: host,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [
    join(__dirname, '../modules/*/*.entity.{ts,js}'),
    join(__dirname, '../modules/*/entities/*.{ts,js}'),
  ],
  migrations: [
    join(__dirname, './migrations/*.{ts,js}')
  ],
  subscribers: [],
  ...(isLocal ? {} : {
    extra: {
      ssl: {
        rejectUnauthorized: false, // Required for some environments, adjust as needed
      },
      options: `-c sslmode=${process.env.DB_SSL_MODE} -c channel_binding=${process.env.CHANNEL_BINDING}`
    },
  })
});
