import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api";
import authRoutes from "./routes/auth";
import { initializeUserStore } from "./data/userStore";
import { initializeBookStore } from "./data/bookStore";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3001", // Client port
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(`📥 Request: ${req.method} ${req.path}`);
  next();
});

app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

const startServer = () => {
  app.listen(3000, () => console.log("Library management server running"));
  initializeUserStore();
  initializeBookStore();
};

startServer();
