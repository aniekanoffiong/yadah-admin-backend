import app from "./app";
import { AppDataSource } from "./database/data-source";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized.");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
