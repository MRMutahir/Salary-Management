import express from "express";
import { connectDb } from "./middlewares/mongodb.js";
import { envKeys } from "./config/keys.js";
import { routes } from "./routes/routes.js";
import { prettyLog, log2File } from "./helpers/common.js";
import RouteList from "route-list";
const app = express();
app.use(express.json());
routes(app);
const routesMap = RouteList.getRoutes(app, "express");

RouteList.printRoutes(routesMap);
// console.log("available routes", routesMap);
const server = app.listen(envKeys.port, async () => {
  await connectDb();
  prettyLog(`http://localhost:${envKeys.port}`, "info");
  log2File(`http://localhost:${envKeys.port}`, "info");
});

 
