import app from "./app";
import { AppDataSource } from "./database/data-source";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";

dotenv.config();

const PORT = process.env.PORT || 4000;

const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem')
};

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized.");

    https.createServer(options, app).listen(PORT, () => {
      console.log(`Server running on https://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
