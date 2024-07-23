import express from "express";
import { connectDb } from "./middlewares/mongodb.js";
import { envKeys } from "./config/keys.js";

const app = express();

app.listen(envKeys.port, async () => {
  await connectDb();
  console.log("http://localhost:", envKeys.port);
  console.log(" add development branch in github");
  console.log(" add staging branch in github");
});
