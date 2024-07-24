import { authRoutes } from "./auth.js";
// import { userRoutes } from "./users.js";

const routes = async (app) => {
  app.get("/", (req, res) => {
    res.send("Welcome to Node Server");
  });
  //   app.use("/api/v1/", userRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use((req, res, next) => {
    res.send("Route does not exist");
  });
};

export { routes };
