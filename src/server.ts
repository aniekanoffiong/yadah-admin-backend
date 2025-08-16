import app from "./app";
import { AppDataSource } from "./database/data-source";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized.");

    // Generate a static admin JWT token for testing purposes
    const token = jwt.sign(
      { username: process.env.ADMIN_USERNAME, role: "admin" },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
    console.log(`Admin JWT token (use in Authorization header "Bearer <token>"):\n${token}`);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
