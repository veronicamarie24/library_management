import express from "express";
import routes from "./routes";
import { initializeUserStore } from "./data/userStore";

const app = express();
app.use(express.json());
app.use("/api", routes);

const startServer = () => {
  app.listen(3000, () => console.log("Library management server running"));
  initializeUserStore();
};

startServer();
