import express from "express";
import AiRouter from "./ai.router.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router: express.Router = express.Router();

router.use(requireAuth);

router.use("/ai", AiRouter);

export default router;
