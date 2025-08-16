import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { join } from "path";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [
    join(__dirname, '../modules/*/*.entity.{ts,js}'),
    join(__dirname, '../modules/*/entities/*.{ts,js}'),
  ],
  migrations: [
    join(__dirname, './migrations/*.{ts,js}')
  ],
  subscribers: [],
});
