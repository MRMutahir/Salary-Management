import express from "express";
import { connectDb } from "./middlewares/mongodb.js";
import { envKeys } from "./config/keys.js";
import { routes } from "./routes/routes.js";

const app = express();
app.use(express.json());
routes(app);

const server = app.listen(envKeys.port, async () => {
  await connectDb();
  console.log("http://localhost:", envKeys.port);
});
