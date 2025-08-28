import cors from "cors";
import express from "express";
import { AuthRouter } from "./routes/Auth.js";
import Logger from "./services/Logger.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(Logger);
app.use("/api/auth", AuthRouter);

app.listen(3000, () => {
  console.log("Listenig on port 3000");
});
