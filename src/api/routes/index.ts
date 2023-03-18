import { Router } from "express";
import healthCheckRoute from "@src/api/routes/healthcheck";

export default (): Router => {
  const router = Router();
  router.use("/health", healthCheckRoute);
  return router;
};
