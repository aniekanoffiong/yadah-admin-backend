import app from "./app";
import { AppDataSource } from "./database/data-source";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import http from "http";
import { YoutubeCronScheduler } from "./modules/live/external/youtube.cron-scheduler";

dotenv.config();

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized for environment: ", process.env.NODE_ENV);

    if (process.env.NODE_ENV !== 'production') {
      const options = {
        key: fs.readFileSync('localhost-key.pem'),
        cert: fs.readFileSync('localhost.pem')
      };

      https.createServer(options, app).listen(PORT, () => {
        const scheduler = new YoutubeCronScheduler();
        scheduler.start();
        
        console.log(`Server running on https://localhost:${PORT}`);
      });
    } else {
      http.createServer(app).listen(PORT, () => {
        const scheduler = new YoutubeCronScheduler();
        scheduler.start();

        console.log(`Server running on http://localhost:${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
