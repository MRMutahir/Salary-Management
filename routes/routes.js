import { authenticate } from "../middlewares/authenticate.js";
import { verificationRoutes } from "./accountVerification.js";
import { authRoutes } from "./auth.js";
import { educationRoutes } from "./education.js";
import { userAggregationRoutes } from "./userAggregation.js";
import { userRoutes } from "./users.js";
import { userWorkRoutes } from "./work.js";
import { userYearRoute } from "./year.routes.js";
// import { userRoutes } from "./users.js";

const routes = async (app) => {
  app.get("/", (req, res) => {
    res.send("Welcome to Node Server");
  });
  //   app.use("/api/v1/", userRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/auth/verifications", verificationRoutes);
  app.use("/api/v1/users", authenticate, userRoutes);
  app.use("/api/v1/users/work", authenticate, userWorkRoutes);
  app.use("/api/v1/users/year-manage", authenticate, userYearRoute);
  app.use("/api/v1/users/education", authenticate, educationRoutes);
  app.use("/api/v1/users/aggregation", authenticate, userAggregationRoutes);
  app.use((req, res, next) => {
    res.send("Route does not exist");
  });
};

export { routes };
